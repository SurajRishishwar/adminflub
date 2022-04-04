const usersdata = require('../modal/users');
const worker =require('../modal/workerauth');
const userquery = require('../modal/userwastequery');
const admin=require('../modal/adminauth');
const workerquery = require('../modal/workerassign');
const regbyadmin = require('../modal/regbyadmin');


module.exports.adminhome=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/admin');
    }
    return res.render('signin',{
        title:"Admin | Sign In"
    });
}


module.exports.aflog=function(req,res){
    return res.render('adminhome',{
        title:"Admin"
    });
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/admin');
    }
    return res.render('signup',{
        title:"Admin | Sign Up"
    });
}

module.exports.createuser=function(req,res){
    if(req.body.password != req.body.confirmpassword){
        console.log('password not matched');
    }
    admin.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in sign up');return;}
        if(!user){
            admin.create(req.body,function(err,user){
                if(err){console.log('Error in create new user');return;}
                else{
                  console.log('created success');
                }
            });
            return res.redirect('/'); 
        }
        else{ 
            console.log('email alredy in use');
            return res.redirect('/');
        }
    });
}

module.exports.createsession=function(req,res){
  
       
        return res.redirect('/admin');
    
}


module.exports.assignworker=function(req,res){
    console.log(req.body.queryid);
    userquery.findByIdAndUpdate(req.body.queryid,{"status":"a"},function(err){
        if(err){
            console.log('Error in updating from DB',err);
            return;
        }
        else{
            console.log("updated");
            return;
        }
    });
    
    
    workerquery.create({
        userid:req.body.userid,
        queryid:req.body.queryid,
        workerid:req.body.workerid
    });
    return res.redirect('/userqueries');
    // userquery.findByIdAndDelete(req.body.queryid,function(err){
    //     if(err){
    //         console.log('Not Deleted');
    //     }
    //     return res.redirect('/usersquery');
    // });
}

module.exports.workerquery=function(req,res){
    workerquery.find({}).populate('userid').populate('queryid').exec(function(err,workerquery){
        if(err){
            console.log('Error in Fetching Contact from DB',err);
            return;
        }
        return res.render('workerquery',{
            title:"Workers Query",
            query:workerquery
        });
    });
}

module.exports.regauser=function(req,res){
    return res.render('reguser',{
        title:"User Registration",
    });
}

module.exports.reguser=function(req,res){
    regbyadmin.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in sign up');return;}
        if(!user){
            let email=req.body.email;
            let phone=req.body.phone;
            let password=email.slice(0,3)+phone.slice(5,9);

            let houseno=req.body.houseno.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
            let address=req.body.address.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
            let ward=req.body.ward;
            let uhn='GWL'+ward+address.slice(0,5)+houseno;
            let uuhn=uhn.toUpperCase();
            console.log(houseno);
            regbyadmin.create({
                name:req.body.name,
                email:email,
                password:password,
                phone:phone,
                houseno:houseno,
                street:address,
                ward:ward,
                uhn:uuhn


            });
            return res.redirect('back'); 
        }
        else{ 
            console.log('email alredy in use');
            return res.redirect('back');
        }
    });
}

module.exports.userdetails=function(req,res){
    regbyadmin.find({},function(err,alluser){
      if(err){
          console.log('Error in Fetching Contact from DB');
          return;
      }
      return res.render('userdetails',{
          title:"User Details",
          user:alluser
      });
    })
}
module.exports.userdetails2=function(req,res){
  usersdata.find({},function(err,alluser){
    if(err){
        console.log('Error in Fetching Contact from DB');
        return;
    }
    return res.render('userdetails2',{
        title:"User Details 2",
        user:alluser
    });
  })
}

module.exports.workerdetails=function(req,res){
    worker.find({},function(err,allworker){
        if(err){
            console.log('Error in Fetching Contact from DB');
            return;
        }
        return res.render('workerdetails',{
            title:"Workers Details",
            user:allworker
        });
        
        
    });
}

module.exports.admindetails=function(req,res){
    admin.find({},function(err,alladmin){
        if(err){
            console.log('Error in Fetching Contact from DB');
            return;
        }
        return res.render('admindetails',{
            title:"Admin Details",
            user:alladmin
        });
        
        
    });
}

module.exports.userqueries= async function(req,res){
    query= await userquery.find({}).populate('user').exec();

    
        console.log(query);
        return res.render('userquery',{
            title:"Users Query",
            user:query
        });
        
        
    
}

module.exports.assignadmin=function(req,res){
    console.log(req.body.adminid);
    console.log(req.body.id);
    admin.findByIdAndUpdate(req.body.id,{"adminid":req.body.adminid},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    return res.redirect('back');

}
module.exports.createworker=function(req,res){
  
    worker.findByIdAndUpdate(req.body.id,{"workerid":req.body.workerid},function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    return res.redirect('back');

}



module.exports.logout = function(req,res){
    req.logout();
    return res.redirect('/');
}