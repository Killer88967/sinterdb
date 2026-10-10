export function renderTypeDocIconTemplate({ iconSpritePath }) {
  return `const ICON_SPRITE = ${JSON.stringify(iconSpritePath)};

interface TypeDocIconProps {
  readonly kind: number | string;
  readonly label?: string;
  readonly className?: string;
}

export function TypeDocIcon({
  kind,
  label,
  className = "size-5",
}: TypeDocIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "typedoc-kind-icon " +
        className
      }
      aria-label={label}
      aria-hidden={
        label
          ? undefined
          : true
      }
    >
      <use
        href={
          ICON_SPRITE +
          "#icon-" +
          kind
        }
      />
    </svg>
  );
}
`;
}
