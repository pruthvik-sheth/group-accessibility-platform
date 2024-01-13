const authReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                profilePicture: action.profilePicture
            };

        case 'LOGOUT':
            return {};

        default:
            return state;
    }
};

export default authReducer;