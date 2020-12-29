export default (user = {}, action) => {
    switch (action.type) {
        case 'USER_SIGNIN':
            return { userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {};
        default: 
            return user;
    }
}