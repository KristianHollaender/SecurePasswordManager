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
import {UserService} from "../../services/UserService.ts";
import {useNavigate} from "react-router-dom";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {useAtom} from "jotai";

export const SignIn: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [, setToken] = useAtom(TokenAtom);
  const userService = new UserService();
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
    event.preventDefault();

    try {
      setLoading(true);

      await userService.login({
        email: email,
        password: password,
      }).then(response => {
        setToken(response['accessToken']);
      });

      setTimeout(() => {
        setOpenSnackbar(true);
        setLoading(false);
        navigate("/home")
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

        <Container
            component="main"
            maxWidth="xs"
        >
          <Container style={{ display: "flex", justifyContent: "center"}}>
            <img src={"../../logo.png"} alt={"description"} className={"logoImg"} />
          </Container>
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
                noValidate
                onSubmit={handleSubmit}
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
                        style={{justifyContent: "flex-start"}}
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

              <Grid container justifyContent="flex-end">
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
                setOpenSnackbar(false);
              }}
              message="You have been remembered, and will now be signed in"
          />
        </Container>
      </ThemeProvider>
  );
};
