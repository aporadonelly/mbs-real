/**
 * @Name NavLinkItems
 * @Description Gets the final mapped items from RouteData.js then passes it to MainNavBar component
 * @Props ( path, content, pic ) gets the path, sidebar name and the logo of each data from RouteData.js that is mapped by MainNavBar Component
 * @Returns Navlinks for MainNavBar component
 * @Author RJ
 * @UpdatedBy RJ
 */

import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import MainNavBarStyles from '../layout/styles/LayoutStyles';

const NavLinkItems = ({ path, content, pic, exact }) => {
    const classes = MainNavBarStyles();
    return (
        <NavLink
            exact={exact}
            data-testid="NavLink"
            activeClassName={classes.selected}
            className={classes.linkContent}
            to={path}>
            <ListItem data-testid="NavLink_Item" key={content}>
                <ListItemIcon className={classes.navItems} data-testid="NavLink_Icon">
                    {pic}
                </ListItemIcon>
                <ListItemText
                    data-testid="NavLink_Content"
                    primary={<Typography style={{ fontSize: '14px' }}>{content}</Typography>}
                />
            </ListItem>
        </NavLink>
    );
};

export default NavLinkItems;
