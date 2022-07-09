const Knex = require('knex');
const knexConfig = require('../db/knexfile');
const knex = Knex(knexConfig.production);
getFullSchema = async() => {

    const [schema] = await knex.raw('information_schema.tables')
        .select("NAME")
        .where({ 'table_schema': process.env.DATABASE_NAME });

    // console.log(schema);
    if (!schema) {
        return null;
    }

    console.log("found schema");

    return {
        schema
        // id: user.ID_USER,
        // username: user.NOM_USER + " " + user.PRENOM_USER,
        // created_at: user.CREATED_AT,
    };
}

getSchemaDetails = async(tableName) => {

    const [table] = await knex.raw("DESC " +
        tableName + ";");

    console.log(table);

    if (!table) {
        return null;
    }


    console.log("found schema details");

    var data = {}

    //casting it to k/v pairs
    for (var i = 0; i < table.length; i++) {
        // if (table[i].Extra != "")
        //     continue;
        console.log(table[i].Field)
        var { Field, ...obj } = table[i]
        data[table[i].Field] = obj
    }
    console.log("data")
    console.log(data)

    return {
        table: data
    };
}


getData = async(tableName, params) => {

    console.log("Getting data")
    const data = await knex(tableName)
        .select()
        .where(params);

    // console.log(data);
    if (!data) {
        return null;
    }

    console.log("found data");

    return {
        data: data
    };
}

getAnalyticData = async(query) => {

    console.log("Getting data")
    const data = await knex.raw(query)

    // console.log(data);
    if (!data) {
        return null;
    }

    console.log("found data");

    return {
        data: data
    };
}

var clearAutoIncrement = (obj) => {
    return !(obj['Extra'] == 'auto_increment')
}
const groupBy = (list, keyGetter, summable) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collectable = map.get(key);
        if (!collectable) {
            map.set(key, item[summable]);
        } else {
            map.set(key, item[summable] + collectable);
        }
    });
    return map;
}


module.exports = {

    getFullSchema,
    getSchemaDetails,
    getData,
    clearAutoIncrement,
    getAnalyticData,
    groupBy: groupBy
}