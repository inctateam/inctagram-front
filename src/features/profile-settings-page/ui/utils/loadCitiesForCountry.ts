export type City = { en: string; ru: string }
export type Country = { cities: City[]; en: string; ru: string }
export type CountriesData = Record<string, Country>

export const loadCitiesForCountry = (
  selectedCountry: string,
  locale: 'en' | 'ru',
  data: CountriesData,
  setCities: (cities: { label: string; value: string }[]) => void
) => {
  const country = data[selectedCountry]

  if (country?.cities) {
    setCities(
      country.cities.map(city => ({
        label: locale === 'ru' ? city.ru : city.en,
        value: locale === 'ru' ? city.ru : city.en,
      }))
    )
  } else {
    setCities([])
  }
}
