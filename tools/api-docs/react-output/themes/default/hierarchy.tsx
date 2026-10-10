import Link from "next/link";

import type { ApiHierarchyNode } from "../_generated/model";
import { KindIcon } from "./kind-icon";

export function HierarchyTree({
  nodes,
}: {
  readonly nodes: readonly ApiHierarchyNode[];
}) {
  if (nodes.length === 0) {
    return null;
  }

  return (
    <ul className="tdk-tree">
      {nodes.map((node, index) => (
        <li key={`${node.name}-${index}`}>
          <span
            className="tdk-tree-node"
            aria-current={node.current ? "page" : undefined}
          >
            {node.kind && <KindIcon kind={node.kind} />}
            {node.href && !node.current ? (
              node.href.startsWith("/") ? (
                <Link href={node.href} prefetch={false}>
                  {node.name}
                </Link>
              ) : (
                <a href={node.href} target="_blank" rel="noreferrer">
                  {node.name}
                </a>
              )
            ) : (
              <span>{node.name}</span>
            )}
          </span>
          <HierarchyTree nodes={node.children} />
        </li>
      ))}
    </ul>
  );
}
