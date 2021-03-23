module.exports = {
    rewrites() {
        return [
            {
                source: "/:hash-hash-generator",
                destination: "/hash-generator/:hash",
            }
        ];
    }
};
  