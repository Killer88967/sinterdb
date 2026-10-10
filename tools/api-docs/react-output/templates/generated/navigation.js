export function renderGeneratedNavigationTemplate(navigation) {
  return `import type { ApiNavigationItem } from "./model";

export const navigation = ${JSON.stringify(navigation, null, 2)} satisfies readonly ApiNavigationItem[];
`;
}
