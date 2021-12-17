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

        <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        justifyContent="center"
        flexDirection="column">
          
        {products.map((product, i) => 
        <Grow key={product.id} in={true} style={{ transformOrigin: '0 0 0' }}
        {...(i > 0 ? { timeout: (400 + (i*50)) } : {})}>

        <Grid item key={product.id}>
        <Card key={product.id} sx={{  m: '5px', mb: '10px', minWidth: 140, maxWidth: size.width < 378 ? 146 : size.width < 516 ? 160 : undefined }} variant="outlined">
        <CardActionArea
        component={Link}
        to={`/prod/${product.category}/${product.id}`}>
        <CardMedia
        component="img"
        height="140"
        image={product.prodImgList}
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
        
        </Box>
        </Grid>
        </Grid>
        
    )
}

export default ProductListSmall