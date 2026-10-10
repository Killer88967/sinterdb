import Link from "next/link";

import { TypeDocIcon } from "./typedoc-icon";
import type {
  ApiNavigationItem,
  ApiReflection,
} from "../_generated/model";

type MemberIndexProps =
  | {
      readonly reflections: readonly ApiNavigationItem[];
      readonly reflection?: never;
      readonly routeBase: string;
    }
  | {
      readonly reflections?: never;
      readonly reflection: ApiReflection;
      readonly routeBase: string;
    };

export function MemberIndex(props: MemberIndexProps) {
  if (props.reflections) {
    if (props.reflections.length === 0) {
      return null;
    }

    return (
      <section className="typedoc-member-index">
        <h2>API</h2>

        <div className="typedoc-member-index-list">
          {props.reflections.map((reflection) => (
            <Link
              key={reflection.id}
              href={
                props.routeBase +
                "/" +
                reflection.route
              }
              className="typedoc-member-index-item"
            >
              <TypeDocIcon
                kind={reflection.kindId}
                label={reflection.kind}
              />

              <span className="typedoc-member-index-name">
                {reflection.name}
              </span>

              <span className="typedoc-member-index-kind">
                {reflection.kind}
              </span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const groups = groupMembers(props.reflection.children);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="typedoc-member-index">
      <h2>Index</h2>

      {groups.map((group) => (
        <section
          key={group.kind}
          className="typedoc-member-index-group"
        >
          <h3>{group.title}</h3>

          <div className="typedoc-member-index-list">
            {group.members.map((member) => (
              <a
                key={member.id}
                href={"#" + member.anchor}
                className="typedoc-member-index-item"
              >
                <TypeDocIcon
                  kind={member.kindId}
                  label={member.kind}
                />

                <span className="typedoc-member-index-name">
                  {member.name}
                </span>

                <span className="typedoc-member-index-kind">
                  {member.kind}
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

function groupMembers(
  members: ApiReflection["children"],
) {
  const order = [
    "Constructor",
    "Property",
    "Accessor",
    "Method",
    "Function",
    "Variable",
    "TypeAlias",
    "Interface",
    "Class",
    "Enumeration",
    "Namespace",
  ];

  const titles = {
    Constructor: "Constructors",
    Property: "Properties",
    Accessor: "Accessors",
    Method: "Methods",
    Function: "Functions",
    Variable: "Variables",
    TypeAlias: "Type Aliases",
    Interface: "Interfaces",
    Class: "Classes",
    Enumeration: "Enumerations",
    Namespace: "Namespaces",
  };

  return order.flatMap((kind) => {
    const grouped = members.filter(
      (member) => member.kind === kind,
    );

    if (grouped.length === 0) {
      return [];
    }

    return [
      {
        kind,
        title:
          titles[kind as keyof typeof titles] ??
          kind,
        members: grouped,
      },
    ];
  });
}
