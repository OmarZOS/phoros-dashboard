const tableName = process.env.MAIN_TABLE;

var schema = require('./schema')
var schemaModel = null
var dateien = null
var dailyDateien = null




const getModel = async() => {
    if (schemaModel)
        return schemaModel
    const model = await
    schema.getSchemaDetails(tableName)
    console.log("model?")
        // console.log(model['table'])
    schemaModel = model['table']
    return model['table']
}


const queryData = async(tableName, params) => {
    if (dailyDateien)
        return dailyDateien;
    let curr = await schema.getData(tableName, params)
    dailyDateien = schema.groupBy(curr.data, x => (x.DATE_DAILY_DATA).toString().substring(11, 15), 'VOLUME')
    return dailyDateien;
}

const currentData = async(tableName, params) => {
    console.log("Auf der suche nach Dateien")
    if (dateien)
        return dateien
    const currentData = await schema.getData(tableName, params)
    dateien = currentData['data']
    return dateien;
}

module.exports = {
    tableName,
    getModel,
    currentData,
    queryData
}