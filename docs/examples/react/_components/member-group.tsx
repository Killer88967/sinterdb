import { Comment } from "./comment";
import { Signature } from "./signature";
import { SourceList } from "./source";
import { TypeExpression } from "./type-expression";
import { TypeDocIcon } from "./typedoc-icon";
import type { ApiMember } from "../_generated/model";

export function MemberGroup({
  title,
  members,
}: {
  readonly title: string;
  readonly members: readonly ApiMember[];
}) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="typedoc-member-group">
      <h2>{title}</h2>

      {members.map((member) => (
        <article
          key={member.id}
          id={member.anchor}
          className="typedoc-member"
        >
          <header className="typedoc-member-header">
            <h3>
              <TypeDocIcon
                kind={member.kindId}
                label={member.kind}
              />

              <span>{member.name}</span>
            </h3>

            <div className="typedoc-member-flags">
              {member.flags.static && (
                <span>Static</span>
              )}

              {member.flags.readonly && (
                <span>Readonly</span>
              )}

              {member.flags.optional && (
                <span>Optional</span>
              )}

              {member.flags.abstract && (
                <span>Abstract</span>
              )}
            </div>
          </header>

          {member.type && (
            <div className="typedoc-signature">
              <span>{member.name}</span>

              {member.flags.optional
                ? "?: "
                : ": "}

              <TypeExpression type={member.type} />
            </div>
          )}

          {member.signatures.map((signature) => (
            <Signature
              key={signature.id}
              signature={signature}
            />
          ))}

          <Comment comment={member.comment} />

          <SourceList sources={member.sources} />
        </article>
      ))}
    </section>
  );
}
