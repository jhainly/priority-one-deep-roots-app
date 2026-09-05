import Link from "next/link";

const adminTools = [
  {
    description: "Create teams, view existing teams, and open a team to review members and assigned weeks.",
    href: "/admin/groups",
    label: "Open team management",
    title: "Team management"
  },
  {
    description: "Import weekly missions, publish them to one or more teams, remove active weeks, and review mission changes.",
    href: "/admin/programs",
    label: "Open mission management",
    title: "Mission management"
  },
  {
    description: "View current users and choose who has admin access.",
    href: "/admin/users",
    label: "Open user management",
    title: "User management"
  }
];

export function AdminHome() {
  return (
    <div className="stack">
      <section className="panel stack">
        <div>
          <p className="eyebrow">Admin tools</p>
          <h1>Deep Roots administration</h1>
          <p>Manage Priority One teams, weekly missions, and app access.</p>
        </div>
      </section>

      <section className="admin-tool-grid">
        {adminTools.map((tool) => (
          <article className="card stack" key={tool.href}>
            <div>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </div>
            <Link className="button" href={tool.href}>
              {tool.label}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
