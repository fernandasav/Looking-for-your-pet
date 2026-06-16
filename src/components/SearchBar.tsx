'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch = () => {},
}: SearchBarProps) {
  return (
    <div className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search
          size={18}
          className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2"
        />

        <input
          type="text"
          placeholder="Search by city, breed or color…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          className="border-border focus:ring-primary w-full rounded-xl border bg-white py-3.5 pr-4 pl-11 text-sm focus:ring-2 focus:outline-none"
        />
      </div>

      <button
        onClick={onSearch}
        className="rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{
          background: '#7C5CBF',
        }}>
        Search
      </button>
    </div>
  );
}
