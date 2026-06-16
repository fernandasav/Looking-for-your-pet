'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, PawPrint, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm';

  async function handleSubmit() {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push('/');
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,

        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          name,
        });
      }

      router.push('/');
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen pt-16">
      {/* IMAGE */}

      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1667203808904-79e1de0692fd"
          alt="Dog"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative mt-auto p-12 text-white">
          <PawPrint
            size={32}
            className="mb-4"
          />

          <h2
            className="mb-3 text-4xl"
            style={{
              fontFamily: "'DM Serif Display', serif",
            }}>
            Every pet deserves to come home.
          </h2>

          <p className="max-w-xs text-sm text-white/70">
            Join thousands of caring people who help reunite families with their
            pets.
          </p>
        </div>
      </div>

      {/* FORM */}

      <div className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="text-muted-foreground mb-10 flex items-center gap-2 text-sm">
            <ArrowRight
              size={14}
              className="rotate-180"
            />
            Back to home
          </Link>

          <h1
            className="mb-2 text-4xl"
            style={{
              fontFamily: "'DM Serif Display', serif",
            }}>
            {mode === 'login' ? 'Welcome back' : 'Join the community'}
          </h1>

          <p className="text-muted-foreground mb-8 text-sm">
            {mode === 'login' ?
              'Sign in to manage your pet listings'
            : 'Create an account to report and track pets'}
          </p>

          <div className="bg-secondary mb-8 flex gap-2 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                mode === 'login' ? 'bg-white shadow-sm' : (
                  'text-muted-foreground'
                )
              } `}>
              Login
            </button>

            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${
                mode === 'signup' ? 'bg-white shadow-sm' : (
                  'text-muted-foreground'
                )
              } `}>
              Create Account
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  className={inputClass}
                  placeholder="Sarah Mitchell"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Email
              </label>

              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Password
              </label>

              <input
                type="password"
                className={inputClass}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 w-full rounded-xl py-4 font-semibold text-white"
              style={{
                background: '#7C5CBF',
              }}>
              {loading ?
                'Loading...'
              : mode === 'login' ?
                'Sign In'
              : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="bg-border h-px flex-1" />

            <span className="text-muted-foreground text-xs">
              or continue with
            </span>

            <div className="bg-border h-px flex-1" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-xl border py-3">Google</button>

            <button className="rounded-xl border py-3">Facebook</button>
          </div>

          <div className="bg-secondary mt-6 flex items-center gap-2 rounded-xl p-4">
            <Shield
              size={14}
              style={{
                color: '#4A7C59',
              }}
            />

            <p className="text-muted-foreground text-xs">
              Your data is secured with Supabase Auth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
