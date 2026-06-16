import { Pet } from '../types/pet';

export default function TypeBadge({ type }: { type: Pet['animal_type'] }) {
  return (
    <span className="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
      {type === 'dog' ? '🐶' : '🐱'} {type === 'dog' ? 'Dog' : 'Cat'}
    </span>
  );
}
