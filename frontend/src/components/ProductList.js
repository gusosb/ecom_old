import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { IconButton, CardActionArea } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from "react-redux"
import { heartItem, unheartItem } from '../reducers/heartReducer'

import { Link } from "react-router-dom"



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


    return (
        <Grid container className="tabb">

        <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'row'}}       
     
      justifyContent="center"
      flexDirection="column">
        {products.map(product => 
        
        <Card sx={{ maxWidth: 345, m: 2 }} key={product.id} variant="outlined">
            
        <CardActionArea
        component={Link}
        to={`/prod/${product.category}/${product.id}`}
        >
            <CardMedia
            sx={{ maxHeight: 350 }}
            component="img"
            height="140"
            image={product.prodImg}
            alt="bild saknas"
            />
        </CardActionArea>
        
            <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
           
            <Grid item xs={10}>
            <Typography variant="body2" color="text.secondary">
            {product.prodName} - {product.prodDescription}
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
        )}
        </Box>
        </Grid>
        </Grid>
        
    )
}

export default ProductList