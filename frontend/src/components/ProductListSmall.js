import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { IconButton, CardActionArea } from '@mui/material'
import Grow from '@mui/material/Grow'
import useWindowSize from '../hooks/hooks'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from "react-redux"
import { heartItem, unheartItem } from '../reducers/heartReducer'

import { Link } from "react-router-dom"


const ProductListSmall = ({ category }) => {

    const products = category.products

    const size = useWindowSize()

    const dispatch = useDispatch()
    const heart = useSelector(state => state.heart)

    const addtoHeart = (product) => {
        dispatch(heartItem(product))
    }
    const removeHeart = (id) => {
        dispatch(unheartItem(id))
    }

    return (
        <Grid container className="tabb">

        <Grid item xs={12} sx={{ ml: '12px', mr: '12px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        justifyContent="center"
        flexDirection="column">
          
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {products.map((product, i) => 
        <Grow key={product.id} in={true} style={{ transformOrigin: '0 0 0' }}
        {...(i > 0 ? { timeout: (400 + (i*50)) } : {})}>

        <Grid item xs={size.width < 469 ? 6 : size.width < 900 ? 4 : size.width > 1200 ? 2 : 3} key={product.id}>
        <Card key={product.id} sx={{  minWidth: 146 }} variant="outlined">
        <CardActionArea
        component={Link}
        to={`/prod/${product.category}/${product.id}`}>
        <CardMedia
        component="img"
        height="140"
        image={product.prodImg435}
        alt="" />
        </CardActionArea>
        
            <CardContent sx={{ display: 'flex', flexDirection: 'row', p: 1, "&:last-child": { paddingBottom: 1} }}>
            <Grid item xs>
            <Typography component={'span'} variant="body2" color="text.secondary">
            <Box sx={{ display: 'flex', flexDirection: 'row'}} justifyContent="center"
            flexDirection="column">
            {product.prodName}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row'}} justifyContent="center"
            flexDirection="column">
            {product.prodDescription}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }} justifyContent="center"
            flexDirection="column">
            {product.prodPrice},00 kr
            </Box>
            </Typography>
            </Grid>

            
            <Grid item xs='auto'>
            

            {!heart.find(e => e.id === product.id)
            ? <IconButton onClick={() => addtoHeart(product)} ><FavoriteBorderIcon className="col3" /></IconButton>
            : <IconButton onClick={() => removeHeart(product.id)} ><FavoriteIcon className="col2" /></IconButton>
            }

           
            </Grid>

            

            </CardContent>
        
        </Card>
        
        </Grid>
        </Grow>
        )}
        </Grid>
        
        </Box>
        </Grid>
        </Grid>
        
    )
}

export default ProductListSmall