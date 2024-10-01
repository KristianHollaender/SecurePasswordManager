import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@mui/material/styles";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import {defaultTheme} from "../../theme/theme.ts";
import "./SignUp.css";
import {Copyright} from "../../components/copyright.tsx";
import {UserService} from "../../services/UserService.ts";

export default function SignUp() {
  const userService =  new UserService();
  const [email, setEmail] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handlePasswordValueChange = (
      event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);


      await userService.register({
        email: email,
        password: passwordValue,
      });

      setTimeout(() => {
        setOpenSnackbar(true);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      // @ts-expect-error to expect error
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  return (
      <ThemeProvider theme={defaultTheme}>

        <Container component="main" maxWidth="xs">
          <Container style={{ display: "flex", justifyContent: "center", alignSelf: "center"}}>
            <img src={"../../logo.png"} alt={"description"} className={"logoImg"} />
          </Container>
          <CssBaseline />
          <Box className="containerBox">
            <Avatar className="avatar" sx={{ backgroundColor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ marginTop: 1.5 }}
            >
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={passwordValue}
                      onChange={handlePasswordValueChange}
                  />
                </Grid>
                {passwordValue && (
                    <Grid item xs={12}>
                      <TextField
                          required
                          fullWidth
                          name="passwordRepeat"
                          label="Repeat password"
                          type="password"
                          id="passwordRepeat"
                          autoComplete="new-password"
                      />
                    </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                {errorMessage && (
                    <Grid item xs={12} className="errorMessageGrid">
                      <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                )}

                <Typography className="formControlTypography">
                  <FormControlLabel
                      control={
                        <Checkbox
                            value="allowExtraEmails"
                            color="primary"
                            onChange={(event) => setIsChecked(event.target.checked)}
                            checked={isChecked}
                        />
                      }
                      label={"I agree to the"}
                  />
                  <Link
                      marginLeft={-1.5}
                      marginTop={1}
                      href={
                        "https://generator.lorem-ipsum.info/terms-and-conditions"
                      }
                      target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                  {loading && (
                      <CircularProgress size={32} className="circularProgress" />
                  )}
                </Typography>
              </Grid>
              <Grid className="submitButtonGrid">
                <Button type="submit" fullWidth variant="contained">
                  Sign Up
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-in" variant="body2">
                    Already have an account? Sign in
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
                // TODO Navigation here
                setOpenSnackbar(false);
              }}
              message="You have been signed up and will be redirected to login"
          />
        </Container>
      </ThemeProvider>
  );
}
