import Snackbar from '@material-ui/core/Snackbar'

export default function Snackbar() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
return(
<Snackbar
    open={openSnackbar}
    onClose={() => setOpenSnackbar(false)}
    message={responseMessage}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
    
/>)
}