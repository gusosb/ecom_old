import { useState } from "react"
import { register } from "../reducers/auth"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Register = (props) => {

  let htext =[]

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const [ firstname, setFirstname ] = useState('')
    const [ lastname, setLastname ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password2, setPassword2 ] = useState('')

    const handleFirstname = (e) => {
      setFirstname(e.target.value)
    }
    const handleLastname = (e) => {
      setLastname(e.target.value)
    }
    const handleEmail = (e) => {
      setEmail(e.target.value)
    }
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
    const handlePassword2 = (e) => {
      setPassword2(e.target.value)
    }

    const dispatch = useDispatch()
    const theme = createTheme()

      const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(email, password, firstname, lastname))
          .then(() => {
            if (isLoggedIn) {
              props.history.push("/")
            }
          })
          .catch((e) => {
          })
      }

      const checkIsValidEmail = () => {
        let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(email) || !email) {
              return true
          } else {
            return false
          }
      }

      const checkIsValidPassword = () => {
        if (password === password2) {
            htext = ""
            return true
        } else {
            htext = "lösenorden matchar inte"
            return false
        }
    }



    return (
        <div>

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrering
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstname"
                  value={firstname}
                  onChange={handleFirstname}
                  required
                  fullWidth
                  id="firstName"
                  label="Förnamn"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={lastname}
                  onChange={handleLastname}
                  fullWidth
                  id="lastname"
                  label="Efternamn"
                  name="lastname"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={!checkIsValidEmail()}
                  value={email}
                  onChange={handleEmail}
                  id="email"
                  label="Epostadress"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  label="Lösenord"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  helperText={htext}
                  error={!checkIsValidPassword()}
                  value={password2}
                  onChange={handlePassword2}
                  name="password2"
                  label="Bekräfta lösenord"
                  type="password"
                  id="password2"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Har du redan ett konto? Logga in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
            
        </div>
    )
}

export default Register
