
//var User = require('./users.json'); 
const localStrategy = require('passport-local').Strategy;
const fs = require('fs');
const db = require('./databaseFunctions');

module.exports = function(passport){
    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function(username, password, done){
            console.log("Authenticating");
            var user = await db.retrieveUser(username, password);

            if(user){
                done(null, user);
            }
            else{
                done(null, false);
            }
            // fs.readFile('users.json', 'utf8', function readFileCallBack(err,data){
            //     if(err) {console.log(err);}
            //     else{
            //         try{
            //             var parseJson = JSON.parse(data).users;
            //         }catch(error){
            //             console.log(error);
            //         }
            //         for(i = 0; i < parseJson.length; i++){
            //             var user = parseJson[i];
            //             if(user.email == username && user.password == password){
            //                 done(null, user)
            //                 return;
            //             }
            //         }
            //         done(null, false);
            //     }
            // });

        })
    )

    passport.serializeUser((user, done) => {
        console.log("in serialize");
        return done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        console.log("In deserialize");
        console.log(id);
        db.findById(id).then((user) => {
            console.log("User");
            console.log(user)
            return done(null, user);
        })
        .catch(err => 
            done(null, false));
    })
}