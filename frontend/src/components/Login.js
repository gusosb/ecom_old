import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Link } from 'react-router-dom'


import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import { login, clearError } from "../reducers/auth"


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isLoggedIn } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
      .then(() => {
        if (isLoggedIn) {
          props.history.push("/")
        }
      })
      .catch(() => {
      })
  }
  
  const theme = createTheme()



  useEffect(() => {
    if (auth.error) {
      setTimeout(() => {
        dispatch(clearError())
      }, 6000)
    }
  }, [auth.error])




  if (isLoggedIn) {
    return <Redirect to="/" />
  }


  return (
  
      <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {auth.error &&
          <Typography variant="h6" color="red">
          Felaktigt användarnamn eller lösenord.
          </Typography>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logga in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={onChangeEmail}
              label="Epostadress"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              onChange={onChangePassword}
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link to={"/passreset"}>
                Glömt lösenordet?
              </Link>
              </Grid>
              <Grid item>
              <Link to={"/register"}>
                Inte medlem? Skapa konto.
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      </ThemeProvider>
    </>
  )
}

export default Login



