import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../reducers/cartReducer'

import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Paper from '@mui/material/Paper'

const PasswordReset = () => {
    const dispatch = useDispatch()

    const { resetid } = useParams()

    

    return (
        <>
            
        </>
    )
}

export default PasswordReset