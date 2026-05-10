import { Table, Card } from 'kinu'
import { html } from 'htm/preact'

import { formatDate, groupFlightsToDate } from './helpers.js'

export function FlightHeatmap({ flights }) {
  return html`
    <${Card} class="FlightHeatmap">
      <header>
        <h3>Flight counts by hours</h3>
      </header>

      <div className="overflow-auto">
        <${HeatMap} flights=${flights} />
      </div>
    <//>
  `
}

function HeatMap({ flights }) {
  const grouped = groupFlightsToDate(flights)
  const today = formatDate(new Date())

  return html`
    <${Table} class="HeatMap">
      <thead>
        <tr>
          <th></th>
          <th scope="col">0</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">10</th>
          <th scope="col">11</th>
          <th scope="col">12</th>
          <th scope="col">13</th>
          <th scope="col">14</th>
          <th scope="col">15</th>
          <th scope="col">16</th>
          <th scope="col">17</th>
          <th scope="col">18</th>
          <th scope="col">19</th>
          <th scope="col">20</th>
          <th scope="col">21</th>
          <th scope="col">22</th>
          <th scope="col">23</th>
        </tr>
      </thead>

      <tbody>
        ${Array.from(grouped.entries()).map(
          ([day, hours]) => html`
            <tr>
              <th scope="row" class="HeatmapDate" data-today=${day === today}>
                ${day}
              </th>
              <${HourCells} hours=${hours} />
            </tr>
          `,
        )}
      </tbody>
    <//>
  `
}

function HourCells({ hours }) {
  return Array.from({ length: 24 }, (_, hour) => {
    if (!hours.has(hour)) {
      return html`<td class="HeatmapCell" />`
    }

    const { count, color } = hours.get(hour)

    return html`
      <td class="HeatmapCell" style="--color: ${color}">${count}</td>
    `
  })
}
