export function Separator({
  maxWidth,
  className,
}: Readonly<{
  maxWidth?: string;
  className?: string;
}>) {
  return (
    <hr
      className={`border-0 border-t border-line w-full my-0 ${className ?? ""}`}
      style={maxWidth ? { maxWidth } : undefined}
      aria-hidden="true"
    />
  );
}

export default Separator;
