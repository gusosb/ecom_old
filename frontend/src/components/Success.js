import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getSession } from '../reducers/sessionReducer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

const Success = () => {
    const dispatch = useDispatch()

    const session = useSelector(state => state.session)
    const content = useSelector(state => state.content)

    const session_id = {
        siteid: content.id,
        sessionid: window.location.href.split('=')[1],
    }

    if (session.length === 0 && content.id) {
        dispatch(getSession(session_id))
    }

    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', mt: 6 }} 
            display="flex"
            justifyContent="center"
            >
            <Card sx={{ minWidth: 275 }} variant="outlined">
            <CardContent>
            <Typography variant="h5" compone    nt="div"             display="flex"
            justifyContent="center">
                Beställning mottagen
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"             display="flex"
            justifyContent="center">
                Tack för din beställning
            </Typography>
            <Typography variant="body2">

            </Typography>
            </CardContent>
            <CardActions>
            
            </CardActions>
            </Card>
            </Grid>
        </>
    )
}

export default Success