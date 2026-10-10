const MODEL_TYPES = [
  "ApiType",
  "ApiSource",
  "ApiCommentPart",
  "ApiCommentBlock",
  "ApiComment",
  "ApiFlags",
  "ApiRelationships",
  "ApiHierarchy",
  "ApiNavigationItem",
  "ApiTypeParameter",
  "ApiParameter",
  "ApiSignature",
  "ApiMember",
  "ApiReflection",
  "ApiProject",
];

const RENDERER_TYPES = [
  "ApiLayoutProps",
  "ApiIndexPageProps",
  "ApiReflectionPageProps",
  "ApiHierarchyPageProps",
  "ApiShellProps",
  "ApiMemberGroupProps",
  "ApiSignatureProps",
  "ApiTypeExpressionProps",
  "ApiSourceListProps",
  "TypeDocIconProps",
  "ApiRendererContext",
];

export function renderModuleDeclarations({ moduleName }) {
  if (!moduleName) {
    return null;
  }

  const modelTypes = MODEL_TYPES.map(
    (name) => `  export type ${name} = import("../_generated/model").${name};`,
  ).join("\n");

  const rendererTypes = RENDERER_TYPES.map(
    (name) => `  export type ${name} = import("./renderer").${name};`,
  ).join("\n");

  return `declare module ${JSON.stringify(moduleName)} {
${modelTypes}
${rendererTypes}
}
`;
}
