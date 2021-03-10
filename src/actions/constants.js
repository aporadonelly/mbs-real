import { config } from '../config';

const { MBS_CMS_API_URL, COUNTRY_ID } = config;
// Server Address
export const SERVER_ADDRESS = MBS_CMS_API_URL;
export const CMS_ENDPOINT = 'cms-api';

// Constants
export const COUNTRY = COUNTRY_ID;

export const authActionType = {
    LOGIN_USER_SUCCESS: 'login_user_success',
    LOGIN_USER_FAIL: 'login_user_fail',
    LOGOUT_USER_SUCCESS: 'logout_user_success',
    LOGOUT_USER_FAIL: 'logout_user_fail',
    UPDATE_AUTH: 'update_auth',
    // Forgot Password
    FORGOT_PASSWORD_TRIGGER_SUCCESS: 'forgot_password_trigger_success',
    FORGOT_PASSWORD_TRIGGER_FAIL: 'forgot_password_trigger_fail',
    VERIFY_FORGOT_PASSWORD_SUCCESS: 'verify_forgot_password_success',
    VERIFY_FORGOT_PASSWORD_FAIL: 'verify_forgot_password_fail',
    // Force Change Password
    REQUEST_NEW_PASSWORD: 'request_new_password',
    SET_NEW_PASSWORD_SUCCESS: 'set_new_password_success',
    SET_NEW_PASSWORD_FAIL: 'set_new_password_fail',
    // User role
    FETCH_USER_ROLE_SUCCESS: 'fetch_user_role_success',
    FETCH_USER_ROLE_FAIL: 'fetch_user_role_fail',
    // Change Password
    CHANGE_PASSWORD_SUCCESS: 'change_password_success',
    CHANGE_PASSWORD_FAIL: 'change_password_fail'
};

export const awsParameters = {
    NEW_PASSWORD_REQUIRED: 'NEW_PASSWORD_REQUIRED'
};

export const promosActionType = {
    CREATE_PROMO_SUCCESS: 'create_promo_success',
    CREATE_PROMO_FAIL: 'create_promo_fail',
    RESET_PROMO: 'reset_promo',
    FETCH_PROMO_SUCCESS: 'fetch_promo_success',
    FETCH_PROMO_FAIL: 'fetch_promo_fail',
    FETCH_SPECIFIC_PROMO_SUCCESS: 'fetch_specific_promo_success',
    FETCH_SPECIFIC_PROMO_FAIL: 'fetch_specific_promo_fail',
    UPDATE_PROMO_SUCCESS: 'update_promo_success',
    UPDATE_PROMO_FAIL: 'update_promo_fail',
    DELETE_PROMO_SUCCESS: 'delete_promo_success',
    DELETE_PROMO_FAIL: 'delete_promo_fail'
};

export const productsActionType = {
    FETCH_PRODUCTS_SUCCESS: 'fetch_product_success',
    FETCH_PRODUCTS_FAIL: 'fetch_product_fail',
    CREATE_PRODUCTS_SUCCESS: 'create_product_success',
    CREATE_PRODUCTS_FAIL: 'create_product_fail',
    FETCH_CATEGORY_SUCCESS: 'fetch_category_success',
    FETCH_CATEGORY_FAIL: 'fetch_category_fail',
    CREATE_RESET_PRODUCT: 'create_reset_product',
    UPDATE_PRODUCT_STATE: 'update_product_state'
};

export const branchActionType = {
    CREATE_BRANCH_SUCCESS: 'create_branch_success',
    CREATE_BRANCH_FAIL: 'create_branch_fail',
    UPDATE_BRANCH: 'update_branch',
    FETCH_BRANCHES_SUCCESS: 'fetch_branches_success',
    FETCH_BRANCHES_FAIL: 'fetch_branches_fail',
    DELETE_BRANCH_SUCCESS: 'delete_branch_success',
    DELETE_BRANCH_FAIL: 'delete_branch_fail'
};

export const addressActionType = {
    FETCH_PROVINCES_SUCCESS: 'fetch_provinces_success',
    FETCH_PROVINCES_FAIL: 'fetch_provinces_fail',
    FETCH_CITIES_SUCCESS: 'fetch_cities_success',
    FETCH_CITIES_FAIL: 'fetch_cities_fail',
    FETCH_COUNTRIES_SUCCESS: 'fetch_countries_success',
    FETCH_COUNTRIES_FAIL: 'fetch_countries_fail'
};

export const bankDetailsActionType = {
    FETCH_BANK_DETAILS_SUCCESS: 'fetch_bank_details_success',
    FETCH_BANK_DETAILS_FAIL: 'fetch_bank_details_fail',
    UPDATE_BANK_DETAILS_SUCCESS: 'update_bank_details_success',
    UPDATE_BANK_DETAILS_FAIL: 'update_bank_details_fail',
    UPDATE_STATE: 'update_state'
};

export const themeActionType = {
    FETCH_THEME_COLORS_SUCCESS: 'fetch_theme_colors_success',
    FETCH_THEME_COLORS_FAIL: 'fetch_theme_colors_fail',
    FETCH_THEME_SUCCESS: 'fetch_theme_success',
    FETCH_THEME_FAIL: 'fetch_theme_fail',
    UPDATE_THEME_SUCCESS: 'update_theme_success',
    UPDATE_THEME_FAIL: 'update_theme_fail',
    UPDATE_THEME_REDUCER: 'update_theme_reducer'
};

export const atmActionType = {
    CREATE_ATM_SUCCESS: 'create_atm_success',
    CREATE_ATM_FAIL: 'create_atm_fail',
    UPDATE_ATM: 'update_atm',
    FETCH_ATMS_SUCCESS: 'fetch_atms_success',
    FETCH_ATMS_FAIL: 'fetch_atms_fail',
    DELETE_ATM_SUCCESS: 'delete_atm_success',
    DELETE_ATM_FAIL: 'delete_atm_fail'
};
