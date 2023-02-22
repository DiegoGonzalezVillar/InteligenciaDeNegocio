import sql from 'mssql'
const {db} = require('../config')

const dbSettings = {
    user : db.user,
    password: db.password,
    server: db.server,
    database: db.database,
    database2: db.database2,
    database3: db.database3,
    options:{
        trustServerCertificate: true,
        encrypt: false
    }
}


export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch (error) {
        console.error(error)
    }
}

export {sql}

