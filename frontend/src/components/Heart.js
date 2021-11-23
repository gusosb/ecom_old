import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

import { unheartItem } from '../reducers/heartReducer'

import './Styles.css'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Popover from '@mui/material/Popover'


const Heart = () => {
    const dispatch = useDispatch()
    const heartContent = useSelector(state => state.heart)
  
    const [ heart, setHeart ] = useState(false)
    const [ anchor, setAnchor ] = useState()
  
    const handleClickHeart = (e) => {
      setAnchor(e.currentTarget)
      setHeart(true)
    }
    const removeHeart = (id) => {
      dispatch(unheartItem(id))
    }
    return (
        <>
        <IconButton aria-describedby='2' aria-label="showheart" size="large" onClick={handleClickHeart}>
        <FavoriteIcon className="col2" />
        </IconButton>
        

        <Popover
        id='2'
        open={heart}
        anchorEl={anchor}
        onClose={() => setHeart(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        >
        <Typography component={'div'} sx={{ pb: 2, pr: 2, pl: 2, pt: 0 }}>

          {heartContent.map(product =>
          <Grid key={product.id} container sx={{ flexDirection: 'row', mt: 2, width: 250 }} >

          

  
          <Grid item xs={4} sx={{ mt: 0 }}>
          <CardActionArea
          sx={{ mr: 2 }}
          component={Link}
          to={`/prod/${product.category}/${product.id}`}
          onClick={() => setHeart(false)}
          >
          <CardMedia
          component="img"
          image={product.prodImg}
          alt="no image"
          className="heartimg"
          variant="outlined"
          />
          </CardActionArea>
          </Grid>
          <Grid item xs>
            <Box display="flex"
          justifyContent="center">
            {product.prodName}
            </Box>
            

            <Box sx={{ flexDirection: 'row', display: 'flex' }}>
            <Grid item xs sx={{ pl: 5, pt: 1 }}>
          {product.prodPrice},00 kr
           </Grid>
           
            <Grid item xs={3}>
            <IconButton onClick={() => removeHeart(product.id)}><FavoriteIcon className="col2" /></IconButton>
            </Grid>
            </Box>
          </Grid>
          </Grid>
          )}


        </Typography>
         </Popover>
            
        </>
    )
}

export default Heart