import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'xy9egrg6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // ✅ only fetching
});