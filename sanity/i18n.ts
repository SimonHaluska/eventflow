export function cmsText(
  lang: string,
  sk: string | undefined | null,
  en: string | undefined | null,
  fallback: string
): string {
  const value = lang === "sk" ? sk : en ?? sk;
  return value || fallback;
}
