import { useDispatch, useSelector } from "react-redux"
import { checkoutSession } from '../reducers/sessionReducer'
import { Link } from "react-router-dom"
import './Styles.css'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'


const CheckoutForm3 = () => {
    
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)
    const content = useSelector(state => state.content)
    const cart = useSelector(state => state.cart)

    if(session.url) {
        window.location.assign(session.url)
    }



    const handleSubmit = (e) => {
        const readyCart = {
            siteid: content.id,
            cart,
        }
        dispatch(checkoutSession(readyCart))
    }

    return (
        <>
        <Grid container>

        <Link to="/login">Logga in eller</Link>

       
        <Button type="submit" variant="outlined" onClick={handleSubmit}>Checkout som Gäst</Button>

        Inget konto? <Link to="/register">Skapa ett konto här.</Link>
        </Grid>
        </>
    )
}

export default CheckoutForm3
