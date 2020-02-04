module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        test: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        }
    },
    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.16",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    }
};
