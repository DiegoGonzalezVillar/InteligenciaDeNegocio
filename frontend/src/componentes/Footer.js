import {Box, AppBar,Container,Toolbar,Typography} from '@mui/material'
import '../style/Footer.css'
import Instagram from '@material-ui/icons/Instagram';
import Twitter from '@material-ui/icons/Twitter';
import Facebook from '@material-ui/icons/Facebook';
import LinkedIn from '@material-ui/icons/LinkedIn';
import YouTube from '@material-ui/icons/YouTube';

export default function Footer() {
  const fecha = new Date()
  const añoActual = fecha.getFullYear();
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0, backgroundColor: '#FFFFFF' }}>
      <Box sx={{flexGrow :1}} bottom = {0}>
          <Container>
              <Toolbar sx={{ justifyContent: "center" }}>
                <Instagram style={{ fontSize: '20px', color: "#be3a49"}} onClick = {()=> window.open('https://www.instagram.com/integracion_afap/')} />
                <Facebook style={{ fontSize: '20px', color: "#be3a49"}}  onClick = {()=> window.open('https://www.facebook.com/IntegracionAFAP/')} />
                <Twitter style={{ fontSize: '20px', color: "#be3a49"}}  onClick = {()=> window.open('https://twitter.com/IntegracionAfap/')} />
                <LinkedIn style={{ fontSize: '20px', color: "#be3a49"}}  onClick = {()=> window.open('https://uy.linkedin.com/company/integraci%C3%B3n-afap')} />
                <YouTube style={{ fontSize: '20px', color: "#be3a49"}}  onClick = {()=> window.open('https://www.youtube.com/channel/UCFe_gLl4Sr8MT9AHXsrc63g')} />
              </Toolbar>
              <Toolbar sx={{ justifyContent: "center" }}>
                <Typography style={{fontSize: '15px', color: "#be3a49"}}  variant="caption" >
                  ©copyright {añoActual}
                </Typography>
              </Toolbar>
          </Container>
      </Box>
    </AppBar>

  )
}