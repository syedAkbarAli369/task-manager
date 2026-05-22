

const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null

  if (imagePath.startsWith('http')) return imagePath

  return `${API_BASE_URL}${imagePath}`;

}