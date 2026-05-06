export const heroQuery = `*[_type == "hero"][0]{
  name,
  highlight,
  description,
  typingStrings,
  statusText,
  profileSize,
  "imageUrl": profileImage.asset->url,
  stats
}`;