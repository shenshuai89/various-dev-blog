// 公共变量
const com = {
    isOpenCdn: true,
    ROOTAPI: "'/'"
};

module.exports = {
    // 开发环境变量
    dev: {
        env: {
            TYPE: JSON.stringify('dev'),
            CDNPATH: '"/"',
            HOMEPATH: '"https://127.0.0.1:8000"',
            ...com
        }
    },
    // 生产环境变量
    prod: {
        env: {
            TYPE: JSON.stringify('prod'),
            CDNPATH: '"https://cdn.bootcss.com"',
            HOMEPATH: '"https://*****"',
            ...com
        }
    }
}