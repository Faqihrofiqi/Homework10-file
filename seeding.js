const pool = require("./config/connection");
const fs = require("fs");

fs.readFile("./users.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    }
    else{
        data = JSON.parse(data);

        for(let i = 0; i < data.length; i++){
            let query = `
                INSERT INTO "users" ("email", "gender", "password", "role") VALUES ($1, $2, $3, $4);
            `;

            let arrData = [data[i].email, data[i].gender, data[i].password, data[i].role];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    throw err;
                }
                else{
                    console.log(`${data[i].email} sudah masuk datanya..`);
                    
                }
            });
        }

        pool.end();
    }
})