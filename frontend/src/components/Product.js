import { useLocation } from "react-router-dom"
import { useState } from 'react'

import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import './Styles.css'


const Product = () => {

    const location = useLocation()

    const product = location.state.product

    const [ image, setImage ] = useState(product.prodImg)
    const [ variant, setVariant ] = useState('')


    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }))

    
    return (
        <>
        <Grid container className="tabb">
        <Grid item xs={2}>

        </Grid>

        <Grid item xs={5} sx={{ maxWidth: '85%' }} className="tableft">
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        
        <Box>
        <img className="img" src={product.prodImg} onMouseEnter={() => setImage(product.prodImg)} />

        {product.twoImg && <img className="img pad" src={product.twoImg} onMouseEnter={() => setImage(product.twoImg)} />}
        {product.threeImg && <img className="img pad" src={product.threeImg} onMouseEnter={() => setImage(product.threeImg)} />}
        </Box>
        <img src={image} alt="fireSpot" className="my-class1" />
        </Box>
        </Grid>

        <Grid item xs={3}>
        <Box>
        <Typography variant="h3" gutterBottom component="div">
        {product.prodName}
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
        {product.prodMark}
         </Typography>

         <Typography variant="h6" gutterBottom component="div">
        {product.prodPrice},00 kr <Typography display="inline" variant="caption">inkl moms</Typography>
          </Typography>

        {product.prodVal1 &&
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{product.prodValnamn}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={variant}
          label=""
          onChange={(e) => setVariant(e.target.value)}
        >
 
          <MenuItem value={product.prodVal1}>{product.prodVal1}</MenuItem>
          {product.prodVal2 && <MenuItem value={product.prodVal2}>{product.prodVal2}</MenuItem>}
          {product.prodVal3 && <MenuItem value={product.prodVal3}>{product.prodVal3}</MenuItem>}
        </Select>
      </FormControl>
      }
        </Box>

        <Box>
        Köp 
        <IconButton color="primary" aria-label="add to shopping cart" size="large">
        
       <AddShoppingCartIcon />
        
       </IconButton>
        </Box>
        </Grid>



        <Grid item xs={2}>
        </Grid>

        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>

        </Grid>
        </>
    )
}

export default Product