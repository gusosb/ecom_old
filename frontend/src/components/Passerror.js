import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Passerror = () => {
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
        <Typography variant="h6" color="red">
        Återställningslänken är ogiltig.
        </Typography>
        </Box>
        </>
    )
}

export default Passerror