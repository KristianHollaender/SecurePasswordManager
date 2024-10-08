import Typography from "@mui/material/Typography";
import * as React from "react";
import Container from "@mui/material/Container";
import {Card, CardActions, CardContent, CardHeader, IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import "./Passwords.css"
import {useEffect, useState} from "react";
import {Password} from "../../models/Password.ts";
import TextField from "@mui/material/TextField";
import {Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import {AddPasswordDialog} from "../AddPasswordDialog/AddPasswordDialog.tsx";
import {CryptoService} from "../../services/CryptoService.ts";
import {useAtom} from "jotai/index";
import {DerivedAtom} from "../../atoms/DerivedKeyAtom.tsx";
import Avatar from "@mui/material/Avatar";
import {PasswordService} from "../../services/PasswordService.ts";
import {TokenAtom} from "../../atoms/TokenAtom.tsx";
import {UserAtom} from "../../atoms/UserAtom.tsx";

interface passwordProps {
  passwords: Password[];
  refreshPasswords: () => Promise<void>;
}

export const Passwords: React.FunctionComponent<passwordProps> = ({passwords, refreshPasswords}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const cryptoService = new CryptoService();
  const passwordService = new PasswordService();
  const [decryptedNames, setDecryptedNames] = useState<string[]>([]);
  const [decryptedPasswords, setDecryptedPasswords] = useState<string[]>([]);
  const [derivedKey] = useAtom(DerivedAtom);
  const [token] = useAtom(TokenAtom);
  const [user] = useAtom(UserAtom);


  useEffect(() => {
    const decryptAllNames = async () => {
      const decryptedNamesArray = await Promise.all(
          passwords.map(async (password) => {
            const decrypted = await decryptText(password.encryptedName);
            return decrypted || ""; // Return the decrypted name or empty string if decryption fails
          })
      );
      setDecryptedNames(decryptedNamesArray);
    };

    if (passwords.length > 0) {
      decryptAllNames();
    }
  }, [passwords]);

  useEffect(() => {
    const decryptAllPasswords = async () => {
      const decryptedPasswordsArray = await Promise.all(
          passwords.map(async (password) => {
            const decrypted = await decryptText(password.encryptedPassword);
            return decrypted || "";
          })
      );
      setDecryptedPasswords(decryptedPasswordsArray);
    };

    if (passwords.length > 0) {
      decryptAllPasswords();
    }
  }, [passwords]);


  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeletePassword = async (passwordId: string, userId: string) => {
    return await passwordService.deletePassword(passwordId, userId, token).then(() =>{
      refreshPasswords();
    });
  }

  const handleTogglePassword = (id: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle between true/false
    }));
  };

  const decryptText = async (text: string) => {
    if (!derivedKey) return;
    const key = await cryptoService.importDerivedKey(derivedKey);
    return await cryptoService.decrypt(key, text);
  }

  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleTimeString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
      <Container>
        <Container sx={{
          width: "100vw",
          height: "10vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          <Typography variant="h3" sx={{paddingBottom: 1.75, alignSelf: "flex-start"}}>
            Passwords
          </Typography>
        </Container>
        <Container
            sx={{width: "100vw", height: "85vh", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 4}}>
          <Box>
            <Card className={"addCard"} sx={{width: "260px", height: "320px", borderRadius: 4}}>
              <CardContent>
                <CardActions>
                  <Box sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}>
                    <Tooltip title={"Add new password"}>
                      <IconButton
                          onClick={handleButtonClick}
                          sx={{
                            color: "rgba(87,87,87,0.72)",
                            width: "70%",
                            height: "70%",
                            border: "none",
                            borderRadius: "50%",
                          }}
                      >
                        <AddIcon sx={{width: "100%", height: "100%"}}/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </CardContent>
            </Card>

          </Box>
          {passwords && passwords.length > 0 && passwords.map((password, index) => (
              <Box key={password.id || index}>
                <Box key={password.id || index}>
                  <Card className={"standardCard"}
                        sx={{width: "260px", height: "320px", borderRadius: 4, display: "flex"}}>
                    <CardContent>
                      <CardHeader
                          avatar={
                            <Avatar sx={{backgroundColor: "#4facc3"}} aria-label="recipe">
                              {decryptedNames[index] ? decryptedNames[index].charAt(0).toUpperCase() : "L"}
                            </Avatar>
                          }
                          title={decryptedNames[index] || "Error..."}
                          titleTypographyProps={{variant: "subtitle1"}}
                          sx={{
                            paddingBottom: 5,
                            wordWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "280px",
                          }}
                      />
                      <Container>
                        <Box sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                        }}>
                          <Box sx={{display: "flex", alignItems: "center", width: "100%"}}>
                            <TextField
                                disabled={true}
                                label={"Password"}
                                type={showPassword[password.id] ? "text" : "password"}
                                value={decryptedPasswords[index] || "Error..."}
                                variant="standard"
                                InputProps={{disableUnderline: true}}
                                sx={{border: "none", width: "70%"}}
                            />
                            <IconButton onClick={() => handleTogglePassword(password.id)}>
                              {showPassword[password.id] ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                          </Box>

                          <Typography variant={"caption"}
                                      sx={{marginTop: 2, color: "rgb(149,149,149)"}}>Note</Typography>

                          <Box>
                            <Typography>
                              {password.note}
                            </Typography>
                          </Box>
                        </Box>
                      </Container>
                      <Container sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        verticalAlign: "flex-end",
                        width: "100%",
                      }}>
                        <Box sx={{marginTop: 6.5}}>
                          <Typography variant="caption" sx={{color: "rgb(149,149,149)", paddingRight: 4.75}}>
                            {formatDate(password.createdAt)}
                          </Typography>
                          <IconButton  sx={{color: "#ff5959"}} onClick={() => handleDeletePassword(password.id, user!.id)}>
                            <Delete/>
                          </IconButton>
                        </Box>
                      </Container>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
          ))}
          <AddPasswordDialog open={isDialogOpen} onClose={handleDialogClose} onAdd={refreshPasswords}/>
        </Container>
      </Container>


  );
}
