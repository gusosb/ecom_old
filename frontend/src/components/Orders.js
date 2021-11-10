import { useDispatch, useSelector } from "react-redux"
import { initOrders } from "../reducers/orderReducer"
import { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"



import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Orders = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const orders = useSelector(state => state.orders)

    const siteorders = orders && orders.filter(e => e.site === content.id)



    useEffect(() => {
        if (isLoggedIn && !orders.length && content.id) {
            dispatch(initOrders())
        }
    }, [content, dispatch, isLoggedIn, orders.length])

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <>


        
        <Grid container
        sx={{
        justifyContent: 'center',
        display: 'flex',
        '& > :not(style)': {
        m: 2,
        },
        }}>
        <Grid sx={{ flexDirection: 'column' }}>
        {siteorders && siteorders.map(order =>
        
        <Paper variant="outlined" sx={{ p: 2, m: 5 }} >
        <Grid container sx={{ flexDirection: 'column' }}>

       
        <Typography display="block">
        Order # {order.id}
        </Typography>
        
       
        <Typography display="block">
        Status: {order.get_status_display}
        </Typography>
        

       
        
        
       
        {order.orderitem.map(product =>
        <Grid container key={'1' + product.id}>
            

        <Grid item xs={5}>

        <CardActionArea
        sx={{ mr: 2 }}
        component={Link}
        to={`/prod/${product.prodcat}/${product.prodid}`}
        >
        <CardMedia
        component="img"
        image={product.prodImgList}
        alt="no image"
        variant="outlined"
        />
        </CardActionArea>
        </Grid>

        <Grid item xs={7} sx={{ pl: 4 }}>
            <Typography variant="h6">
            {product.prodName}
            </Typography>
            <Typography variant="h7">
            {product.prodValnamn}: {product.prodVal}
            </Typography>
            <Typography>
            {product.prodPrice},00 kr
            </Typography>
            
            
           
            <Typography variant='caption'>
            Antal: {product.prodQty} st
            <br />
            Artikelnummer: {product.artno}
            </Typography>

            
            </Grid>

        </Grid>
        )}
       
        </Grid>
        </Paper>
        
        )}
        </Grid>
        </Grid>
        
      

            
        </>
    )
}

export default Orders