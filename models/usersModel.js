const pool = require("../config/connection");

class Users {
    constructor(id, email,gender,password,role){
        this.id = +id;
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.role = role;
    }

    static showAll(callback){
        let query = `SELECT * FROM "users";`;

        pool.query(query, (err, users) => {
            if(err){
                callback(err, null);
            }
            else{

                users= users.rows.map(users => new Users(users.id, users.email,users.gender,users.password,users.role));

                console.log(users);

                console.log("SHOW DATA");
                callback(null, users)
            }
        });
        
    }

    static addPost(objPerson, callback){
        let query = `
                INSERT INTO "users" ("email", "gender", "password", "role") VALUES ($1, $2, $3, $4);
            `;

            let arrData = [objPerson.email, objPerson.gender, objPerson.password, objPerson.role];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.email} sudah masuk datanya..`);
                    callback(null, null);
                }
            });
    }

    static editForm(id, callback){
        let query = `SELECT * FROM "users" WHERE id = ${+id};`;

        pool.query(query, (err, users) => {
            if(err){
                callback(err, null);
            }
            else{
                // * instantiate
                console.log(users.rows[0]);
                console.log("SHOW DATA");
                callback(null, users.rows[0]);
            }
        });

    }

    static editPost(id, objPerson, callback){
        let query = `
            UPDATE "users" SET "email" = $1, "gender" = $2, "password" = $3, "role" = $4 WHERE "id" = ${+id};
            `;

            let arrData = [objPerson.email, objPerson.gender, objPerson.password, objPerson.role];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.email} sudah di update datanya..`);
                    callback(null, null);
                }
            });
    }

    static delete(id,callback){
        let query = `
                DELETE FROM "users" WHERE "id" = ${+id};
            `;
            pool.query(query, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(` id ${+id} sudah dihapus..`);
                    callback(null, null);
                }
            })    
    }
}

module.exports = Users;