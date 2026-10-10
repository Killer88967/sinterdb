export function renderGeneratedProjectTemplate(model) {
  return `import type { ApiProject } from "./model";

export const project = ${JSON.stringify(model, null, 2)} satisfies ApiProject;
`;
}
