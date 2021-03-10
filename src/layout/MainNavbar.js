/**
 * @Name MainNavBar
 * @Description Renders the Navbar component with Route Links
 * @Props content: the content receives the layout's props.children to be rendered on the page
 * @Returns MainNavBar Component
 * @Author RJ
 * @UpdatedBy RJ
 */

import React, { useState } from 'react';
import { Divider, Drawer, List, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { PageManager, Main } from '../route/RouteData';
import NavlinkItems from '../route/NavLinkItems';
import MainNavBarStyles from './styles/LayoutStyles';
import { ReactComponent as UserIcon } from '../assets/icons/users.svg';
import PearlPayLogo from '../assets/logo/cms_logo_white.png';
import { colors } from '../assets/styleGuide';
import Header from './Header';

function MainNavbar({ content }) {
    const classes = MainNavBarStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div style={{ textAlign: 'center' }} className={classes.toolbar}>
                <img src={PearlPayLogo} alt="pearlpay CMS logo" className={classes.pearlPayLogo} />
            </div>
            <List>
                <Typography className={classes.navTitle}>Main</Typography>
                {Main.map(items => (
                    <NavlinkItems
                        key={items.id}
                        path={items.path}
                        exact={items.exact}
                        content={items.sidebar}
                        pic={items.logo}
                    />
                ))}
                <Divider className={classes.divider} />
                <Typography className={classes.navTitle} gutterBottom>
                    Page Manager
                </Typography>
                {PageManager.map(items => (
                    <NavlinkItems
                        key={items.id}
                        path={items.path}
                        content={items.sidebar}
                        pic={items.logo}
                    />
                ))}
                <Divider className={classes.divider} />
                <Typography className={classes.navTitle}>Manage</Typography>
                <NavlinkItems
                    path={'/users'}
                    content={'Users'}
                    pic={
                        <UserIcon
                            width={'1.4rem'}
                            height={'1.2rem'}
                            fill={colors.iconColor}
                            className={'icon-color'}
                        />
                    }
                />
            </List>
        </div>
    );

    return (
        <div data-testid="NavBar_Component" className={classes.root}>
            <Header data-testid="NavBar_Header_Component" drawerToggle={handleDrawerToggle} />
            <nav className={classes.drawer}>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}>
                    {drawer}
                </Drawer>
                <div className={classes.sidebar}>
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </div>
            </nav>
            <main className={classes.content}>{content}</main> {/* content of the page */}
        </div>
    );
}

export default MainNavbar;
