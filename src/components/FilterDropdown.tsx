'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="border-border hover:border-primary flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors">
        <span>{selected || label}</span>

        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''} `}
        />
      </button>

      {open && (
        <div className="border-border absolute top-full left-0 z-50 mt-2 min-w-[160px] rounded-xl border bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              setSelected('');
              setOpen(false);
            }}
            className="hover:bg-muted w-full px-4 py-2 text-left text-sm">
            All
          </button>

          {options.map((o) => (
            <button
              key={o}
              onClick={() => {
                setSelected(o);
                setOpen(false);
              }}
              className="hover:bg-muted w-full px-4 py-2 text-left text-sm">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
