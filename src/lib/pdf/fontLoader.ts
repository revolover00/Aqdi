export async function fetchArabicFont(): Promise<ArrayBuffer> {
  const fontUrl = 'https://fonts.gstatic.com/s/notosansarabic/v21/j8_2wXDCWAsEunFasOz3v9gNxaNK8tXfNfO1.ttf';
  try {
    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch Noto Sans Arabic font: ${response.statusText}`);
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.error('[fontLoader] Error loading Arabic font, falling back to basic fetching...', error);
    // Standard fetch fallback
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-arabic/files/noto-sans-arabic-arabic-400-normal.woff');
    return await res.arrayBuffer();
  }
}
