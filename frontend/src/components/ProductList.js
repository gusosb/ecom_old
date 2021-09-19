import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Router, Switch, Route, Redirect, Link } from "react-router-dom"



const ProductList = ({ category }) => {
    const products = category.products
    return (
        <div>
        <Grid container spacing={2}>
        {products.map(product => 
        <Card sx={{ maxWidth: 345, m: 2 }}>
        <CardActionArea
        component={Link}
        to={{
            pathname: "/produkt",
            search: "?sort=name",
            hash: "#the-hash",
            state: { product }
          }}
        >
            <CardMedia
            sx={{ maxHeight: 400 }}
            component="img"
            height="140"
            image={product.prodImg}
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {product.prodName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {product.prodDescription}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'center' }}>
            <Button size="small" color="primary">
            <FavoriteIcon />
            </Button>
        </CardActions>
        </Card>
        )}
        </Grid>
        </div>
    )
}

export default ProductList