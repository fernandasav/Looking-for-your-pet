export interface Pet {
  id: string;

  status: 'lost' | 'found' | 'reunited';

  animal_type: 'dog' | 'cat';

  name: string;

  breed: string;

  color: string;

  sex?: string;

  size?: string;

  age?: string;

  city: string;

  state: string;

  neighborhood?: string;

  photo_url: string | null;

  description: string;

  date_reported: string;
}
