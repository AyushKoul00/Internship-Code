import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Box
} from "@material-ui/core";

import SwipeableViews from "react-swipeable-views";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";

// import PersonIcon from "@material-ui/icons/Person";

const xs = 12,
  sm = 6;
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    justifyContent: "space-around"
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    flex: 1,
    textAlign: "center"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Form = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedVal, setSelectedVal] = React.useState(0);
  const [tab, setTab] = React.useState(0);
  function colleagueList() {
    return (
      <div>
        <MenuItem value={0}>Person 1</MenuItem>
        <MenuItem value={1}>Person 2</MenuItem>
        <MenuItem value={2}>Person 3</MenuItem>
      </div>
    );
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const submitForm = () => {
    const data = {
      selector: selectedVal,
      date: selectedDate
    };
    console.log(data);
    props.handleDialogClose(data);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setTab(index);
  };

  const basicForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={xs} sm={sm}>
          <FormControl fullWidth>
            <InputLabel>Organization Name</InputLabel>
            <Select
              value={selectedVal}
              onChange={(event) => setSelectedVal(event.target.value)}
            >
              <MenuItem value={0}>Organization 1</MenuItem>
              <MenuItem value={1}>Organization 2</MenuItem>
              <MenuItem value={2}>Organization 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={xs} sm={sm}>
          <KeyboardDatePicker
            format="MM/dd/yyyy"
            id="date-picker-popup"
            label="Date"
            fullWidth
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>

        <Grid item xs={xs} sm={sm}>
          <TextField fullWidth multiline label="More Details" />
        </Grid>

        <Grid item xs={xs} sm={sm}>
          <FormControl fullWidth>
            <InputLabel>Notify a colleague</InputLabel>
            <Select>{colleagueList()}</Select>
          </FormControl>
        </Grid>

        <Grid item xs={xs}>
          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Submit Form
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    );
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Donation" />
          <Tab label="Volunteering" />
        </Tabs>
      </AppBar>
      <SwipeableViews index={tab} onChangeIndex={handleTabChangeIndex}>
        <TabPanel value={tab} index={0}>
          {basicForm()}
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Form 2
        </TabPanel>
      </SwipeableViews>
    </MuiPickersUtilsProvider>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddScreen() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Add a New Personal Activity
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button color="inherit" onClick={handleClose}>
              Close
            </Button>
            <Typography variant="h6" className={classes.title}>
              Form
            </Typography>
            {/* <Button color="inherit" onClick={handleClose}>
              Save
            </Button> */}
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Form handleDialogClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
