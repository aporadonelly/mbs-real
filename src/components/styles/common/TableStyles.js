import { makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const TableStyles = makeStyles(theme => ({
    tableHeader: {
        fontFamily: 'Inter Medium',
        width: '20%'
    },
    tableCell: {
        borderRight: `0.1px solid ${colors.borderTableColor}`,
        borderBottom: `0.1px solid ${colors.borderTableColor} !important`
    },
    moreIcon: {
        cursor: 'pointer',
        color: colors.navLinkColor,
        marginTop: '0.3rem'
    },
    menuContainer: {
        position: 'absolute',
        right: '4rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        background: colors.white,
        padding: '0.25rem 0',
        width: '5rem',
        [theme.breakpoints.down('sm')]: {
            right: 'inherit'
        }
    },
    menuItem: {
        borderRadius: 0,
        fontSize: fontSizes.text
    }
}));

export default TableStyles;
