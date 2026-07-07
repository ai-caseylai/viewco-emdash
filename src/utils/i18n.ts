export type Locale = "zh-Hant" | "zh-Hans" | "en";

export function detectLocale(pathname: string): Locale {
  if (pathname.startsWith("/cn/") || pathname === "/cn") return "zh-Hans";
  if (pathname.startsWith("/en/") || pathname === "/en") return "en";
  return "zh-Hant";
}

export function getLocalePath(locale: Locale, path: string): string {
  switch (locale) {
    case "zh-Hans": return `/cn${path}`;
    case "en": return `/en${path}`;
    default: return path;
  }
}

export const LOCALE_META: Record<Locale, { lang: string; label: string }> = {
  "zh-Hant": { lang: "zh-Hant", label: "繁體中文" },
  "zh-Hans": { lang: "zh-Hans", label: "简体中文" },
  "en": { lang: "en", label: "English" },
};

export const SITE_TITLES: Record<Locale, string> = {
  "zh-Hant": "偉保工程有限公司",
  "zh-Hans": "伟保工程有限公司",
  "en": "VIEWCO Engineering Co., Ltd.",
};

export const SITE_TAGLINES: Record<Locale, string> = {
  "zh-Hant": "專業及經驗豐富的偉保團隊致力提供最優質服務",
  "zh-Hans": "专业及经验丰富的伟保团队致力提供最优质服务",
  "en": "Professional and experienced VIEWCO team dedicated to providing the highest quality services",
};

export const LOGO_ALTS: Record<Locale, string> = {
  "zh-Hant": "偉保工程有限公司",
  "zh-Hans": "伟保工程有限公司",
  "en": "VIEWCO Engineering Co., Ltd.",
};
