import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Middleware
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import reducers from './reducers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { colors } from './assets/styleGuide';

require('dotenv').config();

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const styling = createMuiTheme({
    overrides: {
        MuiButton: {
            containedPrimary: {
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: colors.primary
                },
                boxShadow: 'none',
                fontFamily: 'Inter Regular'
            },
            text: {
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: 'transparent'
                },
                fontFamily: 'Inter Regular'
            },
            outlinedSecondary: {
                textTransform: 'none',
                fontFamily: 'Inter Regular'
            }
        },
        MuiOutlinedInput: {
            input: {
                height: '0.5em',
                padding: '1em',
                caretColor: colors.primary
            }
        },
        MuiTypography: {
            body: {
                fontFamily: 'Inter Regular'
            }
        }
    },
    palette: {
        primary: {
            main: colors.primary,
            contrastText: colors.white
        },
        secondary: {
            main: colors.text
        },
        error: {
            main: colors.error
        },
        text: {
            primary: colors.text
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider theme={styling}>
                    <App />
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
