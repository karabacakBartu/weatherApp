export interface WeatherData {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relativehumidity_2m: string
  windspeed_10m: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relativehumidity_2m: number[]
  windspeed_10m: number[]
}

export interface DailyUnits {
  time: string
  weathercode: string
  temperature_2m_max: string
  temperature_2m_min: string
  sunrise: string
  sunset: string
}

export interface Daily {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
}
