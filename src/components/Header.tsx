'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PawPrint, LogIn, Menu, X, UserCircle } from 'lucide-react';

import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handler);

    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      window.removeEventListener('scroll', handler);
      listener.subscription.unsubscribe();
    };
  }, []);

  const links = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Happy Endings',
      href: '/happy-endings',
    },
    {
      label: 'Donations',
      href: '/donations',
    },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ?
          'bg-white/95 shadow-sm backdrop-blur-md'
        : 'bg-background/95 backdrop-blur-sm'
      } `}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}

        <Link
          href="/"
          className="text-foreground flex items-center gap-2.5 font-bold">
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
        </Link>

        {/* DESKTOP LINKS */}

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-1.5 text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}

        <div className="flex items-center gap-3">
          <Link
            href="/report"
            className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white md:flex"
            style={{
              background: '#7C5CBF',
            }}>
            Report a Pet
          </Link>

          {/* NÃO LOGADO */}

          {!user && (
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold md:flex">
              <LogIn size={15} />
              Login
            </Link>
          )}

          {/* LOGADO */}

          {user && (
            <Link
              href="/profile"
              className="hover:bg-muted hidden h-10 w-10 items-center justify-center rounded-full md:flex">
              <UserCircle
                size={30}
                className="text-primary"
              />
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="hover:bg-muted rounded-lg p-2 md:hidden">
            {menuOpen ?
              <X size={20} />
            : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE */}

      {menuOpen && (
        <div className="flex flex-col gap-2 border-t bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:bg-muted rounded-lg px-3 py-2">
              {link.label}
            </Link>
          ))}

          <Link
            href="/report"
            className="rounded-xl py-3 text-center font-semibold text-white"
            style={{
              background: '#7C5CBF',
            }}>
            Report a Pet
          </Link>

          {user ?
            <Link
              href="/profile"
              className="flex items-center gap-2 py-3">
              <UserCircle size={22} />
              Profile
            </Link>
          : <Link
              href="/login"
              className="flex items-center gap-2 py-3">
              <LogIn size={18} />
              Login
            </Link>
          }
        </div>
      )}
    </header>
  );
}
