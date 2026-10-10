export function renderHierarchyPageTemplate({
  projectName,
  reflections,
  navigation,
}) {
  const classes = reflections.filter(
    (reflection) => reflection.kind === "Class",
  );

  return `import { ApiHierarchyPage } from "../_components/api-shell";

const classes = ${serialize(classes)} as const;
const navigation = ${serialize(navigation)} as const;

export default function Page() {
  return (
    <ApiHierarchyPage
      projectName=${JSON.stringify(projectName)}
      classes={classes}
      navigation={navigation}
    />
  );
}
`;
}

function serialize(value) {
  return JSON.stringify(value, null, 2);
}
