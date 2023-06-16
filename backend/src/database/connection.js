import sql from 'mssql'
const {db, oracleDb} = require('../config')
const oracle = require('oracledb');


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

const oracleDbSettings = {
  user: oracleDb.user,
  password: oracleDb.password,
  connectString: `${oracleDb.server}:${oracleDb.port}/${oracleDb.service}`
};

export async function getOracleConnection() {
  try {
    const pool = await oracle.getConnection(oracleDbSettings);
    console.log(pool)
    return pool;
  } catch (err) {
    console.error(err);
  }
}

export {sql}

