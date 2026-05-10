import { scaleLinear } from 'd3-scale'

/**
 * Format a Date object to YYYY-MM-DD
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * @typedef {object} FlightHeatmapItem
 * @prop {string} d Date in YYYY-MM-DD format
 * @prop {number} h Hour of the day
 * @prop {number} cnt Total number of flights
 */

/**
 * Group a list of flight heatmap items by dates
 *
 * @param {FlightHeatmapItem[]} flights
 * @returns {Map<string, Map<string, {count: number; color: string}>>}
 */
export function groupFlightsToDate(flights) {
  const max = Math.max(...flights.map((fl) => fl.cnt))

  const colorScale = scaleLinear(
    [0, max],
    ['rgb(165, 216, 255)', 'rgb(59, 91, 219)'],
  )

  /**
   * @type {Map<string, Map<string, {count: number; color: string}>>}
   */
  const map = new Map()
  for (const flight of flights) {
    const bucket = map.get(flight.d) ?? new Map()
    bucket.set(flight.h, { count: flight.cnt, color: colorScale(flight.cnt) })

    map.set(flight.d, bucket)
  }

  return map
}

/**
 * Get ISO week number of provided date
 *
 * @param {Date} date
 * @returns {number}
 */
export function getISOWeekNumber(date) {
  // Find the closest Thursday
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))

  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d - yearStart) / 86_400_000 + 1) / 7)
}
