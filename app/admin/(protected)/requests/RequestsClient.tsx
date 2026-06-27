"use client";

import { useState, useMemo, useTransition } from "react";
import type { ResearchRequest, RequestStatus, Note } from "@/lib/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { addNote, updateRequestStatus, convertRequestToProject } from "../actions-data";
import {
  X,
  Mail,
  Building2,
  Globe2,
  Users,
  DollarSign,
  Clock,
  Send,
  Loader2,
  AlertCircle,
  ArrowRightCircle,
  CheckCircle2,
} from "lucide-react";

const statusVariant: Record<RequestStatus, "slate" | "info" | "warning" | "success" | "danger"> = {
  unreviewed: "slate",
  in_review: "info",
  proposal_sent: "warning",
  converted: "success",
  declined: "danger",
};

const statusLabel: Record<RequestStatus, string> = {
  unreviewed: "Unreviewed",
  in_review: "In Review",
  proposal_sent: "Proposal Sent",
  converted: "Converted",
  declined: "Declined",
};

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Unreviewed", value: "unreviewed" },
  { label: "In Review", value: "in_review" },
  { label: "Proposal Sent", value: "proposal_sent" },
  { label: "Converted", value: "converted" },
  { label: "Declined", value: "declined" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatDateTime(d: string) {
  return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function RequestsClient({
  initialRequests,
  initialNotes,
}: {
  initialRequests: ResearchRequest[];
  initialNotes: Note[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<ResearchRequest | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const [noteError, setNoteError] = useState<string | null>(null);

  const [showConvertForm, setShowConvertForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [convertError, setConvertError] = useState<string | null>(null);
  const [convertedJustNow, setConvertedJustNow] = useState(false);

  const requests = initialRequests;
  const notes = initialNotes;

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const matchesFilter = filter === "all" || r.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.contact_name.toLowerCase().includes(q) ||
        r.company.toLowerCase().includes(q) ||
        r.research_type.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [requests, search, filter]);

  const notesFor = (requestId: string) => notes.filter((n) => n.request_id === requestId);

  const handleAddNote = () => {
    if (!selected || !draftNote.trim()) return;
    setNoteError(null);
    startTransition(async () => {
      const result = await addNote({ text: draftNote.trim(), requestId: selected.id, path: "/admin/requests" });
      if (result.success) setDraftNote("");
      else setNoteError(result.error ?? "Could not save note.");
    });
  };

  const handleStatusChange = (status: RequestStatus) => {
    if (!selected) return;
    startTransition(async () => {
      await updateRequestStatus({ requestId: selected.id, status, path: "/admin/requests" });
      setSelected((s) => (s ? { ...s, status } : s));
    });
  };

  const openConvertForm = () => {
    if (!selected) return;
    setProjectName(`${selected.research_type} — ${selected.company}`);
    setProjectOwner("");
    setConvertError(null);
    setConvertedJustNow(false);
    setShowConvertForm(true);
  };

  const handleConvert = () => {
    if (!selected || !projectName.trim()) return;
    setConvertError(null);
    startTransition(async () => {
      const result = await convertRequestToProject({
        requestId: selected.id,
        projectName: projectName.trim(),
        owner: projectOwner.trim() || undefined,
        path: "/admin/requests",
      });
      if (result.success) {
        setShowConvertForm(false);
        setConvertedJustNow(true);
        setSelected((s) => (s ? { ...s, status: "converted" } : s));
      } else {
        setConvertError(result.error ?? "Could not convert this request.");
      }
    });
  };

  return (
    <div>
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search requests by contact, company, type..."
        filters={statusFilters}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {requests.length > 0 && (
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="col-span-3">Contact</span>
            <span className="col-span-3">Research Type</span>
            <span className="col-span-2">Status</span>
            <span className="col-span-2">Budget</span>
            <span className="col-span-2">Submitted</span>
          </div>
        )}
        <div className="divide-y divide-slate-100">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="w-full text-left grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors items-center"
            >
              <div className="col-span-2 lg:col-span-3">
                <p className="text-sm font-medium text-slate-900">{r.contact_name}</p>
                <p className="text-xs text-slate-500">{r.company}</p>
              </div>
              <div className="lg:col-span-3 text-xs text-slate-600">{r.research_type}</div>
              <div className="lg:col-span-2">
                <Badge variant={statusVariant[r.status]}>{statusLabel[r.status]}</Badge>
              </div>
              <div className="lg:col-span-2 text-xs text-slate-600">{r.budget || "Not specified"}</div>
              <div className="lg:col-span-2 text-xs text-slate-400">{formatDate(r.created_at)}</div>
            </button>
          ))}
          {requests.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-slate-500 mb-1">No research requests yet</p>
              <p className="text-xs text-slate-400">
                When a visitor submits the 3-step proposal form on the homepage, it will appear here automatically.
              </p>
            </div>
          )}
          {requests.length > 0 && filtered.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-400">No requests match your search or filter.</div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSelected(null)} />
          <div className="relative w-full sm:w-[460px] max-w-full bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">{selected.id.slice(0, 8)}</p>
                <h2 className="text-lg font-semibold text-slate-900">{selected.contact_name}</h2>
                <p className="text-sm text-slate-500">{selected.company}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1" aria-label="Close panel">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {convertedJustNow && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Converted to a project. View it in Project Management.
                </div>
              )}

              <div>
                <span id="request-status-label" className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Status</span>
                <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="request-status-label">
                  {(Object.keys(statusLabel) as RequestStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={isPending || selected.status === "converted"}
                      aria-pressed={selected.status === s}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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

              {selected.status !== "converted" && (
                <Button size="sm" variant="outline" className="w-full" onClick={openConvertForm}>
                  <ArrowRightCircle className="w-4 h-4" />
                  Convert to Project
                </Button>
              )}

              {showConvertForm && (
                <div className="border border-sky-200 bg-sky-50 rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold text-sky-900">New project details</p>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600">Project name</label>
                    <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} maxLength={200} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600">Owner (optional)</label>
                    <Input value={projectOwner} onChange={(e) => setProjectOwner(e.target.value)} placeholder="e.g. Priya Anand" maxLength={200} />
                  </div>
                  {convertError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {convertError}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={handleConvert} disabled={!projectName.trim() || isPending}>
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm conversion"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowConvertForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{selected.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.industry}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Globe2 className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.countries}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.sample_size} respondents
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <DollarSign className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.budget || "Not specified"}
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  {selected.timeline || "Not specified"}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Research Type</h3>
                <p className="text-sm text-slate-700">{selected.research_type}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Objectives</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selected.objectives}</p>
              </div>

              {selected.business_challenges && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Business Challenges</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.business_challenges}</p>
                </div>
              )}

              {selected.competitors && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Competitors</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.competitors}</p>
                </div>
              )}

              {selected.additional_notes && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Additional Notes (from submitter)</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.additional_notes}</p>
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Internal Notes</h3>
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
                  placeholder="Add an internal note..."
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
