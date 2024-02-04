import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './state/store'
import './index.css'
import { App } from './App'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
