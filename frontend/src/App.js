import { history } from "./helpers/history"
import Home from './components/Home'
import { Router, Switch, Route, Redirect } from "react-router-dom"
import Footer from "./components/Footer"
import "tailwindcss/dist/base.css"
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch, useSelector } from "react-redux"
import { initContent } from "./reducers/contentReducer"
import { useEffect } from "react"




const App= () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initContent(1))
  }, [dispatch])


  return (
    <>
      <CssBaseline />
      <Router history={history}>
      <Switch>
      <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
    </>
  )
}

export default App