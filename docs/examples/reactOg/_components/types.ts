export interface ApiIndexReflection {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
  readonly description: string;
}

export interface ApiNavigationItem {
  readonly id: number;
  readonly name: string;
  readonly route: string;
  readonly kind: string;
  readonly kindId: number;
}

export interface ApiSource {
  readonly fileName: string | null;
  readonly line: number | null;
  readonly character: number | null;
  readonly url: string | null;
}

export interface ApiFlags {
  readonly static: boolean;
  readonly readonly: boolean;
  readonly optional: boolean;
  readonly abstract: boolean;
  readonly protected: boolean;
  readonly private: boolean;
  readonly external: boolean;
}

export interface ApiHierarchy {
  readonly extends: readonly string[];
  readonly extendedBy: readonly string[];
}

export interface ApiTypeParameter {
  readonly name: string;
  readonly type: string | null;
  readonly default: string | null;
  readonly description?: string;
}

export interface ApiParameter {
  readonly name: string;
  readonly type: string;
  readonly optional: boolean;
  readonly defaultValue: string | null;
  readonly description: string;
}

export interface ApiSignature {
  readonly id: number;
  readonly name: string;
  readonly description: string;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly parameters:
    readonly ApiParameter[];

  readonly returns: string;
  readonly returnsDescription: string;

  readonly source: ApiSource | null;
}

export interface ApiMember {
  readonly id: number;
  readonly name: string;
  readonly anchor: string;

  readonly kind: string;
  readonly kindId: number;

  readonly description: string;
  readonly type: string | null;

  readonly flags: ApiFlags;

  readonly source: ApiSource | null;

  readonly signatures:
    readonly ApiSignature[];
}

export interface ApiReflection {
  readonly id: number;
  readonly name: string;
  readonly slug: string;

  readonly kind: string;
  readonly kindId: number;

  readonly route: string;

  readonly description: string;
  readonly type: string | null;

  readonly flags: ApiFlags;

  readonly source: ApiSource | null;

  readonly hierarchy: ApiHierarchy;

  readonly typeParameters:
    readonly ApiTypeParameter[];

  readonly signatures:
    readonly ApiSignature[];

  readonly children:
    readonly ApiMember[];
}
