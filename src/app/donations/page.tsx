import { MapPin, HandHeart } from 'lucide-react';

export default function DonationsPage() {
  const shelters = [
    {
      name: 'Austin Animal Center',
      city: 'Austin, TX',
      raised: 4200,
      goal: 10000,
      desc: 'Providing emergency care for lost and stray animals since 1989.',
    },
    {
      name: 'Portland Animal Rescue',
      city: 'Portland, OR',
      raised: 7800,
      goal: 12000,
      desc: 'A community-run shelter dedicated to zero-kill outcomes.',
    },
    {
      name: 'Denver Pet Coalition',
      city: 'Denver, CO',
      raised: 2100,
      goal: 8000,
      desc: 'Connecting lost pets with their families across the Rocky Mountain region.',
    },
    {
      name: 'Seattle Humane',
      city: 'Seattle, WA',
      raised: 9500,
      goal: 15000,
      desc: 'Specialized care for injured and abandoned animals in the Pacific Northwest.',
    },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1
            className="text-foreground mb-4 text-6xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Help More Pets Go Home
          </h1>

          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            Your donation supports local shelters, rescue organizations, and the
            volunteers who make reunions possible.
          </p>
        </div>

        {/* Shelters */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {shelters.map((shelter) => {
            const percentage = Math.round(
              (shelter.raised / shelter.goal) * 100,
            );

            return (
              <div
                key={shelter.name}
                className="bg-card border-border rounded-2xl border p-8 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3
                      className="text-foreground mb-1 text-xl font-bold"
                      style={{ fontFamily: "'DM Serif Display', serif" }}>
                      {shelter.name}
                    </h3>

                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin size={11} />
                      {shelter.city}
                    </div>
                  </div>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(74,124,89,0.1)',
                    }}>
                    <HandHeart
                      size={18}
                      style={{ color: '#4A7C59' }}
                    />
                  </div>
                </div>

                <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                  {shelter.desc}
                </p>

                <div className="text-muted-foreground mb-2 flex justify-between text-xs">
                  <span>${shelter.raised.toLocaleString()} raised</span>

                  <span>
                    {percentage}% of ${shelter.goal.toLocaleString()}
                  </span>
                </div>

                <div className="bg-muted mb-5 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      background: '#4A7C59',
                    }}
                  />
                </div>

                <button
                  className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: '#4A7C59' }}>
                  Donate Now
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-12 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #4A7C59 0%, #2D5C3A 100%)',
          }}>
          <HandHeart
            size={40}
            className="mx-auto mb-4 opacity-80"
          />

          <h2
            className="mb-4 text-4xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Every dollar helps a pet get home
          </h2>

          <p className="mx-auto mb-8 max-w-md text-white/80">
            100% of donations go directly to verified shelter partners. No
            platform fees on donations.
          </p>

          <button className="rounded-xl bg-white px-8 py-4 font-semibold text-[#4A7C59] transition-all hover:bg-white/90">
            Make a General Donation
          </button>
        </div>
      </div>
    </div>
  );
}
