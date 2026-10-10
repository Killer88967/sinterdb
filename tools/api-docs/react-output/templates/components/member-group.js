export function renderMemberGroupTemplate() {
  return `import { TypeExpression } from "./type-expression";
import { Signature } from "./signature";
import { SourceList } from "./source";
import type { ApiMember } from "../_generated/model";

export function MemberGroup({
  title,
  members,
}: {
  readonly title: string;

  readonly members:
    readonly ApiMember[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="typedoc-member-group">
      <h2>
        {title}
      </h2>

      {members.map(
        (member) => (
          <article
            key={member.id}
            id={member.anchor}
            className="typedoc-member"
          >
            <h3>
              {member.name}
            </h3>

            {member.type && (
              <div className="typedoc-signature">
                <span>
                  {member.name}
                </span>

                {member.flags.optional
                  ? "?: "
                  : ": "}

                <TypeExpression
                  type={
                    member.type
                  }
                />
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
                />
              ),
            )}

            <SourceList
              sources={
                member.sources
              }
            />
          </article>
        ),
      )}
    </section>
  );
}
`;
}
