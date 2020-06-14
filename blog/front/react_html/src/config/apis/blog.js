const blogController = () => {
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
        },
        create:{
            method: "post",
            url: `/api/blog/new`,
            intercept: true
        },
        update:{
            method: "post",
            url: `/api/blog/update`,
            intercept: true
        },
        del:{
            method: "post",
            url: `/api/blog/del`,
            intercept: true
        }
    };
};
export default blogController;