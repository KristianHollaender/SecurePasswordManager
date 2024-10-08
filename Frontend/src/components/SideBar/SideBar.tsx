import * as React from "react";
import {useState} from "react";
import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import {ThemeProvider} from "@mui/material/styles";
import {defaultTheme} from "../../theme/theme.ts";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import "./SideBar.css";
import Box from "@mui/material/Box";


export const SideBar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    navigate("/sign-in");
    localStorage.clear();
    location.reload()
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Drawer
            variant="permanent"
            anchor="left"
            className="drawer"
            sx={{
              "& .MuiDrawer-paper": {
                width: "20vw",
                backgroundColor: defaultTheme.palette.background.default,
                color: defaultTheme.palette.secondary.main,
                display: "flex",
                flexDirection: "column",
              },
            }}
        >
          <Box>
            <img
              src={"../../linear_logo.png"}
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: 15
              }}
          />
          </Box>

          <List sx={{flexGrow: 1}}>
            <ListItemButton className={"listItem"} onClick={() => console.log("hey")}>
              <ListItemIcon>
                <LockPersonIcon sx={{color: "primary.main"}}/>
              </ListItemIcon>
              <ListItemText primary="Passwords" sx={{color: "white"}}/>
            </ListItemButton>


          </List>
          <List sx={{marginTop: "auto"}}>
            <ListItemButton  onClick={handleMenuClick} component="div">
              <ListItemIcon>
                <MoreVertIcon sx={{color: "primary.main"}}/>
              </ListItemIcon>
              <ListItemText primary="More" sx={{color: "white"}}/>
            </ListItemButton>
          </List>
        </Drawer>

        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
        >
          <MenuItem onClick={handleLogout} className="logout-menu">
            <LogoutIcon sx={{paddingRight: 1, width: "32px", height: "32px"}}/>
            Logout
          </MenuItem>
        </Menu>
      </ThemeProvider>
  );
};