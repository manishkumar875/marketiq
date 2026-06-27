import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/shared/PageHeader";
import RequestsClient from "./RequestsClient";
import type { ResearchRequest, Note } from "@/lib/supabase/types";

export default async function RequestsPage() {
  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from("research_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .not("request_id", "is", null)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load research requests:", error);
  }

  const requestsList = (requests ?? []) as ResearchRequest[];
  const notesList = (notes ?? []) as Note[];

  const unreviewedCount = requestsList.filter((r) => r.status === "unreviewed").length;

  return (
    <div>
      <PageHeader
        title="Research Requests"
        description={
          requestsList.length === 0
            ? "No requests yet — submissions from the homepage proposal form will appear here."
            : `${requestsList.length} total requests · ${unreviewedCount} awaiting first review`
        }
      />
      <RequestsClient initialRequests={requestsList} initialNotes={notesList} />
    </div>
  );
}
