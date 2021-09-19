import { history } from "./helpers/history"
import Home from './components/Home'
import { Router, Switch, Route, Redirect } from "react-router-dom"
import Footer from "./components/Footer"
import Product from './components/Product'
import "tailwindcss/dist/base.css"
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch, useSelector } from "react-redux"
import { initContent } from "./reducers/contentReducer"
import { useEffect } from "react"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import StickyFooter from "./components/StickyFooter"


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'



const App= () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initContent(1))
  }, [dispatch])


  return (
    <>
    <CssBaseline />

    <Router history={history}>
      
    <Header />
    <Navbar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/produkt" component={Product} />
    </Switch>

     <StickyFooter />
     
     
    </Router>
    </>
  )
}

export default App