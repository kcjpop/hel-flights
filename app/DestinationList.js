import { Table, Card, Button } from 'kinu'
import { useSignal } from '@preact/signals'
import { html } from 'htm/preact'

export function DestinationList({ header, destinations }) {
  return html`
    <${Card} class="DestinationList">
      <h3>${header}</h3>

      <${Table}>
        <thead>
          <tr>
            <th scope="col">Airport</th>
            <th scope="col">City</th>
            <th scope="col">Flights</th>
          </tr>
        </thead>

        <tbody>
          <${DestimationRows} destinations=${destinations} />
        </tbody>
      <//>
    <//>
  `
}

function DestimationRows({ destinations }) {
  const showAll = useSignal(false)

  const doToggleShowAll = () => {
    showAll.value = !showAll.value
  }

  if (destinations.length < 10) {
    return html`<${Rows} destinations=${destinations} />`
  }

  if (showAll.value) {
    return html`
      <${Rows} destinations=${destinations} />
      <tr>
        <td colspan="3" class="ShowMoreCell">
          <${Button} variant="ghost" onClick=${doToggleShowAll}>Collapse<//>
        </td>
      </tr>
    `
  }

  const first = destinations.slice(0, 10)
  const last = destinations.slice(destinations.length - 5)

  return html`<${Rows} destinations=${first} />
    <tr>
      <td colspan="3" class="ShowMoreCell">
        <${Button} variant="ghost" onClick=${doToggleShowAll}>Expand<//>
      </td>
    </tr>
    <${Rows} destinations=${last} />`
}

function Rows({ destinations }) {
  return destinations.map(
    (dest) =>
      html`<tr>
        <th scope="row">${dest.destination_code}</th>
        <td>${dest.destination_name}</td>
        <td>${dest.flight_count}</td>
      </tr>`,
  )
}
