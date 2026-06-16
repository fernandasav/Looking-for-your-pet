import Image from 'next/image';
import Link from 'next/link';
import { Heart, Clock, MapPin, Star, ArrowRight } from 'lucide-react';

const HAPPY_ENDINGS = [
  {
    id: '1',
    pet_name: 'Buddy',
    story:
      'After three weeks of searching, we found Buddy thanks to a neighbor who saw his post.',
    photo_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    date_reunited: '2025-01-15',
    owner_name: 'Sarah M.',
  },

  {
    id: '2',
    pet_name: 'Luna',
    story:
      'Luna disappeared during a storm. The community helped us bring her home.',
    photo_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
    date_reunited: '2025-02-02',
    owner_name: 'Michael R.',
  },

  {
    id: '3',
    pet_name: 'Max',
    story: 'A local family recognized Max from the listing and contacted us.',
    photo_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    date_reunited: '2025-03-10',
    owner_name: 'Emily K.',
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default function HappyEndingsPage() {
  return (
    <main>
      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* HEADER */}

          <div className="mb-16 text-center">
            <h1
              className="text-foreground mb-4 text-6xl"
              style={{
                fontFamily: "'DM Serif Display', serif",
              }}>
              Happy Endings ❤️
            </h1>

            <p className="text-muted-foreground mx-auto max-w-lg text-lg">
              Real stories of real reunions. These families never gave up — and
              their pets came home.
            </p>
          </div>

          {/* STATS */}

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: '1,245',
                label: 'Pets reunited with their families',
                icon: Heart,
                color: '#7C5CBF',
              },

              {
                n: '98%',
                label: 'Found within 30 days',
                icon: Clock,
                color: '#4A7C59',
              },

              {
                n: '42',
                label: 'Cities across North America',
                icon: MapPin,
                color: '#C17C3C',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="bg-card border-border rounded-2xl border p-8 text-center">
                  <Icon
                    size={28}
                    className="mx-auto mb-4"
                    style={{
                      color: item.color,
                    }}
                  />

                  <p
                    className="text-foreground mb-2 text-5xl font-bold"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                    }}>
                    {item.n}
                  </p>

                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>

          {/* STORIES */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HAPPY_ENDINGS.map((h) => (
              <div
                key={h.id}
                className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
                <div className="relative h-56">
                  <Image
                    src={h.photo_url}
                    alt={h.pet_name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                      ❤️ {h.pet_name} is home!
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex justify-between">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <span className="text-muted-foreground text-xs">
                      {formatDate(h.date_reunited)}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed italic">
                    {h.story}
                  </p>

                  <p className="text-muted-foreground text-xs font-semibold">
                    — {h.owner_name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}

          <div className="mt-16 text-center">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white hover:opacity-90"
              style={{
                background: '#7C5CBF',
              }}>
              Start Your Happy Ending
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
