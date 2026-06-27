import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/shared/PageHeader";
import ProjectsClient from "./ProjectsClient";
import type { Project, Note } from "@/lib/supabase/types";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .not("project_id", "is", null)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load projects:", error);
  }

  const projectsList = (projects ?? []) as Project[];
  const notesList = (notes ?? []) as Note[];

  return (
    <div>
      <PageHeader
        title="Project Management"
        description={
          projectsList.length === 0
            ? "No projects yet — convert a research request into a project from the Research Requests page to get started."
            : `${projectsList.length} active engagement${projectsList.length === 1 ? "" : "s"}`
        }
      />
      <ProjectsClient initialProjects={projectsList} initialNotes={notesList} />
    </div>
  );
}
