import { Card, Tab, TabList, TabPanel, Select } from 'kinu'
import { useContext } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import { html } from 'htm/preact'

import { AppStateContext } from './app-state.js'
import { getISOWeekNumber } from './helpers.js'
import { DestinationList } from './DestinationList.js'
import { FlightHeatmap } from './FlightHeatmap.js'

export function App() {
  const state = useContext(AppStateContext)

  const activeTab = useSignal('arr')

  const doSwitchTab = (tabName) => () => {
    activeTab.value = tabName
  }

  const doChangeWeek = (e) => {
    state.changeWeekNumber(Number(e.target.value))
  }

  return html`
    <${WeekSelect}
      value=${state.currentWeekNumber.value}
      onChange=${doChangeWeek}
    />

    ${' '}

    <${TabList} role="tablist">
      <${Tab}
        role="tab"
        aria-selected=${activeTab.value === 'arr'}
        onClick=${doSwitchTab('arr')}
      >
        Arrivals
      <//>
      <${Tab}
        role="tab"
        aria-selected=${activeTab.value === 'dep'}
        onClick=${doSwitchTab('dep')}
      >
        Departures
      <//>
    <//>

    ${activeTab.value === 'arr' &&
    html`<${Arrivals}
      flights=${state.arr.value}
      destinations=${state.arrDest.value}
    />`}
    ${activeTab.value === 'dep' &&
    html`<${Departures}
      flights=${state.dep.value}
      destinations=${state.depDest.value}
    />`}
  `
}

/**
 * A select of ISO weeks in this current year
 *
 * @param {object} props
 * @param {number} props.value The currently selected week
 * @param {function} props.onChange
 */
function WeekSelect({ value, onChange }) {
  const options = Array.from(
    { length: getISOWeekNumber(new Date()) },
    (_, i) =>
      html`<option value="${i + 1}" selected=${value === i + 1}>
        Week ${i + 1}
      </option>`,
  )

  return html`<${Select} onChange=${onChange}>${options}<//>`
}

function Arrivals({ flights, destinations }) {
  return html`<${TabPanel} role="tabpanel" class="flow">
    <${FlightHeatmap} flights=${flights} />

    <${DestinationList} header="Arrive from" destinations=${destinations} />
  <//>`
}

function Departures({ flights, destinations }) {
  return html`<${TabPanel} role="tabpanel" class="flow">
    <${FlightHeatmap} flights=${flights} />

    <${DestinationList} header="Depart to" destinations=${destinations} />
  <//>`
}
