import type { ApiReflection } from "../_generated/model";

export function PageNavigation({
  reflection,
}: {
  readonly reflection: ApiReflection;
}) {
  if (reflection.children.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-page-navigation">
      <div className="typedoc-page-navigation-title">
        On This Page
      </div>

      <nav>
        <ul>
          {reflection.children.map((member) => (
            <li key={member.id}>
              <a href={"#" + member.anchor}>
                {member.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
