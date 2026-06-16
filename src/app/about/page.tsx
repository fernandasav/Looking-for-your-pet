import Image from 'next/image';
import Link from 'next/link';
import { Search, AlertCircle, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <div className="mb-20 text-center">
          <h1
            className="text-foreground mb-6 text-6xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Our Mission
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            We believe every pet deserves to find their way home. Looking For
            Your Pet connects caring communities with worried families — fast.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-muted relative h-80 overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1620148639493-5a7cc139813d?w=600&h=480&fit=crop&auto=format"
              alt="Happy dog with owner"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2
              className="text-foreground mb-4 text-3xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              How matching works
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              When you register a pet, our system automatically compares it
              against existing listings using breed, color, size, and location.
              Potential matches are flagged and both parties are notified
              immediately.
            </p>

            <div className="flex flex-col gap-3">
              {[
                'Post a detailed listing with photos',
                'Our algorithm finds potential matches',
                'You receive instant notifications',
                'Connect directly and arrange a meetup',
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: '#7C5CBF' }}>
                    {index + 1}
                  </div>

                  <span className="text-foreground text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: 'Find',
              desc: 'Search our database of found pets by breed, color, size, and location to find your companion.',
              color: '#7C5CBF',
            },
            {
              icon: AlertCircle,
              title: 'Report',
              desc: 'Post a lost or found pet listing in under 2 minutes. Photos, location, and details help others help you.',
              color: '#4A7C59',
            },
            {
              icon: Heart,
              title: 'Reconnect',
              desc: "When there's a match, we connect you directly. Many reunions happen within 48 hours of posting.",
              color: '#C17C3C',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-secondary rounded-2xl p-8">
              <item.icon
                size={24}
                className="mb-4"
                style={{ color: item.color }}
              />

              <h3
                className="text-foreground mb-2 text-xl font-bold"
                style={{ fontFamily: "'DM Serif Display', serif" }}>
                {item.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-card border-border rounded-3xl border p-12 text-center">
          <h2
            className="text-foreground mb-4 text-3xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            How you can help
          </h2>

          <p className="text-muted-foreground mx-auto mb-8 max-w-lg">
            Share listings in your neighborhood, volunteer as a local responder,
            or support shelters through our donations page.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/donations"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: '#4A7C59' }}>
              Support a Shelter
            </Link>

            <Link
              href="/report"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: '#7C5CBF' }}>
              Report a Pet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
