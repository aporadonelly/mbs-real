import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const PromoModalStyles = makeStyles(
    createStyles({
        root: {
            '& .MuiPaper-root': {
                width: '43.75rem',
                maxWidth: '43.75rem'
            },
            '& .MuiDialogTitle-root': {
                padding: '0'
            }
        },
        titleContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        modalLabel: {
            fontFamily: 'Inter Medium !important',
            fontSize: `${fontSizes.text} !important`
        },
        titleStyle: {
            flexGrow: '1',
            paddingLeft: '2rem',
            fontFamily: 'Inter Medium'
        },
        iconStyle: {
            paddingRight: '0.6rem',
            fontSize: '1.1rem',
            color: `${colors.editIconColor} !important`
        },
        imgContainer: {
            display: 'flex',
            maxwidth: '15.625rem'
        },
        imgStyle: {
            width: '100%',
            objectFit: 'contain',
            borderRadius: '0.5rem'
        },
        statusContainer: {
            marginLeft: 'auto',
            width: '10.4rem'
        }
    })
);

export default PromoModalStyles;
