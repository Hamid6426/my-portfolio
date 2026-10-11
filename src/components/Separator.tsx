export function Separator({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <hr
      className={`my-0 w-full border-0 border-t border-line ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export default Separator;
