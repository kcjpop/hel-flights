import { Card, Tab, TabList, TabPanel, Select } from 'kinu'
import { useState } from 'preact/hooks'
import { html } from 'htm/preact'

import { FlightHeatmap } from './FlightHeatmap.js'
import { DestinationList } from './DestinationList.js'
import { getISOWeekNumber } from './helpers.js'

export function App({ data: { arr, arrDest, dep, depDest } }) {
  const [activeTab, setActiveTab] = useState('arr')
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getISOWeekNumber(new Date()),
  )

  const doSwitchTab = (tabName) => () => {
    setActiveTab(tabName)
  }

  return html`
    <${WeekSelect} value=${currentWeekNumber} />

    ${' '}

    <${TabList} role="tablist">
      <${Tab}
        role="tab"
        aria-selected=${activeTab === 'arr'}
        onClick=${doSwitchTab('arr')}
      >
        Arrivals
      <//>
      <${Tab}
        role="tab"
        aria-selected=${activeTab === 'dep'}
        onClick=${doSwitchTab('dep')}
      >
        Departures
      <//>
    <//>

    ${activeTab === 'arr' &&
    html`<${Arrivals} flights=${arr} destinations=${arrDest} />`}
    ${activeTab === 'dep' &&
    html`<${Departures} flights=${dep} destinations=${depDest} />`}
  `
}

/**
 * A select of ISO weeks in this current year
 *
 * @param {object} props
 * @param {number} props.value The currently selected week
 */
function WeekSelect({ value }) {
  const options = Array.from(
    { length: getISOWeekNumber(new Date()) },
    (_, i) =>
      html`<option value="${i + 1}" selected=${value === i + 1}>
        Week ${i + 1}
      </option>`,
  )

  return html`<${Select}>${options}<//>`
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
