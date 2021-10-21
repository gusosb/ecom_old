import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../reducers/cartReducer'

import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import './Styles.css'

const Prod = () => {

    const dispatch = useDispatch()

    const categories = useSelector(state => state.content.categories)

    const { catid, prodid } = useParams()
    const cat = categories && categories.find(e => e.id === parseInt(catid))
    const product = cat ? cat.products.find(e => e.id === parseInt(prodid)) : ''
  

    const [ image, setImage ] = useState(product.prodImg)
    const [ variant, setVariant ] = useState(product.prodVal1)
    const [ tabvalue, setTabvalue ] = useState('1')


    useEffect(() => {
      setImage(product.prodImg)
    }, [product])

    const addtoCart = (e) => {
    const item = {
        category: e.category,
        id: e.id,
        prodName: e.prodName,
        prodPrice: e.prodPrice,
        prodImg: e.prodImg,
        prodDescription: e.prodDescription,
        prodVal: variant,
        quantity: 1,
        }
      dispatch(addItem(item))
    }



    return (
    <>
      <Grid container className="tabb" sx={{ mx: "auto" }}>


      <Grid item xs={12}>
      <Box sx={{ display: 'flex', flexDirection: 'row'}}       
      display="flex"
      justifyContent="center"
      flexDirection="column">


      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box>
      
      <img alt='' className={image===product.prodImg ? 'img2 pad1' : 'img pad1'} src={product.prodImg} onMouseEnter={() => setImage(product.prodImg)} />


      {product.twoImg && 
      <div className="pad">
        <img alt='' className={image===product.twoImg ? 'img2' : 'img'} src={product.twoImg} onMouseEnter={() => setImage(product.twoImg)} />
        </div>}
      {product.threeImg &&
      <div className="pad">
        <img alt='' className={image===product.threeImg ? 'img2' : 'img'} src={product.threeImg} onMouseEnter={() => setImage(product.threeImg)} />
        </div>}
      </Box>
      
      <img alt='' src={image} className="my-class1" />
      
      </Box>



      <Grid className="tab1">
      <Typography variant="h3" gutterBottom component="div">
      {product.prodName}
      </Typography>
      <Typography variant="h5" gutterBottom component="div">
      {product.prodDescription}
      </Typography>

      <Typography variant="h6" gutterBottom component="div">
      {product.prodPrice},00 kr. <Typography display="inline" variant="caption">inkl moms</Typography>
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

      {product.prodQty ?
      <Box>
      <Button variant="contained" color="secondary" disableElevation onClick={() => addtoCart(product)} endIcon={<AddShoppingCartIcon />} >
      Lägg till
      </Button>
      </Box>
      : 'Saknas kvantitet!'
      }
        
      {product.tabNamn1 &&
      <Box sx={{ typography: 'body1', width: 450 }}>
      <TabContext value={tabvalue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList indicatorColor="secondary" textColor="primary" centered onChange={(e, newValue) => setTabvalue(newValue)} aria-label="lab API tabs example">
      <Tab label={product.tabNamn1} value='1' />
      {product.tabNamn2 && <Tab label={product.tabNamn2} value='2' />}
      {product.tabNamn3 && <Tab label={product.tabNamn3} value='3' />}
      </TabList>
      </Box>

      <TabPanel value="1">{product.tabDesc1}</TabPanel>
      {product.tabNamn2 && <TabPanel value="2">{product.tabDesc2}</TabPanel>}
      {product.tabNamn3 && <TabPanel value="3">{product.tabDesc3}</TabPanel>}
      </TabContext>
      </Box>
      }

      </Grid>


      </Box>
      </Grid>

      </Grid>
      </>
    )
}

export default Prod
