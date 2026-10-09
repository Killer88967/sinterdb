interface TypeDocIconProps {
  readonly kind:
    number | string;

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
        label ? undefined : true
      }
    >
      <use
        href={
          "/docs/api/assets/icons.svg#icon-" +
          kind
        }
      />
    </svg>
  );
}

export function TypeDocUtilityIcon({
  name,
  className = "size-4",
}: {
  readonly name:
    | "anchor"
    | "chevronDown"
    | "search"
    | "menu"
    | "folder";

  readonly className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <use
        href={
          "/docs/api/assets/icons.svg#icon-" +
          name
        }
      />
    </svg>
  );
}
