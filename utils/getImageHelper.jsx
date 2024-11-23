export const getImageUrl = (image) => {
  if (!image) return null; // Hvis der ikke er noget billede, returneres null
  return image.startsWith("http")
    ? image // Hvis det allerede er en fuld URL, returneres den
    : `${import.meta.env.BASE_URL}${image}`; // Ellers tilføjes base-URL'en
};

// Funktion der genererer den korrekte URL for billeder af aktiviteter
// Ternary operator bruges til at returnere billedets fulde URL, hvis det allerede er en komplet HTTP URL
// Hvis det ikke er en fuld URL, præfikses det med serverens base URL
