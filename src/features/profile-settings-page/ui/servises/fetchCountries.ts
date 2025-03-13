import { handleRequestError } from '@/features/auth/utils/handleRequestError'
import { Country, FormatedCountry } from '@/features/profile-settings-page/ui/servises/types'

const API_KEY = process.env.NEXT_PUBLIC_OXILOR_API_KEY as string

export const fetchCountries = async () => {
  try {
    const response = await fetch(`https://data-api.oxilor.com/rest/countries?lng=en`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    const data: Country[] = await response.json()
    const countries: FormatedCountry[] = data.map(country => ({
      countryCode: country.countryCode,
      id: country.id,
      label: country.name,
      value: country.name,
    }))

    return countries
  } catch (error) {
    handleRequestError(error)
    throw new Error('Error loading countries')
  }
}
