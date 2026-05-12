import { createContext } from 'preact'
import { signal, computed, effect, createModel } from '@preact/signals'

import { getISOWeekNumber } from './helpers.js'

export const AppStateContext = createContext()

export const AppStateModel = createModel(() => {
  const currentWeekNumber = signal(getISOWeekNumber(new Date()))
  const arr = signal([])
  const dep = signal([])
  const arrDest = signal([])
  const depDest = signal([])

  effect(async () => {
    const res = await fetchFlightsByWeek(currentWeekNumber)

    arr.value = res.arr
    dep.value = res.dep
    arrDest.value = res.arrDest
    depDest.value = res.depDest
  })

  return {
    arr,
    dep,
    arrDest,
    depDest,

    currentWeekNumber,
    changeWeekNumber(wk) {
      currentWeekNumber.value = wk
    },
  }
})

/**
 * Fetch flights data of provided week
 *
 * @param {number} weekNumber
 * @returns
 */
async function fetchFlightsByWeek(weekNumber) {
  const path = `./2026/w${(weekNumber + '').padStart(2, '0')}`

  const [arr, dep, arrDest, depDest] = await Promise.all([
    fetch(path + '/arr-heatmap.json').then((res) => res.json()),
    fetch(path + '/dep-heatmap.json').then((res) => res.json()),
    fetch(path + '/arr-destinations.json').then((res) => res.json()),
    fetch(path + '/dep-destinations.json').then((res) => res.json()),
  ])

  return { arr, dep, arrDest, depDest }
}
