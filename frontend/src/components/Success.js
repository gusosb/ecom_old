import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../reducers/sessionReducer'
import { Link } from "react-router-dom"

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import ListItem from '@mui/material/ListItem'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

const Success = () => {
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)
    const content = useSelector(state => state.content)

    const session_id = {
        siteid: content.id,
        sessionid: window.location.href.split('=')[1],
    }

    if (session.length === 0 && content.id) {
        dispatch(getSession(session_id))
    }

    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', mt: 6, mb: 4, p: 2 }} 
            
            justifyContent="center"
            >
            <Card sx={{ minWidth: 275 }} variant="outlined">
            <CardContent>
            <Typography variant="h5" component="div" display="flex"
            justifyContent="center">
            Beställning mottagen
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" display="flex"
            justifyContent="center">
            Tack för din beställning
            
            </Typography>
            <Typography variant="h6" display="flex"
            justifyContent="center"
            sx={{ mb: 5 }}>
            Order # {session.data && session.data[0].order.id}
            
            </Typography>
            

            <Box
            display="flex"
            justifyContent="center"
            sx={{ mb: 3 }}>
            <Typography sx={{ maxWidth: 300 }}>
            En orderbekräftelse har skickats
            till din epostadress {session.data && session.data[0].order.customeremail}
            
            </Typography>
            </Box>
            
            

            

            <Grid container sx={{ maxWidth: 350 }}>
            
            {session.data && session.data[0].order.orderitem.map((e, i, {length}) =>
            <>
            
            <Grid key={'a' + e.id} sx={{ display: 'flex', flexDirection: 'row', mt: 2 }} >


            <Grid item xs={5}>
            <CardActionArea
      
            component={Link}
            to={`/prod/${e.prodcat}/${e.prodid}`}
            >
            <CardMedia
            component="img"
            sx={{ maxHeight: 400 }}
            image={e.prodImg}
            alt="no image"
            variant="outlined"
            />
            </CardActionArea>
            </Grid>
            <Grid item xs={7} sx={{ pl: 5 }}>
            <Typography variant="h6">
            {e.prodName}
            </Typography>
            <Typography variant="h7">
            {e.prodValnamn}: {e.prodVal}
            </Typography>
            <Typography>
            {e.prodPrice},00 kr
            </Typography>
            
            
           
            <Typography variant='caption'>
            Antal: {e.prodQty} st
            <br />
            Artikelnummer: {e.artno}
            </Typography>

            
            </Grid>
            
            
           </Grid>
          
           {i + 1 !== length && <ListItem divider />}
           
           
           
            </>
            )}
            
            </Grid>
                

            
            </CardContent>

            </Card>
            </Grid>
        </>
    )
}

export default Success