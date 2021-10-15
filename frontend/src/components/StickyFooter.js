import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
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
        <Container maxWidth="sm" >
          <Typography variant="body1">
            Klistrig footer
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  )
}

export default StickyFooter