import { CircularProgress , Stack } from "@mui/material";



function Loader({ color }) {
    return (
        <Stack direction="row" sx={{
            marginInline: 'auto',
            textAlign: 'center',
            marginTop: '100px',
        }}>
            <CircularProgress color={color} />
        </Stack>
    );
}

export default Loader;

