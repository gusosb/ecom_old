import { history } from "./helpers/history"
import Home from './components/Home'
import Category from './components/Category'
import { Router, Switch, Route } from "react-router-dom"
import "tailwindcss/dist/base.css"
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch } from "react-redux"
import { initContent } from "./reducers/contentReducer"
import { useEffect } from "react"

import Orders from './components/Orders'
import Passreset from "./components/Passreset"
import Register from "./components/Register"
import Login from './components/Login'
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Success from './components/Success'
import PasswordReset from './components/PasswordReset'
import StickyFooter from "./components/StickyFooter"
import Prod from "./components/Prod"
import './components/Styles.css'
import Checkout from "./components/Checkout"




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

    <Route path="/prod/:catid/:prodid" component={Prod} />
    <Route path="/kategori/:catid" component={Category} />
    <Route path="/success" component={Success} />
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/register" component={Register} />
    <Route path="/passreset" component={Passreset} />
    <Route path="/bestallningar" component={Orders} />
    <Route path="/resetpassword/:uidb64/:token" component={PasswordReset} />

    <Route exact path="/" component={Home} />
    </Switch>

     <StickyFooter />

     </div>
     
     
    </Router>
    </>
  )
}

export default App