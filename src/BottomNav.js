import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DashIcon from "@material-ui/icons/DashboardRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import React from "react";
export default function BotNav({ className, value, onChange }) {
  return (
    <BottomNavigation
      className={className}
      showLabels
      onChange={(event, newValue) => {
        console.log(newValue);
        onChange(newValue);
      }}
      value={value}
    >
      <BottomNavigationAction label="Dashboard" icon={<DashIcon />} />
      <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
      <BottomNavigationAction label="My Feed" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="Organizations" icon={<PeopleAltIcon />} />
    </BottomNavigation>
  );
}
