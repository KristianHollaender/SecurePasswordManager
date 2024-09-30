import * as React from "react";
import {ChangeEvent, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@mui/material/styles";
import {defaultTheme} from "../../theme/theme.ts";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import "./SignIn.css";
import {Copyright} from "../../components/copyright.tsx";


export const SignIn: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("errorMessage")
    setLoading(true)
    // TODO
    return event;
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <img src={"../Logo.png"} alt={"description"} className={"logoImg"} />
        </Container>
        <Container
            component="main"
            maxWidth="xs"
        >
          <CssBaseline />
          <Box className={"containerBox"}>
            <Avatar className="avatar" sx={{ backgroundColor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
                component="form"
                className="formBox"
                onSubmit={handleSubmit}
                noValidate
            >
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle changes to the email field
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                  <Grid item xs={12} className="errorMessageGrid">
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
              )}
              <FormControlLabel
                  control={
                    <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                    />
                  }
                  label="Remember me"
              />
              {loading && (
                  <CircularProgress
                      size={32}
                      style={{ marginLeft: 200, marginTop: 10 }}
                  />
              )}

              <Grid className="submitButtonGrid">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="submitButton"
                    sx={{ backgroundColor: "primary.main" }}
                >
                  Sign In
                </Button>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <Link href={"/create-new-password"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={"/sign-up"} variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box className="copyrightBox">
              <Copyright />
            </Box>
          </Box>
          <Snackbar
              open={openSnackbar}
              autoHideDuration={3500}
              onClose={() => {
                // TODO navigation
                setOpenSnackbar(false);
              }}
              message="You have been remembered, and will now be signed in"
          />
        </Container>
      </ThemeProvider>
  );
};