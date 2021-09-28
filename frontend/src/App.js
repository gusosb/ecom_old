import { history } from "./helpers/history"
import Home from './components/Home'
import Category from './components/Category'
import { Router, Switch, Route } from "react-router-dom"
import Product from './components/Product'
import "tailwindcss/dist/base.css"
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch } from "react-redux"
import { initContent } from "./reducers/contentReducer"
import { useEffect } from "react"

import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Success from './components/Success'
import StickyFooter from "./components/StickyFooter"
import './components/Styles.css'




const App= () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initContent(1))
  }, [dispatch])


  return (
    <>
    <CssBaseline />

    <Router history={history}>
    <div className="container">
    <Header />
    <Navbar />
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/produkt" component={Product} />
    <Route exact path="/kategori" component={Category} />
    <Route path="/success" component={Success} />
    </Switch>

     <StickyFooter />

     </div>
     
     
    </Router>
    </>
  )
}

export default App