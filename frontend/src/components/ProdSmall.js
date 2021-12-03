import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../reducers/cartReducer'
import SwipeableViews from 'react-swipeable-views'
import { heartItem, unheartItem } from '../reducers/heartReducer'
import windowSize from '../hooks/hooks'

import { IconButton, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import Paper from '@mui/material/Paper'
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

const ProdSmall = () => {

    const dispatch = useDispatch()

    const categories = useSelector(state => state.content.categories)
    const size = windowSize()

    const { catid, prodid } = useParams()
    const cat = categories && categories.find(e => e.id === parseInt(catid))
    const product = cat ? cat.products.find(e => e.id === parseInt(prodid)) : ''
    const related = product.related ? product.related.slice(0, 9) : ''
  

    const [ image, setImage ] = useState(product.prodImgSmall)
    const [ variant, setVariant ] = useState(product.prodVal1)
    const [ tabvalue, setTabvalue ] = useState('1')
    const [ sticky, setSticky ] = useState(true)
    const ref = useRef(undefined)
    

    const ofstop = ref.current && ref.current.getBoundingClientRect().top
   

    useEffect(() => {
      setImage(product.prodImgSmall)
    }, [product])



    const handleScroll = () => {
      console.log(ofstop)
      const y = size.height + window.pageYOffset
      console.log(y)
      if (y < ofstop) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
  
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [])



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
      <Typography sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} variant="h5" gutterBottom component="div">
      {product.prodDescription}
      </Typography>
      }

      <Typography ref={ref} variant="h6" gutterBottom component="div">
      {product.prodPrice},00 kr. <Typography display="inline" variant="caption">inkl moms</Typography>
      </Typography>


      <Paper className={sticky ? 'stickyy' : undefined} elevation={3}>
        hej
      </Paper>


      
      


      </Grid>
      </Grid>
      </>
    )
}

export default ProdSmall