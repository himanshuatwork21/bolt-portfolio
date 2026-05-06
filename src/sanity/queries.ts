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
export const skillsQuery = `*[_type == "skillsSection"][0]{
  title,
  subtitle,

  categories[]{
    label,
    icon,
    color,
    skills[]{
      name,
      level
    }
  },

  tools
}`;
export const experienceQuery = `*[_type == "experienceSection"][0]{
  title,
  subtitle,
  experiences[]{
    role,
    company,
    location,
    period,
    type,
    color,
    points
  }
}`;
export const educationQuery = `*[_type == "education"][0]{
  formal,
  sections
}`;