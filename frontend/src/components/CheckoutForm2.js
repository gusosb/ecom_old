import { useDispatch, useSelector } from "react-redux"
import { checkoutSession } from '../reducers/sessionReducer'

import './Styles.css'
import Button from '@mui/material/Button'


const CheckoutForm2 = () => {
    
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
        <Button type="submit" variant="outlined" onClick={handleSubmit}>Gå till Checkout</Button>
        </>
    )
}

export default CheckoutForm2