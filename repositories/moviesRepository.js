const {Movies}=require('../models');

module.exports={
    create(args){
        return Movies.create(args);
    },
    update(id,args){
        return Movies.update(args,{
            where:{
                id,
            },
            paranoid:false,
        });
    }
}