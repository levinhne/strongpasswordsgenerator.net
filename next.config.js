module.exports = {
    target: 'serverless',
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/generator',
            },
        ]
      },
};