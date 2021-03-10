import { createStyles, makeStyles } from '@material-ui/core/styles';

// Style for Login Component
const LoginFormStyles = makeStyles(
    createStyles({
        loginBtn: {
            marginTop: '4rem',
            flexGrow: 1,
            width: '100%'
        },
        subText: {
            textAlign: 'center',
            marginTop: '4rem'
        }
    })
);

export default LoginFormStyles;
