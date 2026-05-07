import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'xy9egrg6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

export const writeClient = createClient({
  projectId: 'xy9egrg6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: false,
});