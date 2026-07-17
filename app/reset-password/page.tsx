import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { getServerAuthState } from "@/lib/amplifyServer";

export default async function ResetPasswordPage() {
  const { authenticated } = await getServerAuthState();

  if (authenticated) {
    redirect("/dashboard");
  }

  return <ResetPasswordForm />;
}
