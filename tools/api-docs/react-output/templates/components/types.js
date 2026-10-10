export function renderTypesTemplate() {
  return `export interface ApiType {
  readonly kind: string;
  readonly text: string;
  readonly name: string | null;
  readonly targetId: number | null;
  readonly children: readonly ApiType[];
}

export interface ApiSource {
  readonly fileName: string | null;
  readonly line: number | null;
  readonly character: number | null;
  readonly url: string | null;
}

export interface ApiCommentPart {
  readonly kind: string;
  readonly text: string;
  readonly target: string | null;
}

export interface ApiCommentBlock {
  readonly tag: string;
  readonly content: readonly ApiCommentPart[];
}

export interface ApiComment {
  readonly summary: readonly ApiCommentPart[];
  readonly blockTags: readonly ApiCommentBlock[];
}

export interface ApiFlags {
  readonly static: boolean;
  readonly readonly: boolean;
  readonly optional: boolean;
  readonly abstract: boolean;
  readonly protected: boolean;
  readonly private: boolean;
  readonly external: boolean;
  readonly const: boolean;
}

export interface ApiNavigationItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
}

export interface ApiParameter {
  readonly id: number;
  readonly name: string;
  readonly flags: ApiFlags;
  readonly type: ApiType | null;
  readonly defaultValue: string | null;
  readonly comment: ApiComment | null;
}

export interface ApiSignature {
  readonly id: number;
  readonly name: string;
  readonly comment: ApiComment | null;
  readonly parameters: readonly ApiParameter[];
  readonly returnType: ApiType | null;
  readonly sources: readonly ApiSource[];
}

export interface ApiMember {
  readonly id: number;
  readonly name: string;
  readonly anchor: string;
  readonly kind: string;
  readonly kindId: number;
  readonly flags: ApiFlags;
  readonly comment: ApiComment | null;
  readonly type: ApiType | null;
  readonly defaultValue: string | null;
  readonly sources: readonly ApiSource[];
  readonly signatures: readonly ApiSignature[];
  readonly typeDeclaration: readonly ApiMember[];
}

export interface ApiReflection {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
  readonly flags: ApiFlags;
  readonly comment: ApiComment | null;
  readonly type: ApiType | null;
  readonly sources: readonly ApiSource[];
  readonly children: readonly ApiMember[];
  readonly typeDeclaration: readonly ApiMember[];
}
`;
}
