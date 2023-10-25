const express = require("express");
const routers = require("./routes");
const PORT = 3000;
const app = express();
const multer =require('multer');

//untuk menambahkan path
const path=require('path');
const pool = require("./config/connection");
app.use('/upload',express.static(path.join(__dirname,'upload')));

//menentukan lokasi pengunggahan
const diskStorage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,path.join(__dirname,'upload'));
    },
    filename:function (req,file,cb) {
        cb(
            null,
            file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        );
    },
});

app.post(
    "/contact/upload/:id",
    multer({
        storage:diskStorage
    }).single("photo"),
    (req,res)=>{
        const file =req.file.path;
        console.log(file);
        if (!file) {
            res.status(400).send({
                status:false,
                data:"No File is Selected.",
            });
        }else{
            var insertData='update movies set photo = $1 where id =$2'
            pool.query(insertData,[file,req.params.id], (err,res)=>{
                if (err) {
                    throw err
                    console.log("file uploaded")
                }
            })
        }
        //menyimpan lokasi upload data contact pada index yang diinginkan
        // contacts[req.query.index].photo=req.file.path;
        res.send(file);
        res.send(console.log("file uploaded"));
    }
)

app.set("view engine", "ejs");

app.use(express.urlencoded( { extended: false }));

app.use(routers);

app.listen(PORT, ()=>{
    console.log(`APPS berjalan di ${PORT}`);
});