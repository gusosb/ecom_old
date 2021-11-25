import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import FacebookSharpIcon from '@mui/icons-material/FacebookSharp'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import './Styles.css'

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
     
      
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>



        <Grid item>
        <Grid container sx={{ flexDirection: 'column', display: 'flex', maxWidth: 300, mr: 10 }}>
        <Grid item sx={{ mb: 2, mt: 1 }}>
        <img alt='ingen bild' src={content.siteimg} />
        
        </Grid>
        <Grid item xs sx={{ justifyContent: 'normal', mb: 1 }}>
        {content.footerdesc}
        </Grid>
        <Box>

        <IconButton href={content.facebook} aria-label="fb">
        <FacebookSharpIcon />
        </IconButton>

        <IconButton href={content.twitter} aria-label="twitter">
        <TwitterIcon />
        </IconButton>

        <IconButton href={content.youtube} aria-label="youtube">
        <YouTubeIcon />
        </IconButton>

        </Box>
        </Grid>
        </Grid>

        <Grid item xs={2} sx={{ flexDirection: 'column', display: 'flex' }}>
        
        <Typography component='span'>
        <Box sx={{ fontWeight: 'bold', pb: 1 }}>Produkter</Box>
        </Typography>

        {content.categories && content.categories.slice(0, 4).map(e =>
        <Box key={e.id} sx={{ pt: 1 }}>
          <Link to={`/kategori/${e.id}`}>{e.catName}</Link>
          </Box>
          )}

        
        </Grid>
        <Grid item xs={1}>
        </Grid>

  

       
        

        </Grid>
        

      </Box>
    </>
  )
}

export default StickyFooter