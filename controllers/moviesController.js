const Movies = require("../models/moviesModel");
const router=require("../routes");
class moviesController {

    static home(req, res){
        res.send("<h1>Welcome to my app</h1>");
    }

    static showAll(req, res){
        Movies.showAll((err, movies) => {
            if(err){
                res.send(err);
            }
            else{
                res.render("showAll", {movies });
            }
        });
        
    }

    static addForm(req, res){
        res.render("addForm");
    }

    static addPost(req, res){
        const {title,genres,year } = req.body; 
        const objPerson = {
            title,genres,year
        }
        Movies.addPost(objPerson, (err, movies) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/movies");
            }
        });

    }

    static editForm(req, res){
        Movies.editForm(req.params.id, (err, movies) => {
            if(err){
                res.send(err);
            }
            else{
                res.render("editForm", { movies } );
            }
        });
        
    }

    static editPost(req, res){
        const { title,genres,year } = req.body; 
        const objPerson = {
            title,genres,year
        }
        Movies.editPost(req.params.id, objPerson, (err,movies) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/movies");
            }
        });
    }

    static delete(req, res){
        Movies.delete(req.params.id,(err,movies)=>{
            if (err) {
                res.send(err);
            }
            else{
                res.redirect("/movies");
            }
        })

    }

}

// router.get("/", Controller.showAll);

// router.get("/add", Controller.addForm);
// router.post("/add", Controller.addPost);

// router.get("/:id/edit", Controller.editForm);
// router.post("/:id/edit", Controller.editPost);

// router.get("/:id/delete", Controller.delete);

module.exports = moviesController;