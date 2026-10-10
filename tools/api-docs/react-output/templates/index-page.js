export function renderIndexPageTemplate({ projectName, reflections }) {
  return `import { ApiIndexPage } from "./_components/api-shell";

const reflections = ${serialize(reflections)} as const;

export default function Page() {
  return (
    <ApiIndexPage
      projectName=${JSON.stringify(projectName)}
      reflections={reflections}
    />
  );
}
`;
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}
