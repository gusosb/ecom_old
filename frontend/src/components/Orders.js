import { useDispatch, useSelector } from "react-redux"
import { initOrders } from "../reducers/orderReducer"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"

const Orders = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)



    useEffect(() => {
        if (isLoggedIn) {
            dispatch(initOrders())
        }
    }, [content])

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            
        </div>
    )
}

export default Orders