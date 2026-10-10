interface TypeDocIconProps {
  readonly kind: number;
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
      className={className}
      aria-label={label}
      aria-hidden={label ? undefined : true}
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
