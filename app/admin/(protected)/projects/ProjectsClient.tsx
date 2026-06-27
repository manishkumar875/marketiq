"use client";

import { useState, useMemo, useTransition } from "react";
import type { Project, ProjectStatus, Note } from "@/lib/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { addNote, updateProjectStatus } from "../actions-data";
import { X, Building2, User, Send, Loader2, AlertCircle, Link2 } from "lucide-react";

const statusVariant: Record<ProjectStatus, "slate" | "info" | "purple" | "warning" | "success"> = {
  planning: "slate",
  in_field: "info",
  analysis: "purple",
  reporting: "warning",
  completed: "success",
};

const statusLabel: Record<ProjectStatus, string> = {
  planning: "Planning",
  in_field: "In Field",
  analysis: "Analysis",
  reporting: "Reporting",
  completed: "Completed",
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Planning", value: "planning" },
  { label: "In Field", value: "in_field" },
  { label: "Analysis", value: "analysis" },
  { label: "Reporting", value: "reporting" },
  { label: "Completed", value: "completed" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatDateTime(d: string) {
  return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function ProjectsClient({
  initialProjects,
  initialNotes,
}: {
  initialProjects: Project[];
  initialNotes: Note[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const [noteError, setNoteError] = useState<string | null>(null);

  const projects = initialProjects;
  const notes = initialNotes;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "all" || p.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.client_company.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [projects, search, filter]);

  const notesFor = (projectId: string) => notes.filter((n) => n.project_id === projectId);

  const handleAddNote = () => {
    if (!selected || !draftNote.trim()) return;
    setNoteError(null);
    startTransition(async () => {
      const result = await addNote({ text: draftNote.trim(), projectId: selected.id, path: "/admin/projects" });
      if (result.success) setDraftNote("");
      else setNoteError(result.error ?? "Could not save note.");
    });
  };

  const handleStatusChange = (status: ProjectStatus) => {
    if (!selected) return;
    startTransition(async () => {
      await updateProjectStatus({ projectId: selected.id, status, path: "/admin/projects" });
      setSelected((s) => (s ? { ...s, status } : s));
    });
  };

  return (
    <div>
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects by name, client..."
        filters={statusFilters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {projects.length > 0 && (
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="col-span-5">Project</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Owner</span>
            <span className="col-span-2">Client</span>
            <span className="col-span-1">Created</span>
          </div>
        )}
        <div className="divide-y divide-slate-100">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="w-full text-left grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="col-span-2 lg:col-span-5">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                {p.source_request_id && (
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> Converted from a research request
                  </p>
                )}
              </div>
              <div className="lg:col-span-2">
                <Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
              </div>
              <div className="lg:col-span-2 text-xs text-slate-600">{p.owner || "Unassigned"}</div>
              <div className="lg:col-span-2 text-xs text-slate-600">{p.client_company}</div>
              <div className="lg:col-span-1 text-xs text-slate-400">{formatDate(p.created_at)}</div>
            </button>
          ))}
          {projects.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-slate-500 mb-1">No projects yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Projects are created when an admin converts a research request. Go to{" "}
                <span className="font-medium text-slate-600">Research Requests</span> and use
                "Convert to Project" on a request to get started.
              </p>
            </div>
          )}
          {projects.length > 0 && filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-400">No projects match your search or filter.</div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSelected(null)} />
          <div className="relative w-full sm:w-[420px] max-w-full bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">{selected.id.slice(0, 8)}</p>
                <h2 className="text-lg font-semibold text-slate-900">{selected.name}</h2>
                <p className="text-sm text-slate-500">{selected.client_company}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1" aria-label="Close panel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <div>
                <span id="project-status-label" className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Status</span>
                <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="project-status-label">
                  {(Object.keys(statusLabel) as ProjectStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={isPending}
                      aria-pressed={selected.status === s}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                        selected.status === s
                          ? "bg-sky-600 text-white border-sky-600"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.client_company}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.owner ? `Owned by ${selected.owner}` : "Unassigned"}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Notes</h3>
                <div className="space-y-3">
                  {notesFor(selected.id).length === 0 && (
                    <p className="text-xs text-slate-400">No notes yet.</p>
                  )}
                  {notesFor(selected.id).map((n) => (
                    <div key={n.id} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-700">{n.author_name}</span>
                        <span className="text-[11px] text-slate-400">{formatDateTime(n.created_at)}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              {noteError && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {noteError}
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={2}
                  className="flex-1"
                  maxLength={2000}
                />
                <Button
                  size="icon"
                  onClick={handleAddNote}
                  disabled={!draftNote.trim() || isPending}
                  className="shrink-0 self-end h-10 w-10"
                  aria-label="Add note"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
