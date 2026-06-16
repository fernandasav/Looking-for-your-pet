'use client';

import { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ReportPage() {
  const [type, setType] = useState<'lost' | 'found'>('lost');

  const [animalType, setAnimalType] = useState<'dog' | 'cat'>('dog');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  const [form, setForm] = useState({
    name: '',
    breed: '',
    color: '',
    sex: '',
    size: '',
    age: '',
    city: '',
    state: '',
    neighborhood: '',
    description: '',
    date: '',
  });

  async function submitPet() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("You need to login first");
    setLoading(false);
    return;
  }

  let imageUrl = null;

  if (photo) {
    imageUrl = await uploadPhoto();
  }

  const { error } = await supabase.from("pet_reports").insert({
    status: type,
    animal_type: animalType,

    name: form.name,
    breed: form.breed,
    color: form.color,
    sex: form.sex,
    size: form.size,
    age: form.age,

    city: form.city,
    state: form.state,
    neighborhood: form.neighborhood,

    description: form.description,

    photo_url: imageUrl,

    date_reported: form.date,

    source: "user",

    created_by: user.id,
    contact_email: user.email,
  });

  if (error) {
    console.log(error);
    alert("Error saving pet");
    setLoading(false);
    return;
  }

  setLoading(false);
  setSubmitted(true);
}

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function uploadPhoto() {
    if (!photo) return null;

    const fileName = `${Date.now()}-${photo.name}`;

    const { error } = await supabase.storage
      .from('pet-images')
      .upload(fileName, photo);

    if (error) {
      console.log(error);
      return null;
    }

    const { data } = supabase.storage.from('pet-images').getPublicUrl(fileName);

    return data.publicUrl;
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <CheckCircle
            size={70}
            className="mx-auto mb-5 text-green-600"
          />

          <h1 className="mb-3 text-4xl">Pet Registered!</h1>

          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: '',
                breed: '',
                color: '',
                sex: '',
                size: '',
                age: '',
                city: '',
                state: '',
                neighborhood: '',
                description: '',
                date: '',
              });
            }}
            className="rounded-xl bg-purple-600 px-6 py-3 text-white">
            Register another
          </button>
        </div>
      </div>
    );
  }

  const input = `
  w-full
  px-4
  py-3
  rounded-xl
  border
  bg-white
  `;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-4 text-5xl">Register a Pet</h1>

      <p className="mb-8 text-gray-500">Fields marked * are required</p>

      {/* DOG CAT */}

      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setAnimalType('dog')}
          className={`rounded-xl border px-8 py-3 ${animalType === 'dog' ? 'bg-purple-600 text-white' : ''} `}>
          🐶 Dog *
        </button>

        <button
          onClick={() => setAnimalType('cat')}
          className={`rounded-xl border px-8 py-3 ${animalType === 'cat' ? 'bg-purple-600 text-white' : ''} `}>
          🐱 Cat *
        </button>
      </div>

      <div className="mb-10 flex gap-3">
        <button
          onClick={() => setType('lost')}
          className={`rounded-xl px-6 py-3 ${type === 'lost' ? 'bg-purple-600 text-white' : 'border'} `}>
          🔍 Lost Pet
        </button>

        <button
          onClick={() => setType('found')}
          className={`rounded-xl px-6 py-3 ${type === 'found' ? 'bg-green-600 text-white' : 'border'} `}>
          📍 Found Pet
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {[
          ['name', 'Pet name *', 'Max'],
          ['breed', 'Breed', 'Golden Retriever'],
          ['color', 'Color *', 'Brown'],
          ['age', 'Age', '3 years'],
          ['city', 'City *', 'Munich'],
          ['state', 'State', 'Bavaria'],
          ['neighborhood', 'Neighborhood', 'Downtown'],
        ].map(([key, label, placeholder]) => (
          <div key={key}>
            <label>{label}</label>

            <input
              className={input}
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => update(key as keyof typeof form, e.target.value)}
            />
          </div>
        ))}

        <div>
          <label>Sex</label>

          <select
            className={input}
            onChange={(e) => update('sex', e.target.value)}>
            <option value="">Select</option>

            <option>Male</option>

            <option>Female</option>
          </select>
        </div>

        <div>
          <label>Date reported *</label>

          <input
            type="date"
            className={input}
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label>Description *</label>

          <textarea
            className={input}
            placeholder="
Collar, marks, personality...
"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label>Photo *</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setPhoto(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              className="mt-4 h-48 rounded-xl object-cover"
            />
          )}
        </div>
      </div>

      <button
        onClick={submitPet}
        className="mt-8 w-full rounded-xl py-4 font-semibold text-white"
        style={{
          background: type === 'lost' ? '#7C5CBF' : '#4A7C59',
        }}>
        Register Pet
      </button>
    </div>
  );
}
