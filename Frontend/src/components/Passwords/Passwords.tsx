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
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AddPasswordDialog} from "../AddPasswordDialog/AddPasswordDialog.tsx";
import {CryptoService} from "../../services/CryptoService.ts";
import {useAtom} from "jotai/index";
import {DerivedAtom} from "../../atoms/DerivedKeyAtom.tsx";

interface passwordProps {
  passwords: Password[];
}

export const Passwords: React.FunctionComponent<passwordProps> = ({passwords}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const cryptoService = new CryptoService();

  const [derivedKey] = useAtom(DerivedAtom);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleTogglePassword = (id: string) => {
    setShowPassword((prev) => ({...prev, [id]: !prev[id]}));
  };


  const decryptText = async (text: string) => {
    if(!derivedKey) return;
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

  useEffect(() => {

  }, [passwords]);

  return (
      <Container>
        <Container sx={{
          width: "100vw",
          height: "10vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}>
          <Typography variant="h3" sx={{paddingBottom: 1.75, alignSelf: "flex-start", position: "absolute"}}>
            Passwords
          </Typography>
        </Container>
        <Container
            sx={{width: "100vw", height: "85vh", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 4}}>
          <Box>
            <Card className={"addCard"} sx={{width: "280px", height: "340px", borderRadius: 4}}>
              <CardContent>
                <CardActions>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
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
              <Box key={password.Id || index}>
                <Box key={password.Id || index}>
                  <Card className={"standardCard"} sx={{width: "280px", height: "340px", borderRadius: 4}}>
                    <CardContent>
                      <CardHeader
                          title={decryptText(password.encryptedName)}
                          sx={{
                            paddingBottom: 5,
                            wordWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "280px"
                          }}
                      /> <CardActions>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%"
                      }}>
                        <Box sx={{display: "flex", alignItems: "center", width: "100%"}}>
                          <TextField
                              disabled={true}
                              label={"Password"}
                              type={showPassword[password.Id] ? "text" : "password"}
                              value={password.encryptedPassword}
                              variant="standard"
                              InputProps={{disableUnderline: true}}
                              sx={{border: "none", width: "90%"}}
                          />
                          <IconButton onClick={() => handleTogglePassword(password.Id)}>
                            {showPassword[password.Id] ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </Box>

                        <Typography variant={"caption"}
                                    sx={{marginTop: 2, color: "rgb(149,149,149)"}}>Note</Typography>

                        <Box>
                          <Typography>
                            {password.note}
                          </Typography>
                          {/*<Box sx={{flexGrow: 1, height: "100%"}}/>*/}
                          <Typography sx={{
                            color: "red",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            verticalAlign: "flex-end"
                          }}>
                            Fix this
                          </Typography>
                          <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            verticalAlign: "flex-end"
                          }}>
                            <Typography variant="caption" sx={{color: "rgb(149,149,149)"}}>
                              {formatDate(password.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardActions>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
          ))}
          <AddPasswordDialog open={isDialogOpen} onClose={handleDialogClose}/>
        </Container>
      </Container>


  );
}