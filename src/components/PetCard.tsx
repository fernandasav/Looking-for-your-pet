'use client';

import { useState } from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';

import { Pet } from '../types/pet';
import { Page } from '../types/page';

import StatusBadge from './StatusBadge';
import TypeBadge from './TypeBadge';

function formatDate(d?: string) {
  if (!d) return '';

  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PetCard({
  pet,
  onNavigate,
}: {
  pet: Pet;
  onNavigate: (p: Page) => void;
}) {
  const [liked, setLiked] = useState(false);

  const isLost = pet.status === 'lost';

  return (
    <div className="bg-card border-border group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={pet.photo_url || '/img.png'}
          alt={pet.name || 'Pet'}
          className="h-52 w-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/img.png';
          }}
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={pet.status} />

          <TypeBadge type={pet.animal_type} />
        </div>

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
          <Heart
            size={16}
            className={
              liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3
          className="mb-1 text-lg font-bold"
          style={{
            fontFamily: "'DM Serif Display', serif",
          }}>
          {pet.name}
        </h3>

        <p className="text-muted-foreground mb-2 text-sm">
          {pet.breed || 'Unknown breed'}

          {' · '}

          {pet.color || 'Unknown color'}
        </p>

        <div className="text-muted-foreground mb-3 flex items-center gap-1 text-xs">
          <MapPin size={12} />

          <span>
            {pet.city || ''}
            {pet.state ? `, ${pet.state}` : ''}
          </span>

          <span>·</span>

          <Calendar size={12} />

          <span>{formatDate(pet.date_reported)}</span>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm">
          {pet.description || 'No description'}
        </p>

        <button
          onClick={() => onNavigate(isLost ? 'lost' : 'found')}
          className="w-full rounded-xl py-2.5 text-sm font-semibold text-white"
          style={{
            background: isLost ? '#C75B5B' : '#4A7C59',
          }}>
          {isLost ? 'Help Find This Pet' : 'Is This My Pet?'}
        </button>
      </div>
    </div>
  );
}
