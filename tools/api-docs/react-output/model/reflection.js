import { createCommentModel } from "./comments.js";
import { createHierarchy } from "./hierarchy.js";
import {
  createAnchor,
  createNavigation,
  createRoute,
  createSlug,
  getKindName,
} from "./navigation.js";
import { createSources } from "./source.js";
import { createTypeModel } from "./types.js";

/**
 * @param {import("typedoc").ProjectReflection} project
 */
export function createProjectModel(project) {
  const reflections = (project.children ?? []).map(createReflectionModel);

  return {
    id: project.id,
    name: project.name,
    reflections,
    navigation: createNavigation(reflections),
  };
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
export function createReflectionModel(reflection) {
  const typeDeclaration = getTypeDeclaration(reflection);

  return {
    id: reflection.id,
    name: reflection.name,
    slug: createSlug(reflection.name),
    route: createRoute(reflection),
    kind: getKindName(reflection.kind),
    kindId: reflection.kind,
    flags: createFlags(reflection),
    comment: createCommentModel(reflection.comment),
    type: createTypeModel(reflection.type),
    hierarchy: createHierarchy(reflection),
    sources: createSources(reflection),
    relationships: createRelationships(reflection),
    typeParameters:
      reflection.typeParameters?.map(createTypeParameterModel) ?? [],
    signatures: reflection.signatures?.map(createSignatureModel) ?? [],
    children: reflection.children?.map(createMemberModel) ?? [],
    typeDeclaration: typeDeclaration?.children?.map(createMemberModel) ?? [],
  };
}

/**
 * @param {import("typedoc").DeclarationReflection} reflection
 */
export function createMemberModel(reflection) {
  const typeDeclaration = getTypeDeclaration(reflection);

  return {
    id: reflection.id,
    name: reflection.name,
    anchor: createAnchor(reflection.name),
    kind: getKindName(reflection.kind),
    kindId: reflection.kind,
    flags: createFlags(reflection),
    comment: createCommentModel(reflection.comment),
    type: createTypeModel(reflection.type),
    defaultValue: reflection.defaultValue ?? null,
    sources: createSources(reflection),
    relationships: createRelationships(reflection),
    typeParameters:
      reflection.typeParameters?.map(createTypeParameterModel) ?? [],
    signatures: reflection.signatures?.map(createSignatureModel) ?? [],
    typeDeclaration: typeDeclaration?.children?.map(createMemberModel) ?? [],
  };
}

/**
 * @param {import("typedoc").SignatureReflection} signature
 */
export function createSignatureModel(signature) {
  return {
    id: signature.id,
    name: signature.name,
    comment: createCommentModel(signature.comment),
    typeParameters:
      signature.typeParameters?.map(createTypeParameterModel) ?? [],
    parameters: signature.parameters?.map(createParameterModel) ?? [],
    returnType: createTypeModel(signature.type),
    sources: createSources(signature),
    relationships: createRelationships(signature),
  };
}

function createParameterModel(parameter) {
  return {
    id: parameter.id,
    name: parameter.name,
    flags: createFlags(parameter),
    type: createTypeModel(parameter.type),
    defaultValue: parameter.defaultValue ?? null,
    comment: createCommentModel(parameter.comment),
  };
}

function createTypeParameterModel(parameter) {
  return {
    id: parameter.id,
    name: parameter.name,
    type: createTypeModel(parameter.type),
    default: createTypeModel(parameter.default),
    comment: createCommentModel(parameter.comment),
  };
}

function createRelationships(reflection) {
  return {
    inheritedFrom: reflection.inheritedFrom?.toString() ?? null,
    overwrites: reflection.overwrites?.toString() ?? null,
    implementationOf: reflection.implementationOf?.toString() ?? null,
  };
}

function createFlags(reflection) {
  return {
    static: reflection.flags.isStatic,
    readonly: reflection.flags.isReadonly,
    optional: reflection.flags.isOptional,
    abstract: reflection.flags.isAbstract,
    protected: reflection.flags.isProtected,
    private: reflection.flags.isPrivate,
    external: reflection.flags.isExternal,
    const: reflection.flags.isConst,
  };
}

function getTypeDeclaration(reflection) {
  if (
    !reflection.type ||
    typeof reflection.type !== "object" ||
    !("declaration" in reflection.type)
  ) {
    return undefined;
  }

  return reflection.type.declaration;
}
