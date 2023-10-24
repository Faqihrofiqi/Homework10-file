const express = require("express");
const routers = require("./routes");
const PORT = 3000;
const app = express();
const multer =require('multer');

//untuk menambahkan path
const path=require('path');
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
    "/contact/upload",
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
        }
        //menyimpan lokasi upload data contact pada index yang diinginkan
        // contacts[req.query.index].photo=req.file.path;
        res.send(file);
    }
)
app.post('/file_upload', upload.single('example'), (req, res, next) => {
    // req.file is the `example` file or whatever you have on the `name` attribute: <input type="file" name="example" />
    // I believe it is a `Buffer` object.
    const encoded = req.file.buffer.toString('base64')
    console.log(encoded)
  })

app.set("view engine", "ejs");

app.use(express.urlencoded( { extended: false }));

app.use(routers);

app.listen(PORT, ()=>{
    console.log(`APPS berjalan di ${PORT}`);
});