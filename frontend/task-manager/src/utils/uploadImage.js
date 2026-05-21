

const API_BASE_URL = 'http://localhost:8000';

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null

  if (imagePath.startsWith('http')) return imagePath

  return `${API_BASE_URL}${imagePath}`;

}