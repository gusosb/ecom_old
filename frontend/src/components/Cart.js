import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"


import './Styles.css'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { removeItem, addItem } from '../reducers/cartReducer'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const session = useSelector(state => state.session)
  
    const [ open, setOpen ] = useState(false)
  
    const total = cart.map(e => e.quantity).reduce(
      ( previousValue, currentValue ) => previousValue + currentValue,
      0
    )
    const totalsum = cart.map(e => e.quantity * e.prodPrice).reduce(
      ( previousValue, currentValue ) => previousValue + currentValue,
      0
    )
    
  
    const handleRemove = (e) => {
      const item = {
        id: e.id,
        prodVal: e.prodVal,
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
  
    useEffect(() => {
      if (!window.location.href.includes('checkout')) {
        setOpen(true)
      }
    }, [cart])
    

    const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      background: '#f44336',
      right: -4,
      top: 15,
      border: `0px solid ${theme.palette.background.paper}`,
      padding: '1 3px',
    },
    }))
  
  
  
      const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return
        }
        setOpen(false)
      }
  
      if(session.url) {
        window.location.assign(session.url)
      }

    return (
        <>
        <IconButton aria-label="showcart" size="large" onClick={() => setOpen(true)}>
        <StyledBadge badgeContent={total} color="info" >
        <ShoppingCartIcon color="white" />
        </StyledBadge>
        </IconButton>
       {cart[0] &&
        <Drawer
        anchor='right'
        open={open}
        onClose={toggleDrawer()}
        >

          <Box>
          <IconButton aria-label="close" sx={{ ml: 1, mt: 1 }} onClick={() => setOpen(false)} >
          <CloseIcon />
          </IconButton>
          </Box>
           
          <Box display="flex"
          justifyContent="center"
          sx={{ mb: 1 }}>
           Din kundvagn
          </Box>



          {cart && cart.map(product =>
          
          
          <Grid key={product.prodVal} container className="ptop" sx={{ flexDirection: 'row', overflow: 'hidden'}}>
          <Grid item xs={5}>

          
          <CardActionArea
          sx={{ ml: 2, mr: 5 }}
          component={Link}
          to={`/prod/${product.category}/${product.id}`}
          onClick={() => setOpen(false)}
          >
          <CardMedia
          component="img"
          height="120"
          image={product.prodImg}
          alt="no image"
          className="cartimg"
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

          {product.prodVal
          ? <Box
          display="flex"
          justifyContent="center"
         >
        <Typography variant="caption" display="block" gutterBottom>
        ({product.prodVal})
        </Typography>
          </Box>
          : <br></br>
          }


          <Box
          display="flex"
          justifyContent="center"
          >
          
          {product.prodPrice},00 kr.
          </Box>

          <Box sx={{ justifyContent: 'center' }}
          style={{textAlign: "center"}}
          >
          <IconButton sx={{ mr: 1 }} aria-label="remove" size="large" onClick={() => handleRemove(product)} ><RemoveIcon /></IconButton>
        
         {product.quantity} st
          <IconButton sx={{ ml: 1 }} aria-label="add" size="large" onClick={() => addtoCart(product)} ><AddIcon /></IconButton>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex' }}
          >
          {product.quantity !== 1 && product.prodPrice * product.quantity + ',00 kr.'}
          </Box>
          
          
          </Grid>
          </Grid>
          )}

      
        

        <Box
        display="flex"
        justifyContent="center"
        className="ptop"
        style={{ fontWeight: 600 }}
        sx={{ mt: 3 }}
        >
        Totalt (inkl. moms): {totalsum + ',00 kr'}
        </Box>

        

      
        {cart[0] &&
        <Box
        display="flex"
        justifyContent="center"
        className="ptop"
        >

        <Button onClick={() => setOpen(false)} component={Link} to="/checkout" type="submit" variant="outlined">Gå till Kassan</Button>
        
        </Box>
        }
        

        </Drawer>
        }
        </>
    )
}

export default Cart