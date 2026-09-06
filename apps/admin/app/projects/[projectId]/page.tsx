import React from "react";
import { ProjectWorkspaceView } from "../../../components/project-workspace/workspace-view";

export default function ProjectWorkspacePage({ params }: { params: { projectId: string } }) {
  return <ProjectWorkspaceView projectId={params.projectId} />;
}
