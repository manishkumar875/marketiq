"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterChip {
  label: string;
  value: string;
}

interface AdminToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder: string;
  filters: FilterChip[];
  activeFilter: string;
  onFilterChange: (v: string) => void;
}

export default function AdminToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  activeFilter,
  onFilterChange,
}: AdminToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={activeFilter === f.value}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
              activeFilter === f.value
                ? "bg-sky-700 text-white border-sky-700"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
