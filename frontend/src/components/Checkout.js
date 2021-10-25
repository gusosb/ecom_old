import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { unheartItem } from '../reducers/heartReducer'
import { checkoutSession } from '../reducers/sessionReducer'
import { removeItem, addItem } from '../reducers/cartReducer'


import './Styles.css'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
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

    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ adress, setAdress ] = useState('')
    const [ zipcode, setZipcode ] = useState('')
    const [ area, setArea ] = useState('')
    const [ phone, setPhone ] = useState('')




  
    if (!content) {
      dispatch(initContent())
    }


  const totalsum = cart.map(e => e.quantity * e.prodPrice).reduce(
    ( previousValue, currentValue ) => previousValue + currentValue,
    0
  )
 
    
    

    const handleRemove = (e) => {
      const item = {
        id: e.id,
        prodVal: e.prodVal,
        firstname,
        lastname,
        adress,
        zipcode,
        area,
      }
      dispatch(removeItem(item))
    }
    const addtoCart = (e) => {
      const item = {
        prodVal: e.prodVal,
        id: e.id,
        quantity: 1,
      }
      dispatch(addItem(item))
    }

    const handleSubmit = () => {
      const readyCart = {
        siteid: content.id,
        cart,
        firstname,
        lastname,
        adress,
        zipcode,
        area,
        phone,
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
        sx={{ mt: 5 }}
        >
        {!firstname || !lastname || !adress || !zipcode || !area
        ? <Button type="submit" variant="disabled">Gå till betalning</Button>
        : <Button type="submit" variant="outlined" onClick={handleSubmit}>Gå till betalning</Button>
        }
        
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
        sx={{ mt: 5 }}
        >
        <Link to="/login">Logga in eller</Link>
        </Box>
        <br />
        <Box
        display="flex"
        justifyContent="center"
        >
        {!firstname || !lastname || !adress || !zipcode || !area || !phone
        ? <Button type="submit" variant="disabled">betala som gäst</Button>
        : <Button type="submit" variant="outlined" onClick={handleSubmit}>betala som gäst</Button>
        }
        </Box>
        </>
      )
    }

    return (
      <>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Typography variant="h5" display="block" gutterBottom>
      Kassa
      </Typography>
      </Box>
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
      <Grid container sx={{ pb: 3, pr: 3, pl: 3 }}>

      {cart && cart.map(product =>
      <>
      <Grid container sx={{ pt: 3 }}>
      <Grid item xs={3}>
      
      <CardActionArea
      
      component={Link}
      to={`/prod/${product.category}/${product.id}`}
      >
      <CardMedia
      component="img"
      sx={{ maxHeight: 200 }}
      image={product.prodImg}
      alt="no image"
      variant="outlined"
      />
      </CardActionArea>
      
      </Grid>
      <Grid item xs={7}>
      <Box
      sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}
      >
      {product.prodName}


      
      
      </Box>
      <Box
      sx={{ ml: 2 }}
      >
      {product.prodPrice},00 kr.
      </Box>

      <Box
      sx={{ ml: 2 }}
      >
      <Typography display="block" gutterBottom>
      {product.prodDescription}
      </Typography>


      </Box>

      <Box
      sx={{ ml: 2 }}
      >
      <Typography display="block" gutterBottom>
      {product.prodValnamn}: {product.prodVal} 
      </Typography>


      </Box>


      <Box
      >
      <IconButton sx={{ mr: 1 }} aria-label="remove" size="large" onClick={() => handleRemove(product)} ><RemoveIcon /></IconButton>
    
      {product.quantity} st
      <IconButton sx={{ ml: 1 }} aria-label="add" size="large" onClick={() => addtoCart(product)} ><AddIcon /></IconButton>
      </Box>


      <Box
      sx={{ ml: 2 }}
      >
      

      <Typography display="block" gutterBottom>
      Totalsumma: {product.prodPrice * product.quantity + ',00 kr.'}
      </Typography>
      




      </Box>
      

      



      </Grid>
      </Grid>
      </>
      )}
      
      </Grid>
      </Paper>
      
      </Grid>




      <Grid item sx={{ flex: 1 }}>

      <Grid item sx={{ width: 200 }}>

      
      <Paper variant="outlined">
      <Grid container sx={{ p: 3 }}>

      
    
      <Grid item xs={5}>
      
      här1
      
      </Grid>
      <Grid item xs={7}>
      <Box
      display="flex"
      justifyContent="center"
      >
      här2
      
      
      </Box>
     
      </Grid>
      <Divider />

      

      <Grid item xs={5}>
      
      här
      
      </Grid>
      
      <Grid item xs={7}>
      <Divider />

      <Grid item sx={8}>
      
      </Grid>
      <Grid item sx={4}>
      {totalsum},00 kr
      </Grid>
      
  
      </Grid>
    
      
      
      </Grid>
      </Paper>
      
      </Grid>
        
      </Grid>
      </Grid>
      

      
          
        
    
  
      
      


      
      <Grid container
      sx={{
      mb: 5,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > :not(style)': {
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
      <TextField fullWidth label='Namn' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      <TextField fullWidth label='Efternamn' value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </Box>

      <Box sx={{ m: 1 }}>
      <TextField fullWidth label='Adress' value={adress} onChange={(e) => setAdress(e.target.value)} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', '& > :not(style)': { m: 1 }}}>
      <TextField fullWidth label='Postnummer' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      <TextField fullWidth label='Ort' value={area} onChange={(e) => setArea(e.target.value)} />
      </Box>

      <Box sx={{ m: 1 }}>
      <TextField fullWidth label='Mobilnummer' value={phone} onChange={(e) => setPhone(e.target.value)} />
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