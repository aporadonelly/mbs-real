/**
 * @Name Header
 * @Description Renders App Bar for the MainNavBar Component
 * @Props drawerToggle: passes the function that toggles the menubar drawer when it is on mobile state
 * @Returns AppBar Component with Logout
 * @Author RJ
 * @UpdatedBy RJ
 */
import {
    AppBar,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ArrowDownIcon from '@material-ui/icons/ExpandMoreOutlined';
import MainNavBarStyles from './styles/LayoutStyles';
import { logout, fetchRole, updateAuth } from '../actions';
import { colors } from '../assets/styleGuide';
import { userStatus } from '../reducers/constants';

const Header = ({ drawerToggle }) => {
    const classes = MainNavBarStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const open = Boolean(anchorEl);
    const auth = useSelector(state => state.auth);

    const userDetails = {
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        role: auth.user.role
    };

    // Get user role label
    useEffect(() => {
        if (auth.user.roleCode !== null) {
            dispatch(fetchRole(auth.user.roleCode));
            setUserRole(auth.user.role);
        }
    }, [auth.user.role]);

    const initials = userDetails.firstName.slice(0, 1) + userDetails.lastName.slice(0, 1);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        setAnchorEl(null);
        dispatch(updateAuth('status', userStatus.CHANGING_PASSWORD));
        dispatch(updateAuth('renderChangePassword', true));
        dispatch(updateAuth('isChangePasswordSuccess', false));
        dispatch(
            updateAuth('changePasswordError', {
                code: '',
                message: ''
            })
        );
        history.push('/change-password');
    };

    const handleAccountClose = () => {
        setAnchorEl(null);
        history.push('/');
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
        setAnchorEl(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <AppBar elevation={0} color="inherit" position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={drawerToggle}
                        className={classes.menuButton}>
                        <MenuIcon style={{ color: colors.black }} />
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                        style={{ marginRight: '1.2rem' }}>
                        <Avatar id="userInitials" className={classes.avatar}>
                            {initials}
                        </Avatar>
                        <p>
                            <span id="userFullName" style={{ fontFamily: 'Inter Medium' }}>
                                {userDetails.firstName} {userDetails.lastName}
                            </span>
                            <br />
                            <span id="userRole">{userRole || <div style={{ height: 17 }} />}</span>
                        </p>
                        <IconButton
                            data-testid="menuBtn"
                            disableRipple
                            onClick={handleMenu}
                            color="inherit">
                            <ArrowDownIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Menu for change password and logout */}

            <Menu
                elevation={0}
                style={{
                    margin: '3rem 1.3rem',
                    width: '20rem'
                }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}>
                <div className={classes.menuItemGroup}>
                    <MenuItem
                        data-testid="accountSettings"
                        disableRipple
                        style={{
                            backgroundColor: 'transparent',
                            fontFamily: 'Inter Regular'
                        }}
                        onClick={handleAccountClose}>
                        Account Settings
                    </MenuItem>

                    <MenuItem
                        data-testid="changePassword"
                        disableRipple
                        style={{
                            backgroundColor: 'transparent',
                            fontFamily: 'Inter Regular'
                        }}
                        onClick={handleChangePassword}>
                        Change Password
                    </MenuItem>

                    <MenuItem
                        data-testid="logoutMenu"
                        disableRipple
                        className={classes.menuItemLogout}
                        onClick={handleDialogOpen}>
                        Logout
                    </MenuItem>
                </div>
            </Menu>

            {/* Modal */}

            <Dialog
                PaperProps={{ style: { boxShadow: 'none', width: '35rem', height: '15rem' } }}
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-description"
                className={classes.dialogRoot}>
                <DialogContent className={classes.dialogContent}>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions style={{ padding: '1.5rem' }}>
                    <Button
                        data-testid="logoutBtn"
                        disableElevation
                        variant="contained"
                        onClick={handleLogout}
                        className={classes.logoutStyle}>
                        logout
                    </Button>
                    <Button
                        data-testid="dialogBoxCancel"
                        variant="outlined"
                        className={classes.cancelBtnStyle}
                        onClick={handleDialogClose}
                        color="default">
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Header;
