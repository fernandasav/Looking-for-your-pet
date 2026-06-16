'use client';

import { useState } from 'react';
import { PawPrint } from 'lucide-react';

import PetCard from './PetCard';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

import { Page } from '../types/page';
import { Pet } from '../types/pet';

const PETS: Pet[] = [];

export default function PetListPage({
  title,
  subtitle,
  statusFilter,
  buttonLabel,
  onNavigate,
}: {
  title: string;
  subtitle: string;
  statusFilter: 'lost' | 'found';
  buttonLabel: string;
  onNavigate: (p: Page) => void;
}) {
  const [search, setSearch] = useState('');

  const filtered = PETS.filter(
    (p) =>
      p.status === statusFilter &&
      (search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.breed.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.color.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-24 pb-20">
      <div className="mb-10">
        <h1
          className="text-foreground mb-3 text-5xl"
          style={{
            fontFamily: "'DM Serif Display', serif",
          }}>
          {title}
        </h1>

        <p className="text-muted-foreground text-lg">{subtitle}</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="min-w-[280px] flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={() => {}}
          />
        </div>

        <FilterDropdown
          label="Breed"
          options={[
            'Golden Retriever',
            'German Shepherd',
            'Beagle',
            'Labrador',
            'Persian',
            'Tabby',
          ]}
        />

        <FilterDropdown
          label="Color"
          options={['Black', 'White', 'Brown', 'Golden', 'Gray', 'Orange']}
        />

        <FilterDropdown
          label="Location"
          options={['Austin, TX', 'Portland, OR', 'Denver, CO', 'Seattle, WA']}
        />
      </div>

      <p className="text-muted-foreground mb-6 text-sm">
        {filtered.length} listings found
      </p>

      {filtered.length > 0 ?
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <PetCard
              key={p.id}
              pet={p}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      : <div className="py-24 text-center">
          <PawPrint
            size={48}
            className="text-muted-foreground mx-auto mb-4 opacity-40"
          />

          <p className="text-xl font-medium">No pets found</p>

          <p className="text-muted-foreground text-sm">
            Try another search or{' '}
            <button
              onClick={() => onNavigate('report')}
              className="text-primary underline">
              report a pet
            </button>
          </p>
        </div>
      }
    </div>
  );
}
