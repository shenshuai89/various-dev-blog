const blogController = $api_root => {
    return {
        getLists: {
            method: "get",
            url: `/api/blog/list`,
            intercept: true
        },
        detail: {
            method: "get",
            url: `/api/blog/detail`,
            intercept: true
        }
    };
};
export default blogController;