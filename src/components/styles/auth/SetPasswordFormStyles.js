import { createStyles, makeStyles } from '@material-ui/core/styles';
import { colors, fontSizes } from '../../../assets/styleGuide';

const SetPasswordFormStyles = makeStyles(
    createStyles({
        requirementContainer: {
            textAlign: 'left',
            marginTop: '2rem',
            fontSize: fontSizes.requirementText,
            color: colors.grey
        },
        requirement: {
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0'
        },
        icon: {
            marginRight: '0.5rem',
            color: colors.grey
        },
        activeIcon: {
            marginRight: '0.5rem',
            color: colors.success
        }
    })
);

export default SetPasswordFormStyles;
