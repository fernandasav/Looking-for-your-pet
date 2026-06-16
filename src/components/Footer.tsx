'use client';

import Link from 'next/link';

import { PawPrint, Phone, Mail, HandHeart } from 'lucide-react';

export default function Footer() {
  const links = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Happy Endings',
      href: '/happy-endings',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Donations',
      href: '/donations',
    },
  ];

  return (
    <footer className="bg-foreground mt-24 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* BRAND */}

          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: '#7C5CBF',
                }}>
                <PawPrint
                  size={16}
                  className="text-white"
                />
              </div>

              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.1rem',
                }}>
                Looking For Your Pet
              </span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/60">
              Helping lost pets find their families. Every reunion starts with a
              single post.
            </p>
          </div>

          {/* NAVIGATION */}

          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
              Navigate
            </p>

            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}

          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">
              Contact
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@lookingyourpet.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
                <Mail size={14} />
                hello@lookingyourpet.com
              </a>

              <a
                href="tel:+15550001234"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
                <Phone size={14} />
                +1 (555) 000-1234
              </a>

              <Link
                href="/donations"
                className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                style={{
                  background: '#4A7C59',
                }}>
                <HandHeart size={14} />
                Support Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/40">
            © 2026 Looking For Your Pet. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Made with ❤️ for every lost pet out there
          </p>
        </div>
      </div>
    </footer>
  );
}
