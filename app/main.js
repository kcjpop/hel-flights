import { render } from 'preact'
import { html } from 'htm/preact'
import { useContext } from 'preact/hooks'

import { App } from './App.js'
import { AppStateContext, AppStateModel } from './app-state.js'

app()

async function app() {
  const appState = new AppStateModel()

  render(
    html` <${AppStateContext.Provider} value=${appState}>
      <${App} />
    <//>`,
    document.getElementById('app'),
  )
}
