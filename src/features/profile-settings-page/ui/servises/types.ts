export type Country = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null | string
  division3Code: null | string
  division4Code: null | string
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: Array<{ id: string; name: string }>
  population: string
  timezone: string
  type: 'country' // Тип всегда 'country' в этом случае
}
export type FormatedCountry = {
  countryCode: string
  id: string
  label: string
  value: string
}

export type PageInfo = {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}
export type RegionNode = {
  continentCode: string
  countryCode: string
  division1Code: string
  division2Code: null | string
  division3Code: null | string
  division4Code: null | string
  id: string
  latitude: number
  longitude: number
  name: string
  parentRegions: { id: string; name: string }[]
  population: string
  timezone: string
  type: string
}
export type Edge = {
  cursor: string
  node: RegionNode
}
export type CitiesResponse = {
  edges: Edge[]
  pageInfo: PageInfo
}
export type FormatedCity = {
  countryCode?: string
  id: string
  label: string
  value: string
}
