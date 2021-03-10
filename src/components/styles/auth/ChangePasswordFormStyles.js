import { createStyles, makeStyles } from '@material-ui/core/styles';

const ChangePasswordFormStyles = makeStyles(
    createStyles({
        changePasswordForm: { margin: 'auto', width: '48rem' },
        changePasswordButton: {
            marginTop: '2rem',
            flexGrow: 1,
            width: '8rem',
            textTransform: 'none',
            marginLeft: '1rem',
            marginRight: '1rem'
        }
    })
);

export default ChangePasswordFormStyles;
