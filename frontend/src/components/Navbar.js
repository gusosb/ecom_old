import placeholderLogo from './logoipsum-logo-10.svg'
import './Styles.css'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

const Navbar = () => {

    const COLORS = {

    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `1px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }))

    return (
        <>
        <Grid container style={{ color: 'white', backgroundColor: '#c7c7c7' }}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        <Button variant="text" size="large" style={{ color: 'white' }} endIcon={<ArrowDropDownIcon />}>Text</Button>
        </Grid>
        <Grid item xs={4}>
            
        <IconButton color='primary' aria-label="showcart" size="large">

        <StyledBadge badgeContent={4} color="secondary" >
        <ShoppingCartIcon className="color1" />

        </StyledBadge>
         </IconButton>
        </Grid>
        </Grid>
        </>
    )
}

export default Navbar
