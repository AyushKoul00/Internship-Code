import React from "react";
import {
  CardActionArea,
  CardHeader,
  Drawer,
  ListItemSecondaryAction,
  Switch,
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
//Icons
import MenuIcon from "@material-ui/icon/Menu";
import InfoIcon from "@material-ui/icon/Info";
import ListIcon from "@material-ui/icon/List";
import PersonIcon from "@material-ui/icon/Person";
import RedeemIcon from "@material-ui/icon/Redeem";
import StarIcon from "@material-ui/icon/Star";

//My Components
import BotNav from "./BottomNav";
//Tabs
// import Dashboard from "./components/Dashboard";
import Dashboard from "./components/Dash/Dashboard";
import AddScreen from "./components/AddScreen";
import Feed from "./components/FeedScreen";
import Organization from "./components/OrganizationScreen";

const drawerWidth = 240;
const bottomTabHeight = 50;
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ff6347"
    },
    secondary: {
      main: "#fff"
    },
    text: {
      primary: "#fff"
    },
    background: {
      default: "#303030",
      paper: "#424242"
    }
  }
});
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff6347"
    },
    secondary: {
      main: "#333"
    },
    text: {
      primary: "#333"
    },
    background: {
      default: "#ccc",
      paper: "#ddd"
    }
  }
});
const useStyles = (theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawer: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  bottomTabs: {
    padding: 0,
    position: "fixed",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    justifyContent: "space-around",
    height: bottomTabHeight
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: false,
      isDark: true,
      theme: darkTheme,
      tab: 0,
      classes: props.classes
    };
  }

  componentDidMount() {
    const url =
      "http://karmapactdev-env.eba-pq7xdtsa.us-west-2.elasticbeanstalk.com/karmapact/latestactivities/0/1";
    fetch(url, { mode: "no-cors" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }

  render() {
    const toggleDrawer = (open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      this.setState((prev) => ({
        ...prev,
        state: open
      }));
    };

    const toggleTheme = () => {
      this.setState((prev) => ({
        ...prev,
        isDark: !prev.isDark,
        theme: prev.isDark ? lightTheme : darkTheme
      }));
    };

    const renderHeader = () => {
      switch (this.state.tab) {
        case 0:
          return "Dashboard";
        case 1:
          return "Add";
        case 2:
          return "My Feed";
        case 3:
          return "Organizations";
        default:
          return "Error";
      }
    };

    const renderTab = () => {
      switch (this.state.tab) {
        case 0:
          return <Dashboard />;
        case 1:
          return <AddScreen />;
        case 2:
          return <Feed />;
        case 3:
          return <Organization />;
        default:
          return "Error";
      }
    };

    const AvatarDrawer = () => {
      return (
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="DP">
                <PersonIcon fontSize="large" />
              </Avatar>
            }
            title="Ayush Koul"
            subheader="Sign Out"
          />
        </CardActionArea>
      );
    };

    const DrawerList = () => {
      const names = ["NGO List", "Redeem", "Karma Levels", "About"];
      const icons = [<ListIcon />, <RedeemIcon />, <StarIcon />, <InfoIcon />];
      return (
        <List>
          {names.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      );
    };

    return (
      <ThemeProvider theme={{ ...this.state.theme }}>
        <div className={this.state.classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={this.state.classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                className={this.state.classes.menuButton}
              >
                <MenuIcon color="secondary" />
              </IconButton>
              <Typography variant="h6" noWrap color="textPrimary">
                {renderHeader()}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={this.state.state}
            onClose={toggleDrawer(false)}
          >
            <div className={this.state.classes.drawer}>
              {AvatarDrawer()}
              <Divider />
              {DrawerList()}
              <Divider />
              <List>
                <ListItem>
                  <ListItemText primary="Dark Mode" textAlign="right" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="start"
                      checked={this.state.isDark}
                      onChange={toggleTheme}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={this.state.classes.content}>
            <div className={this.state.classes.drawerHeader} />
            {renderTab()}
          </main>
          <BotNav
            className={this.state.classes.bottomTabs}
            value={this.state.tab}
            onChange={(newTab) => {
              this.setState((prev) => ({
                ...prev,
                tab: newTab
              }));
            }}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(App);
