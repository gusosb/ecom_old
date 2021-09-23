import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Link } from "react-router-dom"



const ProductList = ({ category }) => {
    const products = category.products
    return (
        <Grid container className="tabb" sx={{ mx: "auto" }}>

        <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'row'}}       height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column">
        {products.map(product => 
        <Card sx={{ maxWidth: 345, m: 2 }} key={product.id}>
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
            sx={{ maxHeight: 350 }}
            component="img"
            height="140"
            image={product.prodImg}
            alt="green iguana"
            />
            <CardContent>
            <Typography variant="body2" color="text.secondary">
            {product.prodName} - {product.prodDescription}
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
        </Box>
        </Grid>
        </Grid>
        
    )
}

export default ProductList