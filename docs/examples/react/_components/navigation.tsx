import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";
import type { ApiNavigationItem } from "../_generated/model";

export function Navigation({
  projectName,
  navigation,
  routeBase,
}: {
  readonly projectName: string;
  readonly navigation: readonly ApiNavigationItem[];
  readonly routeBase: string;
}) {
  return (
    <aside className="typedoc-navigation">
      <div className="typedoc-navigation-header">
        <Link href={routeBase}>
          {projectName}
        </Link>
      </div>

      <nav>
        <ul className="typedoc-navigation-list">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link
                href={
                  routeBase +
                  "/" +
                  item.route
                }
              >
                <TypeDocIcon
                  kind={item.kindId}
                  label={item.kind}
                />

                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
