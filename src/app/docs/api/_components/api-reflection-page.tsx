import Link from "next/link";

import { ApiShell } from "./api-shell";

import {
  TypeDocIcon,
  TypeDocUtilityIcon,
} from "./typedoc-icon";

import { TypeExpression } from "./type-expression";

import type {
  ApiMember,
  ApiNavigationItem,
  ApiReflection,
  ApiSignature,
  ApiSource,
} from "./types";

interface ApiReflectionPageProps {
  readonly projectName: string;

  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}

export function ApiReflectionPage({
  projectName,
  api,
  navigation,
}: ApiReflectionPageProps) {
  const constructors =
    api.children.filter(
      (member) =>
        member.kind ===
        "Constructor",
    );

  const properties =
    api.children.filter(
      (member) =>
        member.kind ===
        "Property",
    );

  const accessors =
    api.children.filter(
      (member) =>
        member.kind ===
        "Accessor",
    );

  const methods =
    api.children.filter(
      (member) =>
        member.kind ===
        "Method",
    );

  const remaining =
    api.children.filter(
      (member) =>
        !constructors.includes(
          member,
        ) &&
        !properties.includes(
          member,
        ) &&
        !accessors.includes(
          member,
        ) &&
        !methods.includes(
          member,
        ),
    );

  const topLevelMembers =
    api.typeDeclaration.length > 0
      ? api.typeDeclaration
      : properties;

  const pageNavigation = (
    <PageNavigation
      groups={[
        {
          title: "Constructors",
          members: constructors,
        },
        {
          title: "Properties",
          members:
            api.typeDeclaration
              .length > 0
              ? api.typeDeclaration
              : properties,
        },
        {
          title: "Accessors",
          members: accessors,
        },
        {
          title: "Methods",
          members: methods,
        },
        {
          title: "Members",
          members: remaining,
        },
      ]}
    />
  );

  return (
    <ApiShell
      projectName={projectName}
      navigation={navigation}
      activeId={api.id}
      pageNavigation={
        pageNavigation
      }
    >
      <div className="typedoc-page-title">
        <div className="typedoc-breadcrumb">
          <Link href="/docs/api">
            {projectName}
          </Link>

          <span>/</span>

          <span>
            {api.name}
          </span>
        </div>

        <h1>
          {pageTitle(api)}
          {api.flags.const && (
            <Tag>
              Const
            </Tag>
          )}
        </h1>
      </div>

      {api.description && (
        <section className="typedoc-comment">
          <p>
            {api.description}
          </p>
        </section>
      )}

      {api.kind ===
        "Interface" && (
        <InterfaceSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "TypeAlias" && (
        <TypeAliasSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "Variable" && (
        <VariableSignature
          api={api}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "Class" && (
        <Hierarchy
          api={api}
          navigation={
            navigation
          }
        />
      )}

      <RelationshipInfo
        api={api}
      />

      <Sources
        sources={api.sources}
      />

      {(constructors.length >
        0 ||
        topLevelMembers.length >
          0 ||
        accessors.length >
          0 ||
        methods.length > 0 ||
        remaining.length >
          0) && (
        <MemberIndex
          groups={[
            {
              title:
                "Constructors",
              members:
                constructors,
            },
            {
              title:
                "Properties",
              members:
                topLevelMembers,
            },
            {
              title:
                "Accessors",
              members:
                accessors,
            },
            {
              title:
                "Methods",
              members:
                methods,
            },
            {
              title:
                "Members",
              members:
                remaining,
            },
          ]}
        />
      )}

      {api.kind ===
        "Variable" &&
        api.typeDeclaration
          .length > 0 && (
          <TypeDeclaration
            members={
              api.typeDeclaration
            }
            navigation={
              navigation
            }
          />
        )}

      <MemberGroup
        title="Constructors"
        members={constructors}
        navigation={navigation}
      />

      {api.kind !==
        "Interface" &&
        api.kind !==
          "Variable" && (
          <MemberGroup
            title="Properties"
            members={properties}
            navigation={
              navigation
            }
          />
        )}

      {api.kind ===
        "Interface" && (
        <MemberGroup
          title="Properties"
          members={properties}
          navigation={
            navigation
          }
        />
      )}

      {api.kind ===
        "TypeAlias" &&
        api.typeDeclaration
          .length > 0 && (
          <MemberGroup
            title="Properties"
            members={
              api.typeDeclaration
            }
            navigation={
              navigation
            }
          />
        )}

      <MemberGroup
        title="Accessors"
        members={accessors}
        navigation={navigation}
      />

      <MemberGroup
        title="Methods"
        members={methods}
        navigation={navigation}
      />

      <MemberGroup
        title="Members"
        members={remaining}
        navigation={navigation}
      />

      {api.signatures.length >
        0 && (
        <SignatureGroup
          signatures={
            api.signatures
          }
          navigation={
            navigation
          }
        />
      )}
    </ApiShell>
  );
}

function pageTitle(
  api: ApiReflection,
) {
  const parameters =
    api.typeParameters.length > 0
      ? "<" +
        api.typeParameters
          .map(
            (parameter) =>
              parameter.name,
          )
          .join(", ") +
        ">"
      : "";

  switch (api.kind) {
    case "Class":
      return (
        "Class " +
        api.name +
        parameters
      );

    case "Interface":
      return (
        "Interface " +
        api.name +
        parameters
      );

    case "TypeAlias":
      return (
        "Type Alias " +
        api.name +
        parameters
      );

    case "Variable":
      return (
        "Variable " +
        api.name
      );

    case "Function":
      return (
        "Function " +
        api.name
      );

    default:
      return (
        api.kind +
        " " +
        api.name +
        parameters
      );
  }
}

function InterfaceSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-keyword">
        interface
      </span>{" "}

      <span className="typedoc-kind-interface">
        {api.name}
      </span>

      <TypeParameters
        api={api}
        navigation={navigation}
      />

      {" {"}

      {api.children.map(
        (member) => (
          <div
            key={member.id}
            className="typedoc-signature-line"
          >
            <a
              href={
                "#" +
                member.anchor
              }
              className="typedoc-kind-property"
            >
              {member.name}
            </a>

            {member.flags.optional
              ? "?: "
              : ": "}

            <TypeExpression
              value={
                member.type ??
                "unknown"
              }
              navigation={
                navigation
              }
            />

            {";"}
          </div>
        ),
      )}

      {"}"}
    </SignatureBox>
  );
}

function TypeAliasSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-keyword">
        type
      </span>{" "}

      <span className="typedoc-kind-type-alias">
        {api.name}
      </span>

      <TypeParameters
        api={api}
        navigation={navigation}
      />

      {" = "}

      <TypeExpression
        value={
          api.type ??
          "unknown"
        }
        navigation={navigation}
      />
    </SignatureBox>
  );
}

function VariableSignature({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <SignatureBox>
      <span className="typedoc-kind-variable">
        {api.name}
      </span>

      {": "}

      <TypeExpression
        value={
          api.type ??
          "unknown"
        }
        navigation={navigation}
      />
    </SignatureBox>
  );
}

function TypeParameters({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (
    api.typeParameters.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      {"<"}

      {api.typeParameters.map(
        (
          parameter,
          index,
        ) => (
          <span
            key={
              parameter.name
            }
          >
            {index > 0
              ? ", "
              : ""}

            <span className="typedoc-type-parameter">
              {
                parameter.name
              }
            </span>

            {parameter.type && (
              <>
                {" extends "}

                <TypeExpression
                  value={
                    parameter.type
                  }
                  navigation={
                    navigation
                  }
                />
              </>
            )}

            {parameter.default && (
              <>
                {" = "}

                <TypeExpression
                  value={
                    parameter.default
                  }
                  navigation={
                    navigation
                  }
                />
              </>
            )}
          </span>
        ),
      )}

      {">"}
    </>
  );
}

function Hierarchy({
  api,
  navigation,
}: {
  readonly api: ApiReflection;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (
    api.hierarchy.extends
      .length === 0 &&
    api.hierarchy.extendedBy
      .length === 0
  ) {
    return null;
  }

  return (
    <section className="typedoc-hierarchy-panel">
      <h4>
        Hierarchy
      </h4>

      <ul>
        {api.hierarchy.extends.map(
          (base) => (
            <li key={base}>
              <TypeExpression
                value={base}
                navigation={
                  navigation
                }
              />

              <ul>
                <li className="typedoc-hierarchy-target">
                  {api.name}
                </li>
              </ul>
            </li>
          ),
        )}

        {api.hierarchy.extends
          .length === 0 && (
          <li className="typedoc-hierarchy-target">
            {api.name}

            {api.hierarchy
              .extendedBy.length >
              0 && (
              <ul>
                {api.hierarchy.extendedBy.map(
                  (child) => (
                    <li
                      key={
                        child
                      }
                    >
                      <TypeExpression
                        value={
                          child
                        }
                        navigation={
                          navigation
                        }
                      />
                    </li>
                  ),
                )}
              </ul>
            )}
          </li>
        )}
      </ul>
    </section>
  );
}

function RelationshipInfo({
  api,
}: {
  readonly api: ApiReflection;
}) {
  const rows = [
    api.inheritedFrom
      ? [
          "Inherited from",
          api.inheritedFrom,
        ]
      : null,

    api.overwrites
      ? [
          "Overrides",
          api.overwrites,
        ]
      : null,

    api.implementationOf
      ? [
          "Implements",
          api.implementationOf,
        ]
      : null,
  ].filter(
    (
      value,
    ): value is [
      string,
      string,
    ] => value !== null,
  );

  if (rows.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-relationships">
      {rows.map(
        ([label, value]) => (
          <p key={label}>
            {label}{" "}
            <code>
              {value}
            </code>
          </p>
        ),
      )}
    </aside>
  );
}

function MemberIndex({
  groups,
}: {
  readonly groups: readonly {
    readonly title: string;

    readonly members:
      readonly ApiMember[];
  }[];
}) {
  return (
    <section className="typedoc-index-panel">
      <h5>
        Index
      </h5>

      {groups.map(
        (group) => {
          if (
            group.members
              .length === 0
          ) {
            return null;
          }

          return (
            <section
              key={
                group.title
              }
              className="typedoc-index-section"
            >
              <h3>
                {group.title}
              </h3>

              <div className="typedoc-index-list">
                {group.members.map(
                  (member) => (
                    <a
                      key={
                        member.id
                      }
                      href={
                        "#" +
                        member.anchor
                      }
                    >
                      <TypeDocIcon
                        kind={
                          member.kindId
                        }
                        label={
                          member.kind
                        }
                        className="size-5"
                      />

                      <span>
                        {
                          member.name
                        }

                        {member.flags.optional
                          ? "?"
                          : ""}
                      </span>
                    </a>
                  ),
                )}
              </div>
            </section>
          );
        },
      )}
    </section>
  );
}

function MemberGroup({
  title,
  members,
  navigation,
}: {
  readonly title: string;

  readonly members:
    readonly ApiMember[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <details
      open
      className="typedoc-member-group"
    >
      <summary className="typedoc-group-summary">
        <h2>
          {title}
        </h2>
      </summary>

      <div>
        {members.map(
          (member) => (
            <Member
              key={member.id}
              member={member}
              navigation={
                navigation
              }
            />
          ),
        )}
      </div>
    </details>
  );
}

function Member({
  member,
  navigation,
}: {
  readonly member: ApiMember;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <section
      id={member.anchor}
      className="typedoc-member"
    >
      <h3>
        {member.flags.optional && (
          <Tag>
            Optional
          </Tag>
        )}

        {member.flags.readonly && (
          <Tag>
            Readonly
          </Tag>
        )}

        {member.flags.static && (
          <Tag>
            Static
          </Tag>
        )}

        {member.flags.abstract && (
          <Tag>
            Abstract
          </Tag>
        )}

        <span>
          {member.name}
        </span>

        <Anchor
          id={member.anchor}
        />
      </h3>

      {member.type && (
        <SignatureBox>
          <span
            className={
              "typedoc-kind-" +
              kindClass(
                member.kind,
              )
            }
          >
            {member.name}
          </span>

          {member.flags.optional
            ? "?: "
            : ": "}

          <TypeExpression
            value={member.type}
            navigation={
              navigation
            }
          />
        </SignatureBox>
      )}

      {member.description && (
        <div className="typedoc-comment">
          <p>
            {
              member.description
            }
          </p>
        </div>
      )}

      {member.signatures.map(
        (signature) => (
          <Signature
            key={
              signature.id
            }
            signature={
              signature
            }
            navigation={
              navigation
            }
          />
        ),
      )}

      {member.typeDeclaration
        .length > 0 && (
        <TypeDeclaration
          members={
            member.typeDeclaration
          }
          navigation={
            navigation
          }
        />
      )}

      <Sources
        sources={
          member.sources
        }
      />
    </section>
  );
}

function SignatureGroup({
  signatures,
  navigation,
}: {
  readonly signatures:
    readonly ApiSignature[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <section className="typedoc-signature-group">
      {signatures.map(
        (signature) => (
          <Signature
            key={
              signature.id
            }
            signature={
              signature
            }
            navigation={
              navigation
            }
          />
        ),
      )}
    </section>
  );
}

function Signature({
  signature,
  navigation,
}: {
  readonly signature:
    ApiSignature;

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-signature-block">
      <SignatureBox>
        <span className="typedoc-kind-method">
          {signature.name}
        </span>

        {"("}

        {signature.parameters.map(
          (
            parameter,
            index,
          ) => (
            <span
              key={
                parameter.id
              }
            >
              {index > 0
                ? ", "
                : ""}

              <span className="typedoc-parameter">
                {
                  parameter.name
                }
              </span>

              {parameter.optional
                ? "?: "
                : ": "}

              <TypeExpression
                value={
                  parameter.type
                }
                navigation={
                  navigation
                }
              />
            </span>
          ),
        )}

        {"): "}

        <TypeExpression
          value={
            signature.returns
          }
          navigation={
            navigation
          }
        />
      </SignatureBox>

      {signature.description && (
        <div className="typedoc-comment">
          <p>
            {
              signature.description
            }
          </p>
        </div>
      )}

      {signature.parameters
        .length > 0 && (
        <div className="typedoc-parameters">
          <h4>
            Parameters
          </h4>

          <ul>
            {signature.parameters.map(
              (parameter) => (
                <li
                  key={
                    parameter.id
                  }
                >
                  <div>
                    {parameter.optional && (
                      <Tag>
                        Optional
                      </Tag>
                    )}

                    <span className="typedoc-parameter">
                      {
                        parameter.name
                      }
                    </span>

                    {": "}

                    <TypeExpression
                      value={
                        parameter.type
                      }
                      navigation={
                        navigation
                      }
                    />
                  </div>

                  {parameter.description && (
                    <p>
                      {
                        parameter.description
                      }
                    </p>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      )}

      <h4 className="typedoc-returns">
        Returns{" "}

        <TypeExpression
          value={
            signature.returns
          }
          navigation={
            navigation
          }
        />
      </h4>

      {signature.returnsDescription && (
        <p className="typedoc-return-description">
          {
            signature.returnsDescription
          }
        </p>
      )}

      <Sources
        sources={
          signature.sources
        }
      />
    </div>
  );
}

function TypeDeclaration({
  members,
  navigation,
}: {
  readonly members:
    readonly ApiMember[];

  readonly navigation:
    readonly ApiNavigationItem[];
}) {
  return (
    <div className="typedoc-type-declaration">
      <h4>
        Type Declaration
      </h4>

      <ul>
        {members.map(
          (member) => (
            <li
              key={member.id}
              id={member.anchor}
            >
              <h5>
                {member.flags.readonly && (
                  <Tag>
                    Readonly
                  </Tag>
                )}

                {member.flags.optional && (
                  <Tag>
                    Optional
                  </Tag>
                )}

                <span className="typedoc-kind-property">
                  {member.name}
                </span>

                {member.flags.optional
                  ? "?: "
                  : ": "}

                <TypeExpression
                  value={
                    member.type ??
                    "unknown"
                  }
                  navigation={
                    navigation
                  }
                />
              </h5>

              {member.description && (
                <div className="typedoc-comment">
                  <p>
                    {
                      member.description
                    }
                  </p>
                </div>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function PageNavigation({
  groups,
}: {
  readonly groups: readonly {
    readonly title: string;

    readonly members:
      readonly ApiMember[];
  }[];
}) {
  const visible =
    groups.filter(
      (group) =>
        group.members.length >
        0,
    );

  if (visible.length === 0) {
    return null;
  }

  return (
    <details open>
      <summary>
        <strong>
          On This Page
        </strong>
      </summary>

      <div className="typedoc-page-navigation">
        {visible.map(
          (group) => (
            <details
              key={
                group.title
              }
              open
            >
              <summary>
                {
                  group.title
                }
              </summary>

              <div>
                {group.members.map(
                  (member) => (
                    <a
                      key={
                        member.id
                      }
                      href={
                        "#" +
                        member.anchor
                      }
                    >
                      <TypeDocIcon
                        kind={
                          member.kindId
                        }
                        label={
                          member.kind
                        }
                        className="size-4"
                      />

                      <span>
                        {
                          member.name
                        }
                      </span>
                    </a>
                  ),
                )}
              </div>
            </details>
          ),
        )}
      </div>
    </details>
  );
}

function Sources({
  sources,
}: {
  readonly sources:
    readonly ApiSource[];
}) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <aside className="typedoc-sources">
      <ul>
        {sources.map(
          (
            source,
            index,
          ) => {
            const text =
              (source.fileName ??
                "Unknown") +
              (
                source.line
                  ? ":" +
                    source.line
                  : ""
              );

            return (
              <li key={index}>
                Defined in{" "}

                {source.url ? (
                  <a
                    href={
                      source.url
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {text}
                  </a>
                ) : (
                  text
                )}
              </li>
            );
          },
        )}
      </ul>
    </aside>
  );
}

function SignatureBox({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <div className="typedoc-signature">
      {children}
    </div>
  );
}

function Anchor({
  id,
}: {
  readonly id: string;
}) {
  return (
    <a
      href={"#" + id}
      className="typedoc-anchor"
      aria-label={
        "Permalink to " + id
      }
    >
      <TypeDocUtilityIcon
        name="anchor"
        className="size-4"
      />
    </a>
  );
}

function Tag({
  children,
}: {
  readonly children:
    React.ReactNode;
}) {
  return (
    <code className="typedoc-tag">
      {children}
    </code>
  );
}

function kindClass(kind: string) {
  return kind
    .replace(
      /([a-z])([A-Z])/g,
      "$1-$2",
    )
    .toLowerCase();
}
