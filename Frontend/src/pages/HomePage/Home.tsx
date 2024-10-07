import * as React from "react";
import {useAtom} from "jotai";
import "./Home.css";
import {useEffect} from "react";
import {UserService} from "../../services/UserService.ts";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {UserAtom} from "../../atoms/UserAtom.tsx";
import {defaultTheme} from "../../theme/theme.ts";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {SideBar} from "../../components/SideBar/SideBar.tsx";
import Box from "@mui/material/Box";
import {Passwords} from "../../components/Passwords/Passwords.tsx";
import {MasterPasswordAtom} from "../../atoms/MasterPasswordAtom.tsx";
import {CryptoService} from "../../services/CryptoService.ts";

export const Home: React.FunctionComponent = () => {
  const userService = new UserService();
  const cryptoService = new CryptoService();
  const [token] = useAtom(TokenAtom);
  const [, setUser] = useAtom(UserAtom);
  const [masterPassword] = useAtom(MasterPasswordAtom);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const me = await userService.getCurrentUserInfo(token);
      setUser(me);
      const derivedKey = await cryptoService.deriveKey(masterPassword, me.salt);
      console.log(me)
      console.log(derivedKey)
    };

    fetchUserInfo()
  }, [token]);

  // const getDerivedKey = (masterPassword: string, salt: string) => {
  //   //Find a way to get the masterPassword
  //   //Maybe change the login view to login with only an email and after that on a new page
  //   //Login with the masterPassword which is used to get the derivedKey with the salt
  //   //Just like bitwarden
  // }

  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        <Box sx={{display: "flex", minHeight: "100vh", minWidth: "80vw"}}>
          <Box sx={{display: "flex"}}>
            <SideBar/>
          </Box>
          <Box sx={{paddingLeft: 18, paddingTop: 2.5}}>
            <Passwords/>
          </Box>

        </Box>
      </ThemeProvider>
  );
}
