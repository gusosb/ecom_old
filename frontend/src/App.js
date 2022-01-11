import { history } from "./helpers/history"
import { Suspense, lazy } from 'react';
import Home from './components/Home'

import { Router, Switch, Route } from "react-router-dom"
import "tailwindcss/dist/base.css"
import CssBaseline from '@mui/material/CssBaseline'
import { useDispatch } from "react-redux"
import { initContent } from "./reducers/contentReducer"
import { useEffect } from "react"
import useWindowSize from "./hooks/hooks"

import Header from "./components/Header"
import Navbar from "./components/Navbar"
import StickyFooter from "./components/StickyFooter"
import './components/Styles.css'
import HeaderSmall from "./components/HeaderSmall"

const Orders = lazy(() => import('./components/Orders'))
const Passreset = lazy(() => import('./components/Passreset'))
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const Passrequestsuccess = lazy(() => import('./components/Passrequestsuccess'))
const Passerror = lazy(() => import('./components/Passerror'))
const Success = lazy(() => import('./components/Success'))
const PasswordReset = lazy(() => import('./components/PasswordReset'))
const Prod = lazy(() => import('./components/Prod'))
const Checkout = lazy(() => import('./components/Checkout'))
const Category = lazy(() => import('./components/Category'))
const PriceFile = lazy(() => import('./components/Pricefile'))


const App= () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initContent(1))
  }, [dispatch])

  const size = useWindowSize()

  const IndexFileContainer = () => (
    <Route exact path="/indexpricefile" component={PriceFile} />
  )

  const DefaultContainer = () => (
    <>
    <CssBaseline />
    <div className="container">
    {size.width > 900 ? <Header /> : <HeaderSmall />}
    {size.width > 900 && <Navbar />}
    
    <Switch>

    
    <Route path="/prod/:catid/:prodid" component={Prod} />
    <Route path="/kategori/:catid" component={Category} />
    <Route path="/success" component={Success} />
    <Route path="/login" component={Login} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/register" component={Register} />
    <Route path="/passreset" component={Passreset} />
    <Route path="/passrequestsuccess" component={Passrequestsuccess} />
    <Route path="/passerror" component={Passerror} />
    <Route path="/bestallningar" component={Orders} />
    <Route path="/resetpassword/:uidb64/:token" component={PasswordReset} />
    <Route exact path="/" component={Home} />
    
    </Switch>
    
   

     <StickyFooter />
     </div>
     </>
  )

  return (
    <>
    <Router history={history}>
    <Suspense fallback={<>Loading...</>}>
      <Switch>
      <Route exact path="/indexpricefile" component={IndexFileContainer}/>
      <Route component={DefaultContainer}/>
      </Switch>
      </Suspense>
    </Router>
    </>
  )
}

export default App