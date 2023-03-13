import { Alert , Stack } from "@mui/material";


function Message({ severity , error }) {
    return (
        <Stack direction="row" sx={{
            marginInline: 'auto',
            textAlign: 'center',
            marginTop: '100px',
        }}>
            <Alert severity={severity}>
                {error || <>Unable to fetch data</>}
            </Alert>
        </Stack>
    )
}

export default Message;
