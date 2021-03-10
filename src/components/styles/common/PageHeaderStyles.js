import { makeStyles } from '@material-ui/core/styles';
import { fontSizes } from '../../../assets/styleGuide';

const PageHeaderStyles = makeStyles(theme => ({
    container: {
        margin: '1.5rem 0'
    },
    btn: {
        margin: '0.75rem 1rem',
        padding: '0.75rem 1rem'
    },
    btnContainer: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    pageTitle: {
        fontFamily: 'Inter Bold',
        fontSize: fontSizes.pageTitle
    }
}));

export default PageHeaderStyles;
