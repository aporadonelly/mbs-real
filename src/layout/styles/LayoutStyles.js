import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../assets/styleGuide';

const drawerWidth = 250;
const LayoutStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up(1025)]: {
            width: drawerWidth
        }
    },
    appBar: {
        [theme.breakpoints.up(1025)]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        height: '5rem',
        borderBottom: 'rgba(0, 0, 0, 0.1) solid 0.1px'
    },
    menuButton: {
        [theme.breakpoints.up(1025)]: {
            display: 'none'
        }
    },
    sidebar: {
        [theme.breakpoints.down(1025)]: {
            display: 'none'
        }
    },
    mobileSidebar: {
        [theme.breakpoints.up(1025)]: {
            display: 'none'
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: colors.navColor
    },
    content: {
        flex: 1,
        padding: theme.spacing(3)
    },
    linkContent: {
        textDecoration: 'none',
        color: colors.navLinkColor
    },
    divider: {
        backgroundColor: colors.divider,
        opacity: '0.1',
        margin: '2rem 0'
    },
    navTitle: {
        color: colors.navTitleColor,
        marginLeft: '1.5rem',
        fontSize: fontSizes.navTitles,
        textTransform: 'uppercase',
        marginBottom: '0.5rem'
    },
    navItems: { minWidth: '2.5rem', marginLeft: '0.5rem' },
    selected: {
        color: colors.white,
        '& li': {
            backgroundColor: 'rgb(255, 255, 255, 0.10) !important',
            borderLeftStyle: 'solid',
            borderLeftColor: colors.primary,
            borderLeftWidth: '0.2rem',
            paddingLeft: '0.8rem'
        },
        '& .icon-color': {
            fill: colors.white
        }
    },
    pearlPayLogo: {
        width: '45%',
        margin: '1rem 0'
    },
    avatar: {
        backgroundColor: `${colors.primary} !important`,
        margin: '1.2rem',
        fontSize: fontSizes.avatarText,
        padding: '0.1rem'
    },
    menuItemGroup: {
        borderRadius: '0 0.4rem',
        padding: '0.2rem 1.8rem 0.2rem 0.2rem',
        margin: '0 0.5rem 1.3rem 0.3rem',
        boxShadow: '0 12px 12px #0000000A'
    },
    menuItemLogout: {
        color: colors.error,
        justifyContent: 'left',
        fontFamily: 'Inter Regular',
        '&.active, &:hover, &.active:hover': {
            backgroundColor: 'transparent'
        }
    },
    dialogRoot: {
        marginBottom: '2rem'
    },
    dialogContent: {
        fontFamily: 'Inter Medium',
        fontSize: fontSizes.avatarText
    },
    logoutStyle: {
        backgroundColor: colors.logoutBtnColor,
        fontFamily: 'Inter Regular',
        color: colors.white,
        padding: '10px 30px',
        '&.active, &:hover, &.active:hover': {
            backgroundColor: colors.logoutBtnColor
        },
        textTransform: 'capitalize'
    },
    cancelBtnStyle: {
        padding: '10px 30px',
        marginLeft: '1rem !important',
        textTransform: 'capitalize',
        fontFamily: 'Inter Regular'
    }
}));

export default LayoutStyles;
