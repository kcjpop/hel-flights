import { render } from 'preact'
import { html } from 'htm/preact'

import { App } from './App.js'

app()

async function app() {
  const [arr, dep, arrDest, depDest] = await Promise.all([
    fetch('./arr-heatmap.json').then((res) => res.json()),
    fetch('./dep-heatmap.json').then((res) => res.json()),
    fetch('./arr-destinations.json').then((res) => res.json()),
    fetch('./dep-destinations.json').then((res) => res.json()),
  ])

  render(
    html`<${App} data=${{ arr, arrDest, dep, depDest }} />`,
    document.getElementById('app'),
  )
}
