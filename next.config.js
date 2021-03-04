module.exports = {
    target: 'serverless',
    async rewrites() {
        return [
            {
                source: '/password-generator',
                destination: '/',
            },
        ]
      },
};