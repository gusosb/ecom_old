import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePass } from "../reducers/auth"

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Paper from '@mui/material/Paper'

const PasswordReset = () => {
    const dispatch = useDispatch()

    const [ password, setPassword ] = useState('')
    const [ password2, setPassword2 ] = useState('')


    const { uidb64, token } = useParams()



    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const checkIsValidPassword = () => {
        if (password === password2) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const item = {
            uidb64,
            token,
            password,
        }
        dispatch(changePass(item))
        .catch(error =>
          console.log(error))
    }

    

    return (
        <>

        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9c27b0' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Skapa nytt lösenord
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: 350 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={password}
              type="password"
              onChange={onChangePassword}
              label="Nytt lösenord"
              autoComplete='off'
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={!checkIsValidPassword()}
              id="email"
              value={password2}
              type="password"
              onChange={onChangePassword2}
              label="Bekräfta lösenord"
              autoComplete='off'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Byt lösenord
            </Button>



          </Box>
        </Box>
            
        </>
    )
}

export default PasswordReset