import Link from "next/link";

import { ApiShell } from "./api-shell";

import { TypeDocIcon } from "./typedoc-icon";

import type {
  ApiNavigationItem,
} from "./types";

interface HierarchyClass {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;

  readonly extends:
    readonly string[];

  readonly extendedBy:
    readonly string[];
}

interface ApiHierarchyPageProps {
  readonly projectName: string;

  readonly classes:
    readonly HierarchyClass[];

  readonly navigation:
    readonly ApiNavigationItem[];
}

export function ApiHierarchyPage({
  projectName,
  classes,
  navigation,
}: ApiHierarchyPageProps) {
  const names = new Map(
    classes.map((item) => [
      item.name,
      item,
    ]),
  );

  const roots = classes.filter(
    (item) =>
      !item.extends.some(
        (base) =>
          names.has(
            stripGeneric(base),
          ),
      ),
  );

  return (
    <ApiShell
      projectName={projectName}
      navigation={navigation}
    >
      <div className="typedoc-page-title">
        <h1>
          {projectName}
        </h1>
      </div>

      <h2>
        Hierarchy Summary
      </h2>

      <ul className="typedoc-hierarchy-tree">
        {roots.map((root) => (
          <HierarchyNode
            key={root.id}
            item={root}
            classes={classes}
          />
        ))}
      </ul>
    </ApiShell>
  );
}

function HierarchyNode({
  item,
  classes,
}: {
  readonly item:
    HierarchyClass;

  readonly classes:
    readonly HierarchyClass[];
}) {
  const children =
    classes.filter(
      (candidate) =>
        candidate.extends.some(
          (base) =>
            stripGeneric(base) ===
            item.name,
        ),
    );

  return (
    <li>
      <Link
        href={
          "/docs/api/" +
          item.route
        }
        className="typedoc-hierarchy-link"
      >
        <TypeDocIcon
          kind={item.kindId}
          label={item.kind}
          className="size-5"
        />

        {item.name}
      </Link>

      {children.length > 0 && (
        <ul>
          {children.map(
            (child) => (
              <HierarchyNode
                key={child.id}
                item={child}
                classes={
                  classes
                }
              />
            ),
          )}
        </ul>
      )}
    </li>
  );
}

function stripGeneric(value: string) {
  const index =
    value.indexOf("<");

  return (
    index === -1
      ? value
      : value.slice(0, index)
  );
}
