import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { IconButton, CardActionArea } from '@mui/material'
import Grow from '@mui/material/Grow'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from "react-redux"
import { heartItem, unheartItem } from '../reducers/heartReducer'

import { Link } from "react-router-dom"
import useWindowSize from '../hooks/hooks'


const ProductList = ({ category }) => {

    const products = category.products
    const dispatch = useDispatch()

    const heart = useSelector(state => state.heart)

    const addtoHeart = (product) => {
        dispatch(heartItem(product))
    }

    const removeHeart = (id) => {
        dispatch(unheartItem(id))
    }

    const size = useWindowSize()




    return (
        <Grid container className="tabb" sx={{ pr: 20, pl: 20 }}>

        <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
            
     
      justifyContent="center"
      flexDirection="column">
          
        {products.map((product, i) => 
        <Grow in={true} style={{ transformOrigin: '0 0 0' }}
        {...(i > 0 ? { timeout: (400 + (i*50)) } : {})}>

        <Grid item key={product.id}>
        
        
        <Card key={product.id} sx={{  m: 2 }} key={product.id} variant="outlined">
            
        <CardActionArea
        component={Link}
        to={`/prod/${product.category}/${product.id}`}
        >
        <CardMedia
        sx={{ maxHeight: 350 }}
        component="img"
        height="140"
        image={product.prodImgList}
        alt="bild saknas"
        />
        </CardActionArea>
        
            <CardContent sx={{ display: 'flex', flexDirection: 'row', p: 1, "&:last-child": {
      paddingBottom: 1} }}>
           
            <Grid item xs={10}>
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


            <Grid item xs={2}>
            

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

export default ProductList