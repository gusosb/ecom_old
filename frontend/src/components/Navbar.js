import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"


import './Styles.css'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CheckoutForm2 from './CheckoutForm2'
import { removeItem, addItem } from '../reducers/cartReducer'
import Typography from '@mui/material/Typography'



const Navbar = () => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const categories = useSelector(state => state.content.categories)


  let total = cart.map(e => e.quantity).reduce(
    ( previousValue, currentValue ) => previousValue + currentValue,
    0
  )

  const totalsum = cart.map(e => e.quantity * e.prodPrice).reduce(
    ( previousValue, currentValue ) => previousValue + currentValue,
    0
  )
  

  const handleRemove = (e) => {
    dispatch(removeItem(e))
  }

  const addtoCart = (e) => {
    const item = {
      id: e.id,
      quantity: 1,
    }
    dispatch(addItem(item))
  }
  

  const [ open, setOpen ] = useState(false)


  const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        background: '#FF8A80',
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

    

    return (
        <>
        <Grid container style={{ color: 'white', backgroundColor: '#78909c' }}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>

        {categories && categories.map(e =>
        <Button
        component={Link}
        to={{
            pathname: "/kategori",
            search: "?cat={}",
            hash: "#the-hash",
            state: { e },
          }}
        variant="text" size="large" style={{ color: 'white', height: 50 }}>{e.catName}</Button>
          )}
        
        
        
        </Grid>
        <Grid item xs={4}>
            
        <IconButton aria-label="showcart" size="large" onClick={() => setOpen(true)}>
        <StyledBadge badgeContent={total} color="info" >
        <ShoppingCartIcon color="action" />
        </StyledBadge>
        </IconButton>


       
           
             
        {cart[0] &&
        <Drawer
          anchor='right'
          open={open}
          onClose={toggleDrawer()}
        >

          
        <Box
          display="flex"
          justifyContent="center"
          sx={{ mt: 2, mb: 1 }}
         >
          Din kundvagn
          </Box>


          {cart && cart.map(e =>
          <Grid key={e.id} container className="ptop" sx={{ flexDirection: 'row', overflow: 'hidden'}}>
          <Grid item xs={5}>
          <img alt='' src={e.prodImg} className="cartimg" />
          </Grid>
          <Grid item xs={7}>
          <Box
          display="flex"
          justifyContent="center"
         >
          {e.prodName}
         
          </Box>

          {e.prodVal
          ? <Box
          display="flex"
          justifyContent="center"
         >
        <Typography variant="caption" display="block" gutterBottom>
        ({e.prodVal})
       </Typography>
          </Box>
          : <br></br>
          }


          <Box
          display="flex"
          justifyContent="center"
         >
          
          {e.prodPrice},00 kr.
          </Box>

          <Box sx={{ justifyContent: 'center' }}
          style={{textAlign: "center"}}
          >
          <IconButton sx={{ mr: 1 }} aria-label="remove" size="large" onClick={() => handleRemove(e.id)}><RemoveIcon /></IconButton>
        
         {e.quantity} st
          <IconButton sx={{ ml: 1 }} aria-label="add" size="large" onClick={() => addtoCart(e)}><AddIcon /></IconButton>
          </Box>

          <Box sx={{ justifyContent: 'center', display: 'flex' }}
          >
          {e.quantity !== 1 && e.prodPrice * e.quantity + ',00 kr.'}
          </Box>
          
          
          </Grid>
          </Grid>
          )}

      
        

        <Box
          display="flex"
          justifyContent="center"
          className="ptop"
          style={{ fontWeight: 600 }}
         >
          Totalt (inkl. moms): {totalsum + ',00 kr'}
        </Box>

        

      
        {cart[0] &&
        <Box
        display="flex"
        justifyContent="center"
        className="ptop"
        >
          <CheckoutForm2 />
        </Box>
        }
        

        </Drawer>
        }

        </Grid>
        </Grid>
        </>
    )
}

export default Navbar
