import { Locale } from "discord.js";

type Localizations<T> = {
  [locale in Locale]?: T;
};
type Path<T> = {
  [K in keyof T]: K extends string ? `${K}.${Path<T[K]>}` | `${K}` : never;
}[keyof T] extends infer U
  ? U extends string
    ? U
    : never
  : never;

function getNestedProperty(obj: any, propertyPath: string): any {
  return propertyPath
    .split(".")
    .reduce((prev, curr) => prev && prev[curr], obj);
}

export function generateLocalization<T>(
  localizations: Localizations<T>,
  propertyPath: Path<T>
): Record<Locale, any> {
  const localization = {} as Record<Locale, any>;

  for (const locale in localizations) {
    if (Object.prototype.hasOwnProperty.call(localizations, locale)) {
      const key = locale as Locale;
      const localizationValue = localizations[key];
      if (localizationValue) {
        const nestedValue = getNestedProperty(localizationValue, propertyPath);
        if (nestedValue !== undefined) {
          localization[key] = nestedValue;
        }
      }
    }
  }

  return localization;
}
