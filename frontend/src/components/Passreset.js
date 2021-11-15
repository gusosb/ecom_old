import { useState } from "react"

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useDispatch } from "react-redux"
import { resetPass } from "../reducers/auth"


const Passreset = (props) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const theme = createTheme()
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
      }


    const handleSubmit = (e) => {
      e.preventDefault()
      const item = {
        email,
      }
      dispatch(resetPass(item))
      props.history.push("/passrequestsuccess")
    }

    const checkIsValidEmail = () => {
      let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (re.test(email) || !email) {
            return true
        } else {
          return false
        }
    }

    return (
        <>

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        
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
            Återställ lösenord
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              error={!checkIsValidEmail()}
              value={email}
              onChange={onChangeEmail}
              label="Epostadress"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Återställ
            </Button>



          </Box>
        </Box>
        
      </Container>
      </ThemeProvider>
        </>
    )
}

export default Passreset