import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'


import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import './Styles.css'


const Copyright= () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Demosidan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const StickyFooter = () => {


  const content = useSelector(state => state.content)


  return (
      <>
      <CssBaseline />

      <Box
        className="footer"
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
              
        }}
      >
     
      
        <Grid container>

      <Grid item xs>
        </Grid>

        <Grid item xs={5}>
        <Grid container sx={{ flexDirection: 'column', justifyContent: 'left', display: 'flex' }}>
        <Grid item sx={{ mb: 3 }}>
        <img alt='ingen bild' src={content.siteimg} />
        
        </Grid>
        <Grid item xs sx={{ justifyContent: 'normal', width: 300, mb: 2 }}>
        {content.footerdesc}
        </Grid>
        <Box>

        <IconButton aria-label="fb" size="small">
        <FacebookSharpIcon />
        </IconButton>

        <IconButton aria-label="fb" size="small">
        <TwitterIcon />
        </IconButton>

        <IconButton aria-label="fb" size="small">
        <YouTubeIcon />
        </IconButton>

        </Box>
        </Grid>
        </Grid>

        <Grid item xs={2}>
        </Grid>

        <Grid item xs>
        </Grid>

       
        

        </Grid>
        

      </Box>
    </>
  )
}

export default StickyFooter