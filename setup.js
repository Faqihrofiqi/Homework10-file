const pool = require("./config/connection");

const dropTable = `
    DROP TABLE IF EXISTS "users";
`;

const queryTable = `
    CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(50) NOT NULL,
        "gender" VARCHAR(50) NOT NULL,
        "password" INTEGER NOT NULL,
        "role" VARCHAR(20) NOT NULL
    );
`;

pool.query(dropTable, (err, result) => {
    if(err){
        throw err;
    }
    else{
        console.log("DROP TABLE")
        pool.query(queryTable, (err, result) => {
            if(err){
                throw err;
            }
            else{
                console.log("CREATE TABLE");
                pool.end();
            }
        });
    }
});