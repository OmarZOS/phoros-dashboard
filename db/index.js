// const Knex = require('knex');
// const knexConfig = require('./websocket-client');
// const knex = Knex(knexConfig[process.env.NODE_ENV]);
const tunnel = require('./sender')


const query = async(dateien, storageDestination = 'sql', requestType = 'record', operationtype = 'raw', ) => {
    var json = {
        request_Type: requestType,
        destination: storageDestination,
        operation: operationtype,
        data: dateien
    }
    const received = await tunnel.sendToStorageServer(json)
        // console.log("Got this:" + received)
        // console.log("Maybe this:" + received)
    return received
}

module.exports = { query };