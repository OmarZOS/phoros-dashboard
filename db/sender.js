const ws = require('ws')
const url = `ws://${process.env.storageServer_HOST}:${process.env.storageServer_PORT}`
const mywsServer = new ws.WebSocket(url)

//Sending message from client
async function sendMsg(dateien) {
    const text = JSON.stringify(dateien)
    mywsServer.send(text)

    const result = await new Promise(function(resolve) {
        request.resolve = resolve;

        setTimeout(() => {
            reject(new Error('Timeout')); // or resolve({action: "to"}), or whatever
        }, 5000);
    });

}

mywsServer.onmessage = async function(event) {
    // console.log(event)

    console.log(data)

    // return JSON.parse(JSON.parse(JSON.stringify(data))).content
    // msgGeneration(data, "Server")
}



// var XMLHttpRequest = require('xhr2');

// // // json = { 'username': 'Olivia', 'password': '123' }
// // var json = {
// //     "request_Type": "record",
// //     "destination": "sql",
// //     "operation": "select",
// //     "data": [{
// //         "table": ["BAC"],
// //         "attribut_Select": ["*"],
// //         "attribut": ["NOM_BAC"],
// //         "valeur": ["BAC01"],
// //         "condition": ["="]
// //     }]
// // }

// var sendToStorageServer = async(json) => {

//     var xhr = new XMLHttpRequest();
//     var data = JSON.stringify(json);

//     console.log("Sending:")
//     console.log(data)

//     xhr.onreadystatechange = function(event) {
//         if (xhr.readyState === 4) {
//             const statusCode = xhr.status;
//             const responseText = xhr.responseText;
//             console.log(statusCode);
//             console.log(responseText);
//             console.log(JSON.parse(JSON.parse(JSON.stringify(responseText))).content);
//             return JSON.parse(JSON.parse(JSON.stringify(responseText))).content
//         }
//     }

//     xhr.open('POST', `http://localhost:4040/`, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(data);

// }

// // sendToStorageServer(json)




module.exports = {
    sendToStorageServer: sendMsg,
}