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
export const projectsQuery = `*[_type == "project"]{
  _id,
  title,
  description,
  category,
  color,
  github,
  demo,
  tags,
  "image": image.asset->url
}`;