var db=require('./conn')

function usersmodel(){
    this.userregister=function(cnm,data,cb){
        db.collection(cnm).insert(data,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)
        })

    }

    this.logincheck=function(data,cb)
    {
        db.collection('register').find(data[0]).toArray(function(err,result){
            if(err)
                console.log(err)
            else
            console.log(result)
                cb(result)
        })
    }
    this.addTask=function(data,cb){
        db.collection('addtask').insert(data,function(err,result){
            if(err){
                console.log(err)
            }
            else{
                cb(result)
            }
        })
    }

    this.getTask=function(data,cb){
        db.collection('addtask').find(data).toArray(function(err,result){
            if(err){
                console.log(err)
            }
            else{
                cb(result)
            }
        })
    }

    this.completeTask=function(data,cb){
        db.collection('addtask').deleteMany(data,function(err,result){
            if(err){
                console.log(err)
            }
            else{
                cb(result)
            }
        })
    }
}
module.exports=new usersmodel()





