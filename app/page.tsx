import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthState } from "@/lib/amplifyServer";

export default async function HomePage() {
  const { authenticated } = await getServerAuthState();

  if (authenticated) {
    redirect("/dashboard");
  }

  return (
    <section className="panel stack">
      <p className="eyebrow">8-Week Men&apos;s Training</p>
      <h1>Deep Roots</h1>
      <p>
        <strong>Deep Roots</strong> is an 8-week transformational training that equips men to build strong spiritual,
        relational, and physical foundations so they can flourish in every part of life. This isn&apos;t just about
        knowing more. It&apos;s about becoming more&mdash;the man God created you to be.{" "}
        <a href="http://lv.priorityone.org/deep-roots">lv.priorityone.org/deep-roots</a>
      </p>
      <div className="row">
        <Link className="button" href="/auth">Sign in</Link>
        <Link className="button secondary" href="/create-account">Create account</Link>
      </div>
    </section>
  );
}
