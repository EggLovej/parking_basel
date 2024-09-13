import React from "react";
import { Menu, MenuItemLink } from "react-admin";
import DashBoardIcon from "@mui/icons-material/Dashboard";
import ParkingIcon from "@mui/icons-material/LocalParking";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from '@mui/icons-material/Map';
import { useMediaQuery, Theme } from "@mui/material";
import { useTranslate } from "react-admin";

const CustomMenu = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const translate = useTranslate();

    return (
        <Menu>
            <MenuItemLink to="/" primaryText={translate("Dashboard")} leftIcon={<DashBoardIcon />}  sidebarIsOpen={!isSmall} />
            <MenuItemLink to="/parking" primaryText={translate("Parking")} leftIcon={<ParkingIcon />} sidebarIsOpen={!isSmall} />
            <MenuItemLink to="/graph" primaryText={translate("Graph")} leftIcon={<BarChartIcon />} sidebarIsOpen={!isSmall} />
            <MenuItemLink to="/map" primaryText={translate("Map")} leftIcon={<MapIcon />} sidebarIsOpen={!isSmall} />
        </Menu>
    );
};

export default CustomMenu;