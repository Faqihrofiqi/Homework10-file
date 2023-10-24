const Users = require("../models/usersModel");
const router=require("../routes/");
class Controller {

    static home(req, res){
        res.send("<h1>Welcome to my app</h1>");
    }

    static showAll(req, res){
        Users.showAll((err, users) => {
            if(err){
                res.send(err);
            }
            else{
                res.render("showAll", { users });
            }
        });
        
    }

    static addForm(req, res){
        res.render("addForm");
    }

    static addPost(req, res){
        const { email, gender, password, role } = req.body; 
        const objPerson = {
            email,gender,password,role
        }
        Users.addPost(objPerson, (err, users) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/users");
            }
        });

    }

    static editForm(req, res){
        Users.editForm(req.params.id, (err, users) => {
            if(err){
                res.send(err);
            }
            else{
                res.render("editForm", { users } );
            }
        });
        
    }

    static editPost(req, res){
        const { email,gender,password,role } = req.body; 
        const objPerson = {
            email,gender,password,role
        }
        Users.editPost(req.params.id, objPerson, (err, users) => {
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/users");
            }
        });
    }

    static delete(req, res){
        Users.delete(req.params.id,(err,users)=>{
            if (err) {
                res.send(err);
            }
            else{
                res.redirect("/users");
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

module.exports = Controller;