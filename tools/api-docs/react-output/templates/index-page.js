import { serialize } from "./serialize.js";

export function renderIndexPageTemplate({
  groups,
  componentsDirectory,
  generatedDirectory,
}) {
  return `import { ApiIndexPage } from "./${componentsDirectory}/pages";
import type { ApiIndexGroup } from "./${generatedDirectory}/model";

const groups = ${serialize(groups)} satisfies readonly ApiIndexGroup[];

export default function Page() {
  return <ApiIndexPage groups={groups} />;
}
`;
}
