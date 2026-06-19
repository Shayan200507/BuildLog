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


await pool.query(`
    
    CREATE TABLE IF NOT EXISTS blogs(
    blog_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    
    
    
    
    
    )
    
    `)

console.log("blogs table ready");

await pool.query(`
    
      CREATE TABLE IF NOT EXISTS posts(
      post_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      blog_id INTEGER NOT NULL REFERENCES blogs(blog_id)  ON DELETE CASCADE,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      imgurl TEXT

      
      
      
      
      
      )
    `)    

console.log("posts table ready");

await pool.query(`
    CREATE TABLE IF NOT EXISTS tags(
    tag_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag_title  TEXT UNIQUE NOT NULL

    
    
    
    
    
    )
    
    
    
    
    `)  

console.log("tags table ready");
    
    


 await pool.query(`
     CREATE TABLE IF NOT EXISTS tags_posts(
     post_id  INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
     tag_id INTEGER NOT NULL REFERENCES tags( tag_id) ON DELETE CASCADE,
     PRIMARY KEY (post_id, tag_id)
     
     
     )
    
    `)   

console.log("tags_posts table ready");




await pool.query(`
    
    ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


    ALTER TABLE blogs
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    
    
    
    
    `)

    console.log("time stamp added")














}
catch(error){ console.log(error)}
finally{await pool.end();}




