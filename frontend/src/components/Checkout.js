import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { unheartItem } from '../reducers/heartReducer'
import { checkoutSession } from '../reducers/sessionReducer'
import { removeItem, addItem } from '../reducers/cartReducer'


import './Styles.css'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RemoveIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Popover from '@mui/material/Popover'
import Paper from '@mui/material/Paper'
import { initContent } from '../reducers/contentReducer'

const Checkout = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const session = useSelector(state => state.session)
    const content = useSelector(state => state.content)
    const auth = useSelector(state => state.auth)




  
    if (!content) {
      dispatch(initContent())
    }
 
    
    const product = content ? content.categories[0].products[0] : ''

    const handleRemove = (e) => {
      const item = {
        id: e.id,
        prodVal: e.prodVal,
      }
      dispatch(removeItem(item))
    }

    const handleSubmit = (e) => {
      const readyCart = {
        siteid: content.id,
        cart,
      }
      dispatch(checkoutSession(readyCart))
    }



    if(session.url) {
        window.location.assign(session.url)
    }


    const LoggedIn = () => {
      return (
        <>
        <Box
        display="flex"
        justifyContent="center"
        >
        <Button type="submit" variant="outlined" onClick={handleSubmit}>Gå till betalning</Button>
        </Box>
        </>
      )
    }

    const GuestCheck = () => {
      return (
        <>
        <Box
        display="flex"
        justifyContent="center"
        >
        <Link to="/login">Logga in eller</Link>
        </Box>
        <br />
        <Box
        display="flex"
        justifyContent="center"
        >
        <Button type="submit" variant="outlined" onClick={handleSubmit}>betala som gäst</Button>
        </Box>
        </>
      )
    }

    return (
      <>
      <Grid container
      sx={{
        
        '& > :not(style)': {
        m: 2,
        
        },
        }}>
      <Grid item sx={{ flex: 1 }}>
        
      </Grid>

      <Grid item sx={{ width: 600 }}>

      
      <Paper variant="outlined">
      <Grid container sx={{ p: 3 }}>

      {cart && cart.map(product =>
      <>
      <Grid item xs={5}>
      
      <CardActionArea
      
      component={Link}
      to={`/prod/${product.category}/${product.id}`}
      >
      <CardMedia
      component="img"
      height="120"
      image={product.prodImg}
      alt="no image"
      variant="outlined"
      />
      </CardActionArea>
      
      </Grid>
      <Grid item xs={7}>
      <Box
      display="flex"
      justifyContent="center"
      >
      {product.prodName}
      
      
      </Box>
      <Box
      display="flex"
      justifyContent="center"
      >
      <Typography variant="caption" display="block" gutterBottom>
      ({product.prodVal})
      </Typography>
      </Box>
      </Grid>
      </>
      )}
      
      </Grid>
      </Paper>
      
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        
      </Grid>
      </Grid>
      

      
          
        
    
  
      
      


      
      <Grid container
      sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > :not(style)': {
      p: 2,
      width: 600,
      },
      }}>
      <Paper variant="outlined" sx={{ justifyContent: 'center', display: 'flex' }}>
      <Grid container sx={{ m: 2 }}>


      
      <Grid item xs={12}>
      <Typography variant="h5" display="block" gutterBottom>
      Leveransinformation
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', '& > :not(style)': { m: 1 }}}>
      <TextField fullWidth label='Namn' />
      <TextField fullWidth label='Efternamn' />
      </Box>

      <Box sx={{ m: 1 }}>
      <TextField fullWidth label='Adress' />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', '& > :not(style)': { m: 1 }}}>
      <TextField fullWidth label='Postnummer' />
      <TextField fullWidth label='Ort' />
      </Box>


      {auth.isLoggedIn
      ? <LoggedIn />
      : <GuestCheck />
      }
      
      </Grid>
      </Grid>
      </Paper>
      </Grid>
      





      

      </>
    )
}

export default Checkout