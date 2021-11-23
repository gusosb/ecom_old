import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import Cart from './Cart'
import Heart from './Heart'

import './Styles.css'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'



const Navbar = () => {

  const categories = useSelector(state => state.content.categories)


    return (
        <>
        <Grid container style={{ color: 'white', backgroundColor: '#607d8b' }}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4} sx={{ display:'flex', justifyContent: 'center' }}>

        {categories && categories.map(e =>
        
        <Button
        key={e.id}
        component={Link}
        to={`/kategori/${e.id}`}
         size="large" style={{ color: 'white', height: 50, fontWeight: 500 }}>{e.catName}</Button>
          )}
          
        </Grid> 

        <Grid item xs={4}>

        <Heart />
        
   
        <Cart />

        </Grid>
        </Grid>
        </>
    )
}

export default Navbar