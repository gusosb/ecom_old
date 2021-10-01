import './Styles.css'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

const Header = () => {


    const content = useSelector(state => state.content)

    return (
        
        <header className="header1">
        <Grid container >
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={2} sx={{ p: 2 }}>
        <img src={content.siteimg} alt="fireSpot" className="himg" />
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        </Grid>
        </header>
    )
} 

export default Header