module.exports = {
    target: 'serverless',
    async rewrites() {
        return [
            // {
            //     source: '/',
            //     destination: '/generator',
            // },
            // {
            //     source: '/hash',
            //     destination: '/hash/md5',
            // },
        ]
    },
};