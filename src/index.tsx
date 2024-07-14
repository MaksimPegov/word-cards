import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from 'reportWebVitals'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import { store } from 'state/store'
import { Router } from 'Router'
import 'index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      maxSnack={3}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
