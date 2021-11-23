import './Styles.css'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { logout } from "../reducers/auth"
import { Link } from 'react-router-dom'
import useWindowSize from '../hooks/hooks'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import Drawer from '@mui/material/Drawer'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const HeaderSmall = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const { user: currentUser } = useSelector(state => state.auth)

    const [ anchor, setAnchor ] = useState()
    const [ open, setOpen ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchC, setSearchC ] = useState('')
    const [ togglesrch, setTogglesrch ] = useState(false)
    const [ menudrawer, setMenudrawer ] = useState(false)

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

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setAnchor(e.currentTarget)
        if (!e.target.value || (e.target.value === ' ')) {
            setOpen(false)
        } else {
            setOpen(true)
            const searched = content.categories.map(e => e.products.filter(r => r.prodName.toLowerCase().includes(search.toLowerCase())))
            setSearchC(searched)
        }
    }

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return
        }
        setMenudrawer(false)
      }

    const SearchList = () => {
      const items = searchC.flat().slice(0, 4)

      return (
        <>  
        <Grid container>
        {items.flatMap(e => 
          <>
          <Grid item xs={5}>
            
          </Grid>

          <Grid item xs={7}>
          {e.prodName}
          </Grid>
          </>
          )}
          </Grid>
        </>
      )
    }



    return (
    <>
    <Grid container sx={{ height: 70 }}>
    {togglesrch
    ? 
    <>
    <Box sx={{ p: 2 }}>
    <Paper
    component="form"
    variant="outlined"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 3, borderColor: 'primary.main' }}
    >
    <IconButton sx={{ p: '5px' }} aria-label="search">
    <SearchIcon />
    </IconButton>
    <InputBase
    sx={{ mr: 0, flex: 1 }}
    placeholder="Sök..."
    inputProps={{ 'aria-label': 'search google maps' }}
    value={search}
    onChange={(e) => handleSearch(e)}
    />
    <IconButton sx={{ p: '5px' }} aria-label="closesearch" onClick={() => setTogglesrch(false)}>
    <CloseIcon />
    </IconButton>
    
    </Paper>
    </Box>
    <Popover
    open={open}
    disableAutoFocus={true}
    disableEnforceFocus={true}
    anchorEl={anchor}
    onClose={() => setOpen(false)}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
    {searchC && searchC[0].length === 0
    ? <Typography sx={{ p: 2 }}>Inga sökresultat hittades...</Typography>
    : <SearchList />}
    </Popover>
    </>
    :<>
    <Grid container sx={{ justifyContent: 'center', display: 'flex', pt: 2 }}>

    <IconButton aria-label="menudrawer" onClick={() => setMenudrawer(true)}>
    <MenuSharpIcon />
    </IconButton>
    <Drawer
    anchor='left'
    open={menudrawer}
    onClose={toggleDrawer()}
    >
    detta är drawer
    </Drawer>

    <Link to='/'>
    <img src={content.siteimg} alt='' className="himg2" />
    </Link>
    <IconButton aria-label="searchtoggle" onClick={() => setTogglesrch(true)}>
    <SearchIcon />
    </IconButton>

    {currentUser
    ? <LoggedIN />
    : <IconButton component={Link} to="/login" aria-label="login">
    <PersonOutlineIcon />
    </IconButton>
    }
    </Grid>
    </>}
    </Grid>
    </>
    )
} 

export default HeaderSmall