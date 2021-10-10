import { useDispatch, useSelector } from "react-redux"
import { initOrders } from "../reducers/orderReducer"
import { useEffect } from "react"

const Orders = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)


    useEffect(() => {
        const id = { id: content.id }
        dispatch(initOrders(id))
    }, [content])

    return (
        <div>
            
        </div>
    )
}

export default Orders