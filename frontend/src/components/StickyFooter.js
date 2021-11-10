import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
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

        <Grid item xs={7}>
        <Grid container sx={{ flexDirection: 'column', alignContent: 'flex-start' }}>
        <Grid item>
        <img alt='ingen bild' src={content.siteimgsm} />
        
        </Grid>
        <Grid item>
        {content.footerdesc && content.footerdesc}
        </Grid>
        </Grid>
        </Grid>

        <Grid item xs>
        </Grid>

       
        

        </Grid>
        

      </Box>
    </>
  )
}

export default StickyFooter