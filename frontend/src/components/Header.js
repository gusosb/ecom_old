import placeholderLogo from './logoipsum-logo-10.svg'
import './Styles.css'
import Grid from '@mui/material/Grid'

const Header = () => {
    return (
        
        <header className="header1">
        <Grid container >
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={2} sx={{ p: 2 }}>
        <img src={placeholderLogo} alt="fireSpot" />
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