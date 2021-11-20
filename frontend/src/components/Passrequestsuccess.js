import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


const Passrequestsuccess = () => {
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
        <Typography>
        Ett epostmeddelande med en återställningslänk har skickats om epostadressen finns registrerad.
        </Typography>
        </Box>
        </>
    )
}

export default Passrequestsuccess