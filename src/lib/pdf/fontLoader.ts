let cachedFont: ArrayBuffer | null = null;

export async function fetchArabicFont(): Promise<ArrayBuffer> {
  if (cachedFont) {
    return cachedFont;
  }

  const urls = [
    'https://cdn.jsdelivr.net/npm/@notofonts/arabic@2.0.14/fonts/NotoSansArabic/unhinted/ttf/NotoSansArabic-Regular.ttf',
    'https://fonts.gstatic.com/s/notosansarabic/v18/j8_2wXDCWAsEunFasOz3v9gNxaNK8tXfNfO1.ttf',
    'https://fonts.gstatic.com/s/notosansarabic/v21/j8_2wXDCWAsEunFasOz3v9gNxaNK8tXfNfO1.ttf',
    'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notosansarabic/static/NotoSansArabic-Regular.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansarabic/static/NotoSansArabic-Regular.ttf'
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: 'force-cache' });
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        if (buffer && buffer.byteLength > 1000) {
          cachedFont = buffer;
          return buffer;
        }
      }
    } catch (e) {
      console.warn(`[fontLoader] Failed to fetch Arabic font from: ${url}`, e);
    }
  }

  throw new Error('All Noto Sans Arabic standard TTF sources failed to load.');
}
