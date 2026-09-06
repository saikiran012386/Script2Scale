import { redirect } from "next/navigation";

export default function ProjectApproveRedirectPage({ params }: { params: { projectId: string } }) {
  redirect(`/projects/${params.projectId}/approval`);
}
