import * as React from "react";
import {useAtom} from "jotai";
import "./Home.css";
import {useEffect, useState} from "react";
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
import {DerivedAtom} from "../../atoms/DerivedKeyAtom.tsx";
import {Password} from "../../models/Password.ts";
import {PasswordService} from "../../services/PasswordService.ts";

export const Home: React.FunctionComponent = () => {
  const userService = new UserService();
  const cryptoService = new CryptoService();
  const passwordService = new PasswordService();
  const [token] = useAtom(TokenAtom);
  const [user, setUser] = useAtom(UserAtom);
  const [derivedKey, setDerivedKey] = useAtom(DerivedAtom);
  const [masterPassword] = useAtom(MasterPasswordAtom);
  const [passwords, setPasswords] = useState<Password[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const me = await userService.getCurrentUserInfo(token);
      setUser(me);
      const derivedKey = await cryptoService.deriveKey(masterPassword, me.salt);
      setDerivedKey(derivedKey);
      console.log(me)
      console.log(derivedKey)
    };

    fetchUserInfo()
  }, [token]);



  const getPasswords = async () => {
    const passwords = await passwordService.getPasswordsByUser(user!.id, token);
    setPasswords(passwords);
  };

  useEffect(() => {
    if(!derivedKey) return;

    const fetchData = async () => {
        await cryptoService.importDerivedKey(derivedKey);
        await getPasswords();
    };

    fetchData();
  }, [derivedKey]);

  return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Box sx={{ display: "flex", minWidth: "20vw", width: "20vw", flexShrink: 0 }}>
            <SideBar />
          </Box>
          <Box sx={{ paddingLeft: "18vw", paddingTop: 2.5, flexGrow: 1 }}>
            <Passwords passwords={passwords} refreshPasswords={getPasswords} />
          </Box>
        </Box>
      </ThemeProvider>
  );
}
