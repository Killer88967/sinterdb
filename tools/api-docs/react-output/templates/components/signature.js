export function renderSignatureTemplate() {
  return `import { Comment } from "./comment";
import { SourceList } from "./source";
import { TypeExpression } from "./type-expression";
import type { ApiSignature } from "../_generated/model";

export function Signature({
  signature,
}: {
  readonly signature: ApiSignature;
}) {
  return (
    <section className="typedoc-signature-block">
      <div className="typedoc-signature">
        <span className="typedoc-signature-name">
          {signature.name}
        </span>

        {signature.typeParameters.length > 0 && (
          <>
            {"<"}

            {signature.typeParameters.map(
              (typeParameter, index) => (
                <span key={typeParameter.id}>
                  {index > 0 ? ", " : ""}

                  <span className="typedoc-type-parameter">
                    {typeParameter.name}
                  </span>

                  {typeParameter.type && (
                    <>
                      {" extends "}

                      <TypeExpression
                        type={typeParameter.type}
                      />
                    </>
                  )}

                  {typeParameter.default && (
                    <>
                      {" = "}

                      <TypeExpression
                        type={typeParameter.default}
                      />
                    </>
                  )}
                </span>
              ),
            )}

            {">"}
          </>
        )}

        {"("}

        {signature.parameters.map(
          (parameter, index) => (
            <span key={parameter.id}>
              {index > 0 ? ", " : ""}

              <span className="typedoc-parameter">
                {parameter.name}
              </span>

              {parameter.flags.optional
                ? "?: "
                : ": "}

              <TypeExpression
                type={parameter.type}
              />

              {parameter.defaultValue && (
                <>
                  {" = "}

                  <span className="typedoc-default-value">
                    {parameter.defaultValue}
                  </span>
                </>
              )}
            </span>
          ),
        )}

        {"): "}

        <TypeExpression
          type={signature.returnType}
        />
      </div>

      <Comment comment={signature.comment} />

      <SourceList sources={signature.sources} />
    </section>
  );
}
`;
}
