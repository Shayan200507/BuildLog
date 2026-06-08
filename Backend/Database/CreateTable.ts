import { pool } from "./Connection.ts";

try{
await pool.query(`
    
    CREATE TABLE IF NOT EXISTS users(
     
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
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




