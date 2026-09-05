"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { configureAmplify } from "@/lib/amplifyClient";

type ResetStep = "request" | "confirm";

export function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<ResetStep>("request");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setIsSubmitting(true);

    try {
      await configureAmplify();

      if (step === "request") {
        await resetPassword({ username: normalizedEmail(email) });
        setStep("confirm");
        setStatus("A password reset code was sent to your email.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
      }

      await confirmResetPassword({
        username: normalizedEmail(email),
        confirmationCode: confirmationCode.trim(),
        newPassword
      });

      router.push("/auth?password=reset");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Password reset failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendCode() {
    setStatus("");
    setError("");
    setIsSubmitting(true);

    try {
      await configureAmplify();
      await resetPassword({ username: normalizedEmail(email) });
      setStatus("A new password reset code was sent to your email.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not resend the password reset code.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="panel stack" onSubmit={handleSubmit} suppressHydrationWarning>
      <div>
        <h1>Reset password</h1>
        <p className="muted">
          {step === "request"
            ? "Enter your email and we will send you a Deep Roots password reset code."
            : "Enter the code from your email and choose a new password."}
        </p>
      </div>

      <label className="field">
        <span>Email</span>
        <input
          autoComplete="email"
          disabled={step === "confirm"}
          onChange={(event) => setEmail(event.target.value)}
          required
          suppressHydrationWarning
          type="email"
          value={email}
        />
      </label>

      {step === "confirm" ? (
        <>
          <label className="field">
            <span>Confirmation code</span>
            <input
              autoComplete="one-time-code"
              inputMode="numeric"
              onChange={(event) => setConfirmationCode(event.target.value)}
              required
              suppressHydrationWarning
              value={confirmationCode}
            />
          </label>

          <label className="field">
            <span>New password</span>
            <input
              autoComplete="new-password"
              onChange={(event) => setNewPassword(event.target.value)}
              required
              suppressHydrationWarning
              type="password"
              value={newPassword}
            />
          </label>

          <label className="field">
            <span>Confirm new password</span>
            <input
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              suppressHydrationWarning
              type="password"
              value={confirmPassword}
            />
          </label>
        </>
      ) : null}

      {status ? <p className="muted">{status}</p> : null}
      {error ? <p className="warning">{error}</p> : null}

      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : step === "request" ? "Send reset code" : "Reset password"}
      </button>

      {step === "confirm" ? (
        <button className="button secondary" disabled={isSubmitting} onClick={() => void resendCode()} type="button">
          Resend code
        </button>
      ) : null}

      <Link className="button secondary" href="/auth">
        Back to sign in
      </Link>
    </form>
  );
}

function normalizedEmail(value: string): string {
  return value.trim().toLowerCase();
}
