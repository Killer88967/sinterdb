export function renderSignatureTemplate() {
  return `import { TypeExpression } from "./type-expression";
import type { ApiSignature } from "../_generated/model";

export function Signature({
  signature,
}: {
  readonly signature:
    ApiSignature;
}) {
  return (
    <div className="typedoc-signature">
      <span>
        {signature.name}
      </span>

      {"("}

      {signature.parameters.map(
        (
          parameter,
          index,
        ) => (
          <span
            key={parameter.id}
          >
            {index > 0
              ? ", "
              : ""}

            <span className="typedoc-parameter">
              {
                parameter.name
              }
            </span>

            {parameter.flags.optional
              ? "?: "
              : ": "}

            <TypeExpression
              type={
                parameter.type
              }
            />
          </span>
        ),
      )}

      {"): "}

      <TypeExpression
        type={
          signature.returnType
        }
      />
    </div>
  );
}
`;
}
