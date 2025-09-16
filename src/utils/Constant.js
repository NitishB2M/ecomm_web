const L_USER_BASE_URL = process.env.L_USER_BASE_URL
const L_PRODUCT_BASE_URL = process.env.L_PRODUCT_BASE_URL
const L_CART_BASE_URL = process.env.L_CART_BASE_URL
const L_ORDER_BASE_URL = process.env.L_ORDER_BASE_URL
const L_PAYMENT_BASE_URL = process.env.L_PAYMENT_BASE_URL

const USER_BASE_URL = process.env.USER_BASE_URL
const PRODUCT_BASE_URL = process.env.PRODUCT_BASE_URL
const CART_BASE_URL = process.env.CART_BASE_URL
const ORDER_BASE_URL = process.env.ORDER_BASE_URL
const PAYMENT_BASE_URL = process.env.PAYMENT_BASE_URL

const API_ENDPOINTS = {
  // auth
  LOGIN_USER: L_USER_BASE_URL + '/auth/login',
  REGISTER_USER: L_USER_BASE_URL + '/auth/register',
  DELETE_ACCOUNT: L_USER_BASE_URL + '/auth/delete-account',
  ACTIVATE_ACCOUNT: L_USER_BASE_URL + '/auth/activate-account/',
  DEACTIVATE_ACCOUNT: L_USER_BASE_URL + '/auth/deactivate-account/',
  PASSWORD_RESET: L_USER_BASE_URL + '/auth/password-reset',
  PASSWORD_RESET_REQUEST: L_USER_BASE_URL + '/auth/password-reset-request',
  SEND_VERIFICATION_EMAIL: L_USER_BASE_URL + '/auth/email-verification/request',
  EMAIL_VERIFICATION: L_USER_BASE_URL + '/auth/email-verification/',

  // user
  GET_USER_PROFILE: L_USER_BASE_URL + '/profile',
  UPDATE_USER_PROFILE: L_USER_BASE_URL + '/profile/update',
  // user-role
  GET_USER_ROLES: L_USER_BASE_URL + '/role/list',
  ADD_USER_ROLE: L_USER_BASE_URL + '/role/add',
  UPDATE_USER_ROLE: L_USER_BASE_URL + '/role/update',
  DELETE_USER_ROLE: L_USER_BASE_URL + '/role/delete/',
  SWITCH_USER_ROLE: L_USER_BASE_URL + '/role/switch-role',
  REVOKE_USER_ROLE: L_USER_BASE_URL + '/role/revoke-role',
  REVIEW_USER_ROLE: L_USER_BASE_URL + '/role/review-role',
  REQUEST_USER_ROLE: L_USER_BASE_URL + '/role/request-role',

  // address
  GET_USER_ADDRESSES: L_USER_BASE_URL + '/address/list',
  ADD_USER_ADDRESS: L_USER_BASE_URL + '/address/add',
  UPDATE_USER_ADDRESS: L_USER_BASE_URL + '/address/update',
  DELETE_USER_ADDRESS: L_USER_BASE_URL + '/address/delete/',
  SET_PRIMARY_ADDRESS: L_USER_BASE_URL + '/address/set-primary/',

  // Public Routes
  GET_ALL_PRODUCTS: L_PRODUCT_BASE_URL + '/list',
  GET_PRODUCT_CATEGORIES: L_PRODUCT_BASE_URL + '/categories',
  GET_FILTERED_PRODUCTS: L_PRODUCT_BASE_URL + '/filter',
  GET_PRODUCT_GREAT_DEALS: L_PRODUCT_BASE_URL + '/deals',
  GET_FEATURED_PRODUCTS: L_PRODUCT_BASE_URL + '/featured',
  GET_PRODUCT_OFFERS: L_PRODUCT_BASE_URL + '/offers',

  // Product Item Routes
  GET_PRODUCT_BY_ID: L_PRODUCT_BASE_URL + '/item/:id',
  GET_PRODUCT_FOR_CART: L_PRODUCT_BASE_URL + '/add-cart/:id',
  ADD_TO_WISHLIST: L_PRODUCT_BASE_URL + '/add-wishlist/:id',

  // Seller Routes
  ADD_PRODUCT: L_PRODUCT_BASE_URL + '/seller/add',
  UPDATE_PRODUCT: L_PRODUCT_BASE_URL + '/seller/update/:id',
  DELETE_PRODUCT: L_PRODUCT_BASE_URL + '/seller/delete/:id',
  GET_SELLER_PRODUCTS: L_PRODUCT_BASE_URL + '/seller/manage',
  UPLOAD_PRODUCT_IMAGE: L_PRODUCT_BASE_URL + '/seller/:id/image-upload',
  UPDATE_PRODUCT_QUANTITY: L_PRODUCT_BASE_URL + '/seller/:id/update-quantity',

  // cart
  GET_USER_CART: L_CART_BASE_URL + '/list',
  ADD_TO_CART: L_CART_BASE_URL + '/add/:pid',
  REMOVE_FROM_CART: L_CART_BASE_URL + '/remove/:id',
  UPDATE_CART_QUANTITY: L_PRODUCT_BASE_URL + '/:pid/update/qty',
  CLEAR_CART: L_CART_BASE_URL + '/clear',
  DELETE_CART_ITEM: L_CART_BASE_URL + '/delete/:id',
}

const UNAUTHORIZED_ROUTES = [
  { path: '/auth/login', name: 'Login' },
  { path: '/auth/register', name: 'Register' },
]

const PUBLIC_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
}

const ROLE_ROUTES = {
}

const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const IDLE_TIMEOUT = 60 * 60 * 1000

const Constants = {
  UNAUTHORIZED_ROUTES,
  API_ENDPOINTS,
  PUBLIC_ROUTES,
  ROLE_ROUTES,
  EMAIL_REGEX,
  IDLE_TIMEOUT
}

export default Constants;