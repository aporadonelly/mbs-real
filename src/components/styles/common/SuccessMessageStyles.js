import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../assets/styleGuide';

const SuccessMessageStyles = makeStyles(
    createStyles({
        iconBackground: {
            margin: '2rem 0 1rem',
            backgroundColor: `${colors.successBackgroundColor} !important`
        }
    })
);

export default SuccessMessageStyles;
