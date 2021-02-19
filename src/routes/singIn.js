const user= require('../models/user');
const express = require('express');
const router = express.Router();
const userSession = require('../models/userSession');


router.post('/api/account/register', (req, res, next) => {
   
     const {
        name,
        email,
        password,
        phone  
     } = req.body;

     if(!name){
        return res.status(422).json({
            success: false,
            messege: 'Error: name can not be blank.'
         });
     }

     if(!email){
       return res.status(422).json({
           success: false,
           messege: 'Error: email can not be blank.'
        });
    }

    if(!password){
      return res.status(422).json({
           success: false,
           messege: 'Error: password can not be blank.'
        });
    }

    if(!phone){
      return res.status(422).json({
           success: false,
           messege: 'Error: phone can not be blank.'
        });
    }
    
    console.log("here");

    // email = email.toLowerCase();
    
    //verify
    user.find({
      email
    }, (err, previousUsers) => {
        if (err){
           return res.status(400).json({
           success: false,
           messege: 'Error: Server error.'  
        });
        } else if (previousUsers.length>0){
            return res.status(400).json({
              success: false,
                messege: 'Error: Account already exist.'
            });
        }
        //save
        let newUser = new user();

        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.phone = phone;
        newUser.save().then(user => {
            return res.status(201).json({
                success: true,
                messege: 'SingUP'
            });
        }).catch(err => {
            console.log("error" , err)
            return res.status(400).json({
                 success: false,
                 messege: 'Error: It can not be blank.'
             });
        })
    })
});


router.post('/api/account/singin', (req, res, next) => {
   
    const {
       email,
       password, 
    } = req.body;


    if(!email){
        return res.status(422).json({
            success: false,
            messege: 'Error: email can not be blank.'
         });
     }
 
     if(!password){
       return res.status(422).json({
            success: false,
            messege: 'Error: password can not be blank.'
         });
     }

     console.log("here");

     user.find({
        email
      }, (err, users) => {
          if (err){
             return res.status(400).json({
             success: false,
             messege: 'Error: Server error.'  
          });
          } else if ( users.length != 1){
              return res.status(400).json({
                success: false,
                  messege: 'Error: Invalid.'
              });
          }

          const user = users[0];
          if(!user.validPassword(password)){
            return res.status(400).json({
                success: false,
                  messege: 'Error: Invalid.'
              }); 
          }
        
          let newUserSession = new userSession();
          newUserSession.userId=user._id;
          newUserSession.save().then((doc, user) => {
            return res.status(201).json({
                success: true,
                messege: 'SingIn Valid',
                token: doc._id
            });
        }).catch(err => {
            console.log("error" , err)
            return res.status(400).json({
                 success: false,
                 messege: 'Error: server error.'
             });
        })

    })

});


router.get('/api/account/verify', (req, res, next) => {
       //get the token
       const { query } = req;
       const { token } = query;
       //token test

       //token verify and it is not deleted
       userSession.find({
           _id: token,
           isDeleted: false
       },(err, sessions) => {
           if (err){
            return res.status(400).json({
                success: false,
                messege: 'Error: server error.'
            }); 
           } else if(sessions.length != 1){
            return res.status(400).json({
                success: false,
                messege: 'Error: Invalid.'
            });  
           } else {
            return res.status(201).json({
                success: true,
                messege: 'Good'
            }); 
           }

       });
});


router.get('/api/account/logout/:token', (req, res, next) =>{
        //get the token
      
        const  token  = req.params.token;

       // console.log("Req" , token)
        //token test
 
        //token verify and it is not deleted
        userSession.findOneAndUpdate({
            _id: token
        },{isDeleted:true}).then((result) =>{
            return res.status(201).json({
                success: true,
                messege: 'Good',
            }); 
        }).catch(err => {
            console.log("Error in usersession" , err)
            return res.status(400).json({
                success: false,
                messege: 'Error: server error.'
            });
        })
});


module.exports = router;