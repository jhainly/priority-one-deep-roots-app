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
      <p className="eyebrow">8-week team training</p>
      <h1>Priority One Deep Roots</h1>
      <p>
        A focused place for Deep Roots teams to build spiritual, relational, and physical foundations through daily
        assignments, private reflection, accountability, and healthy competition.
      </p>
      <div className="row">
        <Link className="button" href="/auth">Sign in</Link>
        <Link className="button secondary" href="/create-account">Create account</Link>
      </div>
    </section>
  );
}
