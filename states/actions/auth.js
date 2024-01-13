export const login = (userInfo) => {
    return {
        type: 'LOGIN',
        ...userInfo
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};