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
      <p className="eyebrow">Priority One 8-week mission</p>
      <h1>Priority One Deep Roots</h1>
      <p>
        Deep Roots helps men build spiritual, relational, and physical habits through weekly missions, daily reading
        and reflection, team accountability, and steady action.
      </p>
      <div className="row">
        <Link className="button" href="/auth">Sign in</Link>
        <Link className="button secondary" href="/create-account">Create account</Link>
      </div>
    </section>
  );
}
