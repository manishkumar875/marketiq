import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/shared/PageHeader";
import LeadsClient from "./LeadsClient";
import type { Lead, Note } from "@/lib/supabase/types";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .not("lead_id", "is", null)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load leads:", error);
  }

  const leadsList = (leads ?? []) as Lead[];
  const notesList = (notes ?? []) as Note[];

  const activeCount = leadsList.filter((l) => !["won", "lost"].includes(l.status)).length;

  return (
    <div>
      <PageHeader
        title="Lead Management"
        description={
          leadsList.length === 0
            ? "No leads yet — submissions from the website's contact form will appear here."
            : `${leadsList.length} total leads · ${activeCount} active`
        }
      />
      <LeadsClient initialLeads={leadsList} initialNotes={notesList} />
    </div>
  );
}
