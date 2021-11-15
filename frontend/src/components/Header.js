import './Styles.css'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { logout } from "../reducers/auth"
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const Header = () => {

    const dispatch = useDispatch()
    const content = useSelector(state => state.content)
    const { user: currentUser } = useSelector(state => state.auth)

    const [ anchor, setAnchor ] = useState()
    const [ open, setOpen ] = useState(false)
    const [ search, setSearch ] = useState('')
    const [ searchC, setSearchC ] = useState('')

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
        
        <header className="header1">
        <Grid container >
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={2} sx={{ p: 2 }}>
        <img src={content.siteimg} alt='' className="himg" />
        </Grid>
        <Grid item xs={2} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>

      



     
        <Paper
      component="form"
      variant="outlined"
      
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, borderRadius: 3, borderColor: 'primary.main' }}
        >
        <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ mr: 0, flex: 1 }}
        placeholder="Sök..."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={search}
        onChange={(e) => handleSearch(e)}
      />

        </Paper>
       


     

        <Popover
        
        open={open}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorEl={anchor}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {searchC && searchC[0].length === 0
        ? <Typography sx={{ p: 2 }}>Inga sökresultat hittades...</Typography>
        : <SearchList />}
        
      </Popover>

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