const pool = require("../config/connection");

class Movies {
    constructor(id, title,genres,year){
        this.id = +id;
        this.title = title;
        this.genres= genres;
        this.year = year;
    }

    static showAll(callback){
        let query = `SELECT * FROM "movies";`;

        pool.query(query, (err, movies) => {
            if(err){
                callback(err, null);
            }
            else{

                movies= movies.rows.map(movies => new Movies(movies.id, movies.title,movies.genres,movies.year));

                console.log(movies);

                console.log("SHOW DATA");
                callback(null, movies)
            }
        });
        
    }

    static addPost(objPerson, callback){
        let query = `
                INSERT INTO "movies" ("title", "genres", "year") VALUES ($1, $2, $3);
            `;

            let arrData = [objPerson.title, objPerson.genres, objPerson.year];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.title} sudah masuk datanya..`);
                    callback(null, null);
                }
            });
    }

    static editForm(id, callback){
        let query = `SELECT * FROM "movies" WHERE id = ${+id};`;

        pool.query(query, (err, movies) => {
            if(err){
                callback(err, null);
            }
            else{
                // * instantiate
                console.log(movies.rows[0]);
                console.log("SHOW DATA");
                callback(null, movies.rows[0]);
            }
        });

    }

    static editPost(id, objPerson, callback){
        let query = `
            UPDATE "movies" SET "title" = $1, "genres" = $2, "year" = $3 WHERE "id" = ${+id};
            `;

            let arrData = [objPerson.title, objPerson.genres, objPerson.year];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.title} sudah di update datanya..`);
                    callback(null, null);
                }
            });
    }

    static delete(id,callback){
        let query = `
                DELETE FROM "movies" WHERE "id" = ${+id};
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

module.exports = Movies;