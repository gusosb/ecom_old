import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Styles.css'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
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



const Navbar = () => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)


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
      prodName: e.prodName,
      prodPrice: e.prodPrice,
      prodImg: e.prodImg,
      quantity: 1,
    }
    dispatch(addItem(item))
  }
  

  const [ open, setOpen ] = useState(false)


  const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        minwidth: 10,
        width: 10,
        height: 19,
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
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
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
         >
          Din kundvagn
          </Box>


          {cart && cart.map(e =>
          <Grid key={e.id} container className="ptop" sx={{ display: 'flex', flexDirection: 'row', overflow: 'hidden'}}>
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
          <Box
          display="flex"
          justifyContent="center"
         >
          
          {e.prodPrice},00 kr.
          </Box>


          <Box
          display="flex"
          justifyContent="center"
         >
          <IconButton aria-label="remove" size="large" onClick={() => handleRemove(e.id)}><RemoveIcon /></IconButton>
          <div className="patd">{e.quantity}</div>
          <IconButton aria-label="add" size="large" onClick={() => addtoCart(e)}><AddIcon /></IconButton>
          </Box>

          <Box
          display="flex"
          justifyContent="center"
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
