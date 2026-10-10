import type { Metadata } from "next";
import type { ReactNode } from "react";

import { project } from "./_generated/project";
import "./_components/api.css";

export const metadata: Metadata = {
  title: {
    default: project.name,
    template: `%s · ${project.name}`,
  },
};

export default function ApiLayout({ children }: { readonly children: ReactNode }) {
  return children;
}
