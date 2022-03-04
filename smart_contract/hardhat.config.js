
require('@nomiclabs/hardhat-waffle')

const ethereum_ropsten_test = 'https://eth-ropsten.alchemyapi.io/v2/Qi1dvsL7iLz0DyF1CnUreQ6RABNWi8vO'
const private_key = ''

module.exports = {
    solidity: "0.8.0",
    networks: {
        ropsten: {
            url: ethereum_ropsten_test,
            accounts: [ private_key ]
        }
    }
};
