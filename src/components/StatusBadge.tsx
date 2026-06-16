import { Pet } from '../types/pet';

export default function StatusBadge({ status }: { status: Pet['status'] }) {
  const cfg = {
    lost: {
      label: 'Lost',
      bg: 'bg-red-100',
      text: 'text-red-700',
    },

    found: {
      label: 'Found',
      bg: 'bg-green-100',
      text: 'text-green-700',
    },

    reunited: {
      label: 'Reunited ❤️',
      bg: 'bg-purple-100',
      text: 'text-purple-700',
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text} `}>
      {cfg.label}
    </span>
  );
}
