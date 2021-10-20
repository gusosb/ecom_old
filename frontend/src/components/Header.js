import './Styles.css'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../reducers/auth"
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

const Header = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const { user: currentUser } = useSelector(state => state.auth)

    const logOut = () => {
        dispatch(logout())
    }

    const DivLink = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
      }))

    const LoggedIN = () => {
        return (
        <Box
        sx={{ display: 'flex', flexDirection: 'row' }}>
        <Link to="/bestallningar" variant="body2">
        <DivLink>Mina beställningar</DivLink>
        </Link>
        <button onClick={logOut}>
        <DivLink>Logga ut</DivLink>
        </button>
        </Box>
        )
    }

    return (
        
        <header className="header1">
        <Grid container >
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={2} sx={{ p: 2 }}>
        <img src={content.siteimg} alt='' className="himg" />
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={4}>
        {currentUser
        ? <LoggedIN />
        : <Link to="/login" variant="body2">
        <DivLink>Logga in</DivLink>
        </Link>
        }
        </Grid>
        </Grid>
        </header>
    )
} 

export default Header