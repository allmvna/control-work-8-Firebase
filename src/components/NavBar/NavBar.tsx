import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const buttonStyles = {
    borderColor: "inherit",
    marginRight: "8px",
    color: "white",
    "&:hover": {
      borderColor: "#0022ff",
      color: "#6274db",
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppBar
          position="static"
          sx={{
            padding: "10px",
            backgroundColor: "#161b34",
            borderBottom: "1px solid",
          }}
        >
          <Toolbar>
            <Container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                to="/"
                variant="h5"
                component={NavLink}
                sx={{ flexGrow: 1, textDecoration: "none", color: "#ffff" }}
              >
                Quotes Central
              </Typography>
              <Box>
                <Button
                  to="/quotes"
                  sx={buttonStyles}
                  variant="outlined"
                  component={NavLink}
                >
                  Quotes
                </Button>
                <Button
                  to="/add-quotes"
                  sx={buttonStyles}
                  variant="outlined"
                  component={NavLink}
                >
                  Submit new quotes
                </Button>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
