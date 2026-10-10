import { ParameterType } from "typedoc";

const DEFAULT_REACT_OUTPUT_OPTIONS = {
  framework: "next",
  routeBase: "/docs/api",
  cleanOutput: true,
  assets: {
    iconSprite: "/docs/api/assets/icons.svg",
  },
  generated: {
    directory: "_generated",
  },
  components: {
    directory: "_components",
  },
  declarations: {
    enabled: true,
    directory: "_types",
    moduleName: null,
  },
  features: {
    hierarchy: true,
    navigation: true,
    pageNavigation: true,
    sourceLinks: true,
    comments: true,
  },
  theme: {
    name: "default",
  },
};

export function registerReactOutputOptions(app) {
  app.options.addDeclaration({
    name: "reactOutput",
    help: "Configuration for the React output generator.",
    type: ParameterType.Object,
    defaultValue: {},
  });
}

export function resolveReactOutputOptions({ app, outputPath }) {
  const input = app.options.getValue("reactOutput") ?? {};

  return {
    outputPath,
    framework: input.framework ?? DEFAULT_REACT_OUTPUT_OPTIONS.framework,
    routeBase: input.routeBase ?? DEFAULT_REACT_OUTPUT_OPTIONS.routeBase,
    cleanOutput: input.cleanOutput ?? DEFAULT_REACT_OUTPUT_OPTIONS.cleanOutput,
    assets: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.assets,
      ...input.assets,
    },
    generated: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.generated,
      ...input.generated,
    },
    components: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.components,
      ...input.components,
    },
    declarations: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.declarations,
      ...input.declarations,
    },
    features: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.features,
      ...input.features,
    },
    theme: {
      ...DEFAULT_REACT_OUTPUT_OPTIONS.theme,
      ...input.theme,
    },
  };
}
