import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Card, Grid, CardContent, Box } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { Link } from "react-router-dom";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const url = "http://appcomercial.iafap.local:4000/";
  //const url= 'http://localhost:4000/'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${url}login`, options);
    if (!response.ok) {
      throw new Error("Error logging in");
    }
    const json = await response.json();
    if (json.message === "Login Exitoso!") {
      setResponseMessage(json.message);
      setOpenSnackbar(true);
      setIsLoggedIn(true, () => isLoggedIn);
    } else setResponseMessage(json.message);
    setOpenSnackbar(true);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      style={{ height: "100vh", marginTop: "100px" }}
    >
      <Grid item>
        <Box m={3} display="flex" alignItems="center">
          <Card>
            <CardContent>
              <form onKeyDown={handleKeyDown}>
                <Grid container direction="column" alignItems="center">
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={responseMessage}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      />
      {isLoggedIn && <Link to={`/inicio`}></Link>}
    </Grid>
  );
}
