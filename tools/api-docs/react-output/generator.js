import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { createProjectModel } from "./model/reflection.js";
import { renderLayoutTemplate } from "./templates/layout.js";
import { renderIndexPageTemplate } from "./templates/index-page.js";
import { renderReflectionPageTemplate } from "./templates/reflection-page.js";
import { renderHierarchyPageTemplate } from "./templates/hierarchy-page.js";
import { renderApiShellTemplate } from "./templates/components/api-shell.js";
import { renderMemberGroupTemplate } from "./templates/components/member-group.js";
import { renderSignatureTemplate } from "./templates/components/signature.js";
import { renderSourceTemplate } from "./templates/components/source.js";
import { renderTypeExpressionTemplate } from "./templates/components/type-expression.js";
import { renderTypeDocIconTemplate } from "./templates/components/typedoc-icon.js";
import { renderGeneratedModelTemplate } from "./templates/generated/model.js";
import { renderGeneratedNavigationTemplate } from "./templates/generated/navigation.js";
import { renderGeneratedProjectTemplate } from "./templates/generated/project.js";
import { generateDeclarations } from "./declarations/index.js";
import { DEFAULT_STYLE } from "./styles/default.js";

/**
 * @param {{
 *   project: import("typedoc").ProjectReflection;
 *   options: import("./options.js").ReactOutputOptions;
 * }} input
 */
export async function generateReactOutput({ project, options }) {
  const model = createProjectModel(project);

  if (options.cleanOutput) {
    await rm(options.outputPath, {
      recursive: true,
      force: true,
    });
  }

  await mkdir(options.outputPath, {
    recursive: true,
  });

  await generateData(model, options);
  await generateDeclarations({
    outputPath: options.outputPath,
    options,
  });
  await generateComponents(options);

  await writeFile(
    join(options.outputPath, "layout.tsx"),
    renderLayoutTemplate(),
    "utf8",
  );

  await writeFile(
    join(options.outputPath, "page.tsx"),
    renderIndexPageTemplate({
      projectName: model.name,
      reflections: model.navigation,
    }),
    "utf8",
  );

  await generateHierarchy(model, options);

  for (const reflection of model.reflections) {
    await generateReflection(model, reflection, options);
  }
}

async function generateComponents(options) {
  const directory = join(options.outputPath, "_components");

  await mkdir(directory, {
    recursive: true,
  });

  await Promise.all([
    writeFile(
      join(directory, "api-shell.tsx"),
      renderApiShellTemplate({
        routeBase: options.routeBase,
      }),
      "utf8",
    ),
    writeFile(
      join(directory, "member-group.tsx"),
      renderMemberGroupTemplate(),
      "utf8",
    ),
    writeFile(
      join(directory, "signature.tsx"),
      renderSignatureTemplate(),
      "utf8",
    ),
    writeFile(join(directory, "source.tsx"), renderSourceTemplate(), "utf8"),
    writeFile(
      join(directory, "type-expression.tsx"),
      renderTypeExpressionTemplate(),
      "utf8",
    ),
    writeFile(
      join(directory, "typedoc-icon.tsx"),
      renderTypeDocIconTemplate({
        iconSpritePath: options.iconSpritePath,
      }),
      "utf8",
    ),
    writeFile(join(directory, "api.css"), DEFAULT_STYLE, "utf8"),
  ]);
}

async function generateReflection(model, reflection, options) {
  const directory = join(options.outputPath, reflection.route);

  await mkdir(directory, {
    recursive: true,
  });

  await writeFile(
    join(directory, "page.tsx"),
    renderReflectionPageTemplate({
      projectName: model.name,
      reflection,
      navigation: model.navigation,
    }),
    "utf8",
  );
}

async function generateHierarchy(model, options) {
  const directory = join(options.outputPath, "hierarchy");

  await mkdir(directory, {
    recursive: true,
  });

  await writeFile(
    join(directory, "page.tsx"),
    renderHierarchyPageTemplate({
      projectName: model.name,
      reflections: model.reflections,
      navigation: model.navigation,
    }),
    "utf8",
  );
}

async function generateData(model, options) {
  const directory = join(options.outputPath, "_generated");

  await mkdir(directory, { recursive: true });

  await Promise.all([
    writeFile(
      join(directory, "model.ts"),
      renderGeneratedModelTemplate(),
      "utf8",
    ),
    writeFile(
      join(directory, "navigation.ts"),
      renderGeneratedNavigationTemplate(model.navigation),
      "utf8",
    ),
    writeFile(
      join(directory, "project.ts"),
      renderGeneratedProjectTemplate(model),
      "utf8",
    ),
  ]);
}
