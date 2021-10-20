import { useDispatch, useSelector } from "react-redux"
import { initOrders } from "../reducers/orderReducer"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"


import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Orders = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const orders = useSelector(state => state.orders)



    useEffect(() => {
        if (isLoggedIn) {
            dispatch(initOrders())
        }
    }, [content, dispatch, isLoggedIn])

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <>


        <Box
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > :not(style)': {
        m: 1,
        width: 128,
        height: 128,
        },
        }}
        >
        
        <Paper variant="outlined" sx={{ justifyContent: 'center', display: 'flex' }} >
        123123
        </Paper>
        
        </Box>

            
        </>
    )
}

export default Orders