import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import interceptors from "./services/interceptors"


const theme = createTheme({
  palette: {
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#fff59d',
    },
    own: {
      main: '#e6ceff',
    },
    white: {
      main: '#FFFFFF',
    },
    nwo: {
      main: '#9c27b0',
    }
  },
})



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

interceptors(store)