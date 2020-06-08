const userController = $api_root => {
    return {
        login: {
            method: "post",
            url: `/api/user/login`,
            intercept: true
        }
    };
};
export default userController;