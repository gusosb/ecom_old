import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../reducers/cartReducer'
import SwipeableViews from 'react-swipeable-views'
import { heartItem, unheartItem } from '../reducers/heartReducer'

import { IconButton, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import Card from '@mui/material/Card'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
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
    const related = product && product.related
  

    const [ image, setImage ] = useState(product.prodImg)
    const [ variant, setVariant ] = useState(product.prodVal1)
    const [ tabvalue, setTabvalue ] = useState('1')
    


    useEffect(() => {
      setImage(product.prodImg)
    }, [product])

    const removeHeart = (id) => {
      dispatch(unheartItem(id))
  }
  const addtoHeart = (product) => {
    dispatch(heartItem(product))
  }

    const addtoCart = (e) => {
    const item = {
        category: e.category,
        id: e.id,
        artno: e.artno,
        prodImgList: e.prodImgList,
        prodValnamn: e.prodValnamn,
        prodName: e.prodName,
        prodPrice: e.prodPrice,
        prodImg: e.prodImg,
        prodDescription: e.prodDescription,
        prodVal: variant,
        quantity: 1,
        }
      dispatch(addItem(item))
    }

    const styles = {
      slide: {
        padding: 15,
        minHeight: 100,
      },
      slide1: {
        background: '#FEA900',
      },
    }

    const ProductView = ({ product }) => {
      const heart = useSelector(state => state.heart)
      return (
      <Card key={'2' + product.id} sx={{ maxWidth: 345, m: 2, border: 0 }} elevation={0}>
      <CardActionArea
      component={Link}
      to={`/prod/${product.category}/${product.id}`}
      >
      <CardMedia
      sx={{ maxHeight: 300 }}
      component="img"
      image={product.prodImgList}
      alt="bild saknas"
      />
      </CardActionArea>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', p: 1, "&:last-child": { paddingBottom: 1} }}>
      <Grid item xs={10}>
      <Typography component={'span'} variant="body2" color="text.secondary">
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      {product.prodName}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      {product.prodPrice},00 kr
      </Box>
      </Typography>
      </Grid>
      <Grid item xs={2}>
      {!heart.find(e => e.id === product.id)
      ? <IconButton onClick={() => addtoHeart(product)} ><FavoriteBorderIcon className="col3" /></IconButton>
      : <IconButton onClick={() => removeHeart(product.id)} ><FavoriteIcon className="col2" /></IconButton>
      }   
      </Grid>
      </CardContent>        
      </Card>
      )
    }

    const ViewComp = ({ products }) => {
      return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
        <div key={products[0].id} style={Object.assign({}, styles.slide)}>
        <Grid container>
        {products.map(product =>
          <ProductView key={'t' + product.id} product={product} />
        )}
        </Grid>
        </div>
        </Grid>
      )
    }


    const Views = ({ products }) => {
      const [ index, setIndex ] = useState(0)
      const handleChangeIndex = index => {
        setIndex(index)
      }
      const handleNext = () => {
        if (index < (views.length - 1)) {
          setIndex(index + 1)
        }
      }
      const handleBack = () => {
        if (index > 0) {
          setIndex(index - 1)
        }
      }

      const views = [
      
      <ViewComp key={'a' + products.slice(0).id} products={products.slice(0, 3)} />,
      
      ]

      if (products.slice(2).length > 1) {
        views.push(<ViewComp key={'f' + products.slice(3).id} products={products.slice(3, 6)} />,)
      }

      if (products.slice(5).length > 1) {
        views.push(<ViewComp key={'g' + products.slice(6).id} products={products.slice(6, 9)} />,)
      }

      

      return (
        <>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography variant="h6" gutterBottom component="div">
        Andra köpte även
        </Typography>
        </Grid>

        {products.slice(2).length > 1 &&
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
        </Box>
        <Box>
        <IconButton aria-label="next" onClick={handleBack} >
       <ArrowBackIcon />
        </IconButton>
        </Box>  
        <Box sx={{ flex: 1 }}>
        </Box>
        </Grid>
        }

        <Grid sx={{ maxWidth: 900 }}>
        <SwipeableViews enableMouseEvents index={index} onChangeIndex={handleChangeIndex} disableLazyLoading >
        {views}
        </SwipeableViews>
        </Grid>

        {products.slice(2).length > 1 &&
        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
        </Box>
        <Box>
        <IconButton aria-label="next" onClick={handleNext} >
       <ArrowForwardIcon />
        </IconButton>
        </Box>
        <Box sx={{ flex: 1 }}>
        </Box>
        </Grid>
        }

        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
        {products.slice(2).length > 1 &&
        <>
        <IconButton size="small" aria-label="circle" onClick={() => setIndex(0)}>
        {index === 0
        ? <CircleIcon sx={{ height: 15 }} />
        : <CircleOutlinedIcon sx={{ height: 15 }} />}
        </IconButton>
        

        
        <IconButton size="small" aria-label="circle" onClick={() => setIndex(1)}>
        {index === 1
        ? <CircleIcon sx={{ height: 15 }} />
        : <CircleOutlinedIcon sx={{ height: 15 }} />}
        </IconButton>
        </> 
        }


        {products.slice(5).length > 1 &&
        <IconButton size="small" aria-label="circle" onClick={() => setIndex(2)}>
        {index === 2
        ? <CircleIcon sx={{ height: 15 }} />
        : <CircleOutlinedIcon sx={{ height: 15 }} />}
        </IconButton>
        }

        </Grid>

        </>
      )
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
      <FormControl variant="standard" sx={{ minWidth: 120, mt: 3 }}>
      <InputLabel id="demo-simple-select-standard-label">{product.prodValnamn}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={variant}
        defaultValue={variant}
        label=""
        onChange={(e) => setVariant(e.target.value)}>
        <MenuItem value={product.prodVal1}>{product.prodVal1}</MenuItem>
        {product.prodVal2 && <MenuItem value={product.prodVal2}>{product.prodVal2}</MenuItem>}
        {product.prodVal3 && <MenuItem value={product.prodVal3}>{product.prodVal3}</MenuItem>}
      </Select>
      </FormControl>
      }

      {product.prodQty ?
      <Box sx={{ mt: 3 }}>
      <Button variant="contained" color="secondary" disableElevation onClick={() => addtoCart(product)} endIcon={<AddShoppingCartIcon />} >
      Lägg till
      </Button>
      </Box>
      : 'Produkten är slut!'
      }
        
      {product.tabNamn1 &&
      <Box sx={{ typography: 'body1', width: 450, mt: 4 }}>
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

      <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

      {related[0] && <Views products={related.slice(0, 9)} />}
      
      </Grid>
      


      
      </Grid>
      </>
    )
}

export default Prod
