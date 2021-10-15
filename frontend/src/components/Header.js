import './Styles.css'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../reducers/auth"
import { Link } from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const { user: currentUser } = useSelector(state => state.auth)

    const logOut = () => {
        dispatch(logout())
    }

    const LoggedIN = () => {
        return (
        <>
        <a href='#' className="nav-link" onClick={logOut}>
        Logga ut
        </a>
        <Link to="/bestallningar" variant="body2">
        Mina beställningar
        </Link>
        </>
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
        {currentUser &&
        <LoggedIN />
        }
        </Grid>
        </Grid>
        </header>
    )
} 

export default Header