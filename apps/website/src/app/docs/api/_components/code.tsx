import Link from "next/link";

import type { ApiCode, ApiToken } from "../_generated/model";
import { cx } from "./utils";

/**
 * Pre-highlighted code produced by the generator. Type references link
 * to their pages; nothing is parsed at runtime.
 */
export function Code({
  code,
  block = false,
  className,
}: {
  readonly code: ApiCode;
  readonly block?: boolean;
  readonly className?: string;
}) {
  const tokens = code.map((token, index) => (
    <Token key={index} token={token} />
  ));

  if (block) {
    return (
      <pre className={cx("tdk-code", className)}>
        <code>{tokens}</code>
      </pre>
    );
  }

  return <code className={cx("tdk-code-inline", className)}>{tokens}</code>;
}

function Token({ token }: { readonly token: ApiToken }) {
  const [text, kind, href] = token;
  const className = kind ? `tdk-t-${kind}` : undefined;

  if (href) {
    return /^https?:/u.test(href) ? (
      <a
        href={href}
        className={cx("tdk-t-link", className)}
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    ) : (
      <Link
        href={href}
        prefetch={false}
        className={cx("tdk-t-link", className)}
      >
        {text}
      </Link>
    );
  }

  return className ? <span className={className}>{text}</span> : text;
}
