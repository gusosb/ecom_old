import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../reducers/cartReducer'
import SwipeableViews from 'react-swipeable-views'
import { heartItem, unheartItem } from '../reducers/heartReducer'

import { IconButton, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import Paper from '@mui/material/Paper'
import CircleIcon from '@mui/icons-material/Circle'
import Card from '@mui/material/Card'
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

const ProdSmall = () => {

    const dispatch = useDispatch()

    const categories = useSelector(state => state.content.categories)

    const { catid, prodid } = useParams()
    const cat = categories && categories.find(e => e.id === parseInt(catid))
    const product = cat ? cat.products.find(e => e.id === parseInt(prodid)) : ''
    const related = product.related ? product.related.slice(0, 9) : ''
  

    const [ image, setImage ] = useState(product.prodImgSmall)
    const [ variant, setVariant ] = useState(product.prodVal1)
    const [ tabvalue, setTabvalue ] = useState('1')
    const [ sticky, setSticky ] = useState(true)
    const ref = useRef(undefined)
    const ref2 = useRef(undefined)


    

   

    useEffect(() => {
      setImage(product.prodImgSmall)
 
      //setVariant(product.prodVal1)
    }, [product])



    const handleScroll = () => {
      
      const y = window.innerHeight + window.pageYOffset
      
      const ofstop = ref.current && ref.current.offsetTop + ref.current.offsetHeight + ref2.current.offsetHeight
      if (y < ofstop) {
        setSticky(true)
      } else if (setSticky && (y > ofstop)) {
        setSticky(false)
      }
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
  
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [])

  const handleSelect = e => {
    setVariant(e.target.value)
  }



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
      <Card key={'2' + product.id} sx={{ maxWidth: 345, m: '4px', mb: 0, border: 0 }} elevation={0}>
      <CardActionArea
      component={Link}
      to={`/prod/${product.category}/${product.id}`}
      >
      <CardMedia
      sx={{ maxHeight: 300 }}
      component="img"
      image={product.prodImgList}
      alt=""
      />
      </CardActionArea>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', p: '15px', pt: '6px', "&:last-child": { paddingBottom: 0} }}>
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
        <div key={products[0].id} style={Object.assign({}, styles.slide)}>
        <Grid key={'l' + products[0].id} container> 
        {products.map(product =>
        <Grid item key={'p' + product.id} xs={6}>
        <ProductView key={'t' + product.id} product={product} />
        </Grid>
        )}
        </Grid>
        </div>
      )
    }


    const Views = ({ products }) => {
      const [ index, setIndex ] = useState(0)
      const handleChangeIndex = index => {
        setIndex(index)
      }

      //divide array into chunks by 2
      let prod = products.reduce((all,one,i) => {
        const ch = Math.floor(i/2); 
        all[ch] = [].concat((all[ch]||[]),one); 
        return all
     }, [])

      const views = []

      prod.flatMap(e => 
        views.push(<ViewComp key={'f' + e[0].id} products={e} />,)
      )
      

      return (
        <>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography variant="h6" gutterBottom component="div">
        Andra köpte även
        </Typography>
        </Grid>

        <SwipeableViews enableMouseEvents index={index} onChangeIndex={handleChangeIndex} disableLazyLoading >
        {views}
        </SwipeableViews>
        
        {prod[1] &&
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {prod.flatMap((e, i) =>
          <IconButton key={i} size="small" aria-label="circle" onClick={() => setIndex(i)}>
          {index === i
          ? <CircleIcon sx={{ height: 15 }} />
          : <CircleOutlinedIcon sx={{ height: 15 }} />}
          </IconButton>
          )}
        </Grid>
        }
        </>
      )
    }




    return (
    <>
      <Grid container sx={{ mt: 2 }}>

      <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
      
      <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center' }}>
      {product.prodName}
      </Typography>
 


    
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <img alt='' src={image} />
      </Box>

      {product.twoImgSmall &&
      <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pr: 7, pl: 7 }} spacing={2}>
      
      <Grid item xs>
      <img alt='' className={image===product.prodImgSmall ? 'outline' : undefined} src={product.prodImgSmall} onClick={() => setImage(product.prodImgSmall)} />
      
      </Grid>
      <Grid item xs>
      <img alt='' className={image===product.twoImgSmall ? 'outline' : undefined} src={product.twoImgSmall} onClick={() => setImage(product.twoImgSmall)} />
      </Grid>
      {product.threeImgSmall &&
      <Grid item xs>
      <img alt='' className={image===product.threeImgSmall ? 'outline' : undefined} src={product.threeImgSmall} onClick={() => setImage(product.threeImgSmall)} />
      </Grid>}
      </Grid>}


      
      {product.prodDescription &&
      <Typography ref={ref} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} variant="h5" gutterBottom component="div">
      {product.prodDescription}
      </Typography>
      }




      <Paper ref={ref2} sx={{ backgroundColor: '#fff', boxShadow: sticky ? '0px -2px 4px -4px rgba(0,0,0,0.7)' : 'none' }} className={sticky ? 'stickyy' : undefined} >
      
      <Grid container sx={{ pt: 2, pr: 2, pl: 2 }}>
        
        <Grid item xs='auto' sx={{ pl: 1 }}>
        {product.prodName}
        </Grid>
        <Grid item xs>

        </Grid>
        <Grid item xs='auto' sx={{ pr: 1 }}>
        {product.prodPrice},00 kr. <Typography display="inline" variant="caption">inkl moms</Typography>
        </Grid>
        

      <Grid container sx={{ pb: 2, pt: 2 }} spacing={2}>
          
      
      <Grid item xs>
      {product.prodVal1 &&
      <FormControl fullWidth>
      <InputLabel id="tabs1">{product.prodValnamn}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={variant}
        defaultValue={product.prodVal1}
        label="variant"
        onChange={handleSelect}>
        <MenuItem value={product.prodVal1}>{product.prodVal1}</MenuItem>
        {product.prodVal2 && <MenuItem value={product.prodVal2}>{product.prodVal2}</MenuItem>}
        {product.prodVal3 && <MenuItem value={product.prodVal3}>{product.prodVal3}</MenuItem>}
      </Select>
      </FormControl>
      }
      </Grid>

      
      {product.prodQty ?
      <Grid item xs >
      
      <Button sx={{ height: '100%' }} fullWidth variant="contained" color="secondary" disableElevation onClick={() => addtoCart(product)} endIcon={<AddShoppingCartIcon />} >
      Lägg till
      </Button>
      
      </Grid>
      : 'Produkten är slut!'
      }
      </Grid>
      </Grid>
      </Paper>

      
      {product.tabNamn1 &&
      
     
      <Box sx={{ typography: 'body1', mt: 4, pr: 1, pl: 1 }}>
      <TabContext value={tabvalue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
         
      <TabList variant="fullWidth" indicatorColor="secondary" textColor="primary" centered onChange={(e, newValue) => setTabvalue(newValue)} aria-label="tabs">
      <Tab label={product.tabNamn1} value='1' />
      {product.tabNamn2 && <Tab label={product.tabNamn2} value='2' />}
      {product.tabNamn3 && <Tab label={product.tabNamn3} value='3' />}
      </TabList>
      
      
      </Box>

      <TabPanel sx={{ p: 2 }}  value="1">{product.tabDesc1}</TabPanel>
      {product.tabNamn2 && <TabPanel sx={{ p: 2 }} value="2">{product.tabDesc2}</TabPanel>}
      {product.tabNamn3 && <TabPanel sx={{ p: 2 }} value="3">{product.tabDesc3}</TabPanel>}
      </TabContext>
      </Box>
      
     
      }

      {related !== '' && 
      

      <Views products={related} />
      
    
      }

      </Grid>
      </Grid>
      </>
    )
}

export default ProdSmall