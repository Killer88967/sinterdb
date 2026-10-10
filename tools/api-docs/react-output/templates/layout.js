export function renderLayoutTemplate() {
  return `import "./_components/api.css";

export default function ApiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
`;
}
