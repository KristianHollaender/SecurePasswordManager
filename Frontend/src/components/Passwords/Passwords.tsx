import Typography from "@mui/material/Typography";
import * as React from "react";
import Container from "@mui/material/Container";
import {Card, CardActions, CardContent, CardHeader, IconButton, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import "./Passwords.css"
import {useState} from "react";
import {Password} from "../../models/Password.ts";
import TextField from "@mui/material/TextField";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AddPasswordDialog} from "../AddPasswordDialog/AddPasswordDialog.tsx";


export const Passwords: React.FunctionComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});


  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleTogglePassword = (id: string) => {
    setShowPassword((prev) => ({...prev, [id]: !prev[id]}));
  };

  const list: Password[] = [
    {
      Id: "1",
      EncryptedName: "Netflix.com",
      EncryptedPassword: "NetflixPassword1234@",
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      UserId: "1",
    },
    {
      Id: "2",
      EncryptedName: "AWS.com",
      EncryptedPassword: "AWSPassword1234@",
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      UserId: "1",
    },

  ];

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
            All passwords
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
          {list.map((password, index) => (
              <Box key={password.Id || index}>
                <Box key={password.Id || index}>
                  <Card className={"standardCard"} sx={{width: "280px", height: "340px", borderRadius: 4}}>
                    <CardContent>
                      <CardHeader title={password.EncryptedName} sx={{paddingBottom: 5}}/>
                      <CardActions>
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
                                value={password.EncryptedPassword}
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
                              {password.Note}
                            </Typography>
                            <Box sx={{flexGrow: 1, height: "100%"}}/>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" , verticalAlign: "flex-end"}}>
                              <Typography variant="caption" sx={{color: "rgb(149,149,149)"}}>
                                {password.CreatedAt.toDateString()}
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
          <AddPasswordDialog open={isDialogOpen} onClose={handleDialogClose} />
        </Container>
      </Container>


  );
}