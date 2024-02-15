module.exports = {

  networks: {
    development: {
      networkCheckTimeout: 100000,
      host: "52.64.129.151",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',

  compilers: {
    solc: {
     version:'0.8.2',
     optimizer:{
       enabled:'true',
       runs: 200
     }
    }
  },

};
