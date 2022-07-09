const tableName = "DAILY_DATA";
var schema = require('./schema')

const getModel = async() => {
    const model = await
    schema.getSchemaDetails(tableName)
        // .then((response) => response.json()) //2
        // .then((mdl) => mdl);
    console.log("model?")
    console.log(model['table'])

    return model['table']
}

// model = model.values().filter(schema.clearAutoIncrement)

// getFreshData = async(params) => {
//     console.log("getting main table data")
//     return await schema.getData(tableName, params)
// }

const currentData = async(tableName, params) => {
    console.log("Auf der suche nach Dateien")
    const currentData = await schema.getData(tableName, {})
    return currentData['data'];
}




module.exports = {
    tableName,
    getModel,
    currentData
}