import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { CitiesResponse, FormatedCity } from '@/features/profile-settings-page/ui/servises/types'
const API_KEY = process.env.NEXT_PUBLIC_OXILOR_API_KEY as string

export const fetchCities = async (selectCountry: string) => {
  if (!selectCountry) {
    return []
  }
  try {
    const response = await fetch(
      `https://data-api.oxilor.com/rest/regions?countryCode=${selectCountry}`,
      {
        headers: {
          'Accept-Language': 'en',
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`)
    }
    const data: CitiesResponse = await response.json()
    const cities: FormatedCity[] = data.edges
      .map(edge => ({
        countryCode: edge.node.countryCode,
        id: edge.node.id,
        label: edge.node.name,
        value: edge.node.name,
      }))
      .filter(
        (city, index, self) => index === self.findIndex(c => c.label === city.label) // Убираем дубликаты по имени
      )

    return cities
  } catch (error: unknown) {
    handleRequestError(error)
    throw new Error('Error loading cities')
  }
}
