
const generateCustomerTokenCustom = require('./resolver/createCustomerTokenCustom');
const generateCustomerTokenCustomOtp = require('./resolver/createCustomerTokenCustomOtp');
const revokeCustomerToken = require('./resolver/revokeCustomerToken');
const updateCartItems = require('./resolver/updateCartItems');
const removeItemFromCart = require('./resolver/removeItemFromCart');
const mergeCarts = require('./resolver/mergeCarts');
const addSimpleProductsToCart = require('./resolver/addSimpleProductsToCart');
const addConfigurableProductsToCart = require('./resolver/addConfigurableProductToCart');
const addProductToWishlist = require('./resolver/addProductToWishlist');
const removeItemWishlist = require('./resolver/removeItemWishlist');
const updateCustomer = require('./resolver/customer/updateCustomer');
const changeCustomerPassword = require('./resolver/customer/changeCustomerPassword');
const createCustomerAddress = require('./resolver/customer/createCustomerAddress');
const updateCustomerAddress = require('./resolver/customer/updateCustomerAddress');
const setShippingAddressesOnCart = require('./resolver/checkout/setShippingAddressesOnCart');
const setBillingAddressOnCart = require('./resolver/checkout/setBillingAddressOnCart');
const setGuestEmailOnCart = require('./resolver/checkout/setGuestEmailOnCart');
const setPaymentMethodOnCart = require('./resolver/checkout/setPaymentMethodOnCart');
const setShippingMethodsOnCart = require('./resolver/checkout/setShippingMethodsOnCart');
const placeOrder = require('./resolver/checkout/placeOrder');
const applyCouponToCart = require('./resolver/checkout/applyCouponToCart');
const removeCouponFromCart = require('./resolver/checkout/removeCouponFromCart');
const applyStoreCreditToCart = require('./resolver/checkout/applyStoreCreditToCart');
const removeStoreCreditFromCart = require('./resolver/checkout/removeStoreCreditFromCart');
const applyGiftCardToCart = require('./resolver/checkout/applyGiftCardToCart');
const removeGiftCardFromCart = require('./resolver/checkout/removeGiftCardFromCart');
const readNotification = require('./resolver/notification/readNotification');
const createCustomerCustom = require('./resolver/createCustomerCustom');


module.exports = {
    generateCustomerTokenCustom,
    generateCustomerTokenCustomOtp,
    addSimpleProductsToCart,
    addConfigurableProductsToCart,
    revokeCustomerToken,
    updateCartItems,
    removeItemFromCart,
    mergeCarts,
    addProductToWishlist,
    removeItemWishlist,
    updateCustomer,
    changeCustomerPassword,
    createCustomerAddress,
    updateCustomerAddress,
    setBillingAddressOnCart,
    setGuestEmailOnCart,
    setPaymentMethodOnCart,
    setShippingAddressesOnCart,
    setShippingMethodsOnCart,
    placeOrder,
    applyCouponToCart,
    removeCouponFromCart,
    applyStoreCreditToCart,
    removeStoreCreditFromCart,
    applyGiftCardToCart,
    removeGiftCardFromCart,
    readNotification,
    createCustomerCustom,
};