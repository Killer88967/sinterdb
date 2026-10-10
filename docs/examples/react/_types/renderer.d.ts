import type {
  ApiMember,
  ApiNavigationItem,
  ApiProject,
  ApiReflection,
  ApiSignature,
  ApiSource,
  ApiType,
} from "./model";

export interface ApiLayoutProps {
  readonly children: React.ReactNode;
}

export interface ApiIndexPageProps {
  readonly projectName: string;
  readonly reflections: readonly ApiNavigationItem[];
}

export interface ApiReflectionPageProps {
  readonly projectName: string;
  readonly api: ApiReflection;
  readonly navigation: readonly ApiNavigationItem[];
}

export interface ApiHierarchyPageProps {
  readonly projectName: string;
  readonly classes: readonly ApiReflection[];
  readonly navigation: readonly ApiNavigationItem[];
}

export interface ApiShellProps {
  readonly projectName: string;
  readonly navigation: readonly ApiNavigationItem[];
  readonly activeId?: number;
  readonly pageNavigation?: React.ReactNode;
  readonly children: React.ReactNode;
}

export interface ApiMemberGroupProps {
  readonly title: string;
  readonly members: readonly ApiMember[];
}

export interface ApiSignatureProps {
  readonly signature: ApiSignature;
}

export interface ApiTypeExpressionProps {
  readonly type: ApiType | null;
}

export interface ApiSourceListProps {
  readonly sources: readonly ApiSource[];
}

export interface TypeDocIconProps {
  readonly kind: number | string;
  readonly label?: string;
  readonly className?: string;
}

export interface ApiRendererContext {
  readonly project: ApiProject;
  readonly routeBase: string;
  readonly iconSpritePath: string;
}
