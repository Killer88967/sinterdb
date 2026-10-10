export function renderReflectionPageTemplate({
  projectName,
  reflection,
  navigation,
}) {
  return `import { ApiReflectionPage } from "../../_components/api-shell";

const api = ${serialize(reflection)} as const;
const navigation = ${serialize(navigation)} as const;

export default function Page() {
  return (
    <ApiReflectionPage
      projectName=${JSON.stringify(projectName)}
      api={api}
      navigation={navigation}
    />
  );
}
`;
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}
