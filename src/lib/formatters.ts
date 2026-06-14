export function formatCurrency(
  amount: number,
  currency: 'USD' | 'EGP' | 'SAR' | 'AED',
  lang: 'ar' | 'en' = 'en'
): string {
  const currencyLocales: Record<string, string> = {
    USD: lang === 'ar' ? 'ar-US' : 'en-US',
    EGP: lang === 'ar' ? 'ar-EG' : 'en-EG',
    SAR: lang === 'ar' ? 'ar-SA' : 'en-SA',
    AED: lang === 'ar' ? 'ar-AE' : 'en-AE',
  };

  try {
    return new Intl.NumberFormat(currencyLocales[currency] || 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function formatDate(dateString: string, lang: 'ar' | 'en' = 'en'): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function truncateText(text: string, limit = 50): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
}
