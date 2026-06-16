'use client';

import {
  AlertCircle,
  ArrowRight,
  Camera,
  Heart,
  PawPrint,
  Search,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

import { supabase } from '@/lib/supabase';
import { Pet } from '../types/pet';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function loadPets() {
      setLoading(true);

      const { data, error } = await supabase
        .from('pet_reports')
        .select('*')
        .order('created_at', {
          ascending: false,
        });

      console.log('SUPABASE DATA:', data);
      console.log('SUPABASE ERROR:', error);

      if (error) {
        console.log('ERRO BUSCANDO PETS', error);
        setLoading(false);
        return;
      }

      setPets(data as Pet[]);
      setLoading(false);
    }

    loadPets();
  }, []);
  const recentPets = pets.slice(0, 12);

  return (
    <main>
      {/* HERO */}

      <section className="flex min-h-screen items-center pt-16">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: 'rgba(124,92,191,.12)',
                  color: '#7C5CBF',
                }}>
                <PawPrint size={12} />
                1,245 pets reunited so far
              </div>

              <h1
                className="text-foreground mb-6 text-5xl lg:text-6xl"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                }}>
                Lost your pet?
                <span style={{ color: '#7C5CBF' }}>
                  {' '}
                  We will help you find it.
                </span>
              </h1>

              <p className="text-muted-foreground mb-8 text-lg">
                Here are all the best found pets. If your pet is not there,
                register it here.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/report')}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-white transition-all hover:opacity-90"
                  style={{
                    background: '#7C5CBF',
                  }}>
                  <AlertCircle size={16} />
                  Report Lost Pet
                </button>

                <button
                  onClick={() =>
                    document.getElementById('found-pets')?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }
                  className="hover:border-primary hover:text-primary flex items-center gap-2 rounded-xl border px-6 py-3 transition-all">
                  View Found Pets
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1579119134757-5c38803f34fc?w=700"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2
            className="mb-6 text-center text-4xl"
            style={{
              fontFamily: "'DM Serif Display', serif",
            }}>
            Find your pet
          </h2>

          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={() => {}}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <FilterDropdown
              label="Animal Type"
              options={['Dog', 'Cat']}
            />

            <FilterDropdown
              label="Status"
              options={['Lost', 'Found']}
            />

            <FilterDropdown
              label="Color"
              options={['Black', 'White', 'Brown', 'Golden', 'Gray']}
            />
          </div>
        </div>
      </section>

      {/* PETS */}

      <section
        id="found-pets"
        className="mx-auto max-w-7xl px-6 py-20">
        <h2
          className="mb-10 text-4xl"
          style={{
            fontFamily: "'DM Serif Display', serif",
          }}>
          Recently Added Pets
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recentPets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onNavigate={(page) => router.push(`/${page}`)}
            />
          ))}
        </div>
    <p className="mt-4 text-center text-lg">Total pets: {recentPets.length}</p>
      </section>

      {/* HOW IT WORKS */}

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl">How it works</h2>


          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Camera,
                title: 'Report',
                text: 'Post your lost or found pet',
              },
              {
                icon: Search,
                title: 'Search',
                text: 'Find possible matches',
              },
              {
                icon: Heart,
                title: 'Reunite',
                text: 'Bring them home',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-8">
                  <Icon size={30} />

                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
