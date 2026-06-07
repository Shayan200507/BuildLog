import { pool } from "./Connection.js";

try{
await pool.query(`
    
    CREATE TABLE IF NOT EXISTS users(
     
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    dob DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    
    
    
    
    `)

console.log("users table ready");

}
catch(error){ console.log(error)}
finally{await pool.end();}




