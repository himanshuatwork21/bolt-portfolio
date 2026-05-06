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
  token: 'skQMOdr0KUcLstqCjIwfFEnx13uEXuJ2UPWR93Z8ElUhDkwRqqZxheXhbJEbsTeyzDfbQ3KJGqKoxmxsZqvjXZjCUhZJWWcmZ4Wuw7s6tIkEfn5OYTnWV8FNbEyv2jDPNlAd2kqKIl2b7ZVRcI2Aik5uDoHIQarZiqMzbtnKXzyw39G8cRGR',
  useCdn: false,
});