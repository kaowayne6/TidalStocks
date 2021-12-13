var sqlite3 = require("sqlite3").verbose(); //npm install sqlite3
const bcrypt = require("bcryptjs");
const util = require("util");

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database("./Database/tidalDB.sqlite3", (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    bcrypt.hashSync("A String", 10);
    //Successful database connection
    console.log("Database Connected!");
  }
});

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

//Retreive boolean on whether email is used
let checkEmailUsed = (email) => {
  var getEmailSql = "SELECT email FROM users WHERE email = ?";
  db.get(getEmailSql, [email], (err, row) => {
    if (err) return console.error(err.message);
    if (row) {
      return true;
    }
    return false;
  });
};

//Retrieve by ID (used for session)
/*], (err, row) => {
		if(err)
			return console.error(err.message);
		if(row){
			return row;
		}
		return null;
	}*/
let findById = async (id) => {
  var getAccount = "SELECT * FROM users WHERE id = ?";
  var result = await db.get(getAccount, [id]);
  return result;
};

let deleteUserNoId = async (email, password) => {
  var result = await getUserDBHashed(email, password);
  if (result) {
    var deleteUserSQL = "DELETE FROM users WHERE id = ?";
    await db.run(deleteUserSQL, [result.id]);
    return true;
  } else {
    return false;
  }
}

//Create a User
let createUser = async (fName, lName, email, password) => {
  var createUserSql =
    "INSERT INTO users (id, fName,lName,email,password) VALUES (?,?,?,?,?)";
  var hashedPassword = bcrypt.hashSync(password, 10);
  var params = [null, fName, lName, email, hashedPassword];

  await runDBCreateUser(createUserSql, params);
  console.log("Finished creating user");
  return;
};

//Delete User (have user enter email and password for confirmation)
let deleteUser = async (id, email, password) => {
  var result = await getUserDBHashed(email, password);
  if (result) {
    if (result.id == id) {
      var deleteUserSQL = "DELETE FROM users WHERE id = ?";
      await db.run(deleteUserSQL, [id]);
      return true;
    }
  } else {
    return false;
  }
};

//Updates user information
let updateUserInfo = (id, fName, lName, email, password, changePassword) => {
  var updateUserSQL =
    "UPDATE users SET fName = ?, lName = ?, email = ?, password = ? WHERE id = ?";

  if (changePassword) {
    password = bcrypt.hashSync(password, 10);
  }

  db.run(updateUserSQL, [fName, lName, email, password, id]);
};

//Retrieves a user based on email and password (used for authentication)
let retrieveUser = async (email, password) => {
  var data = await getUserDB(email, password);
  if (data) {
    return data;
  } else {
    return null;
  }
};

//Helper function for retrieveUser and deleteUser
/*
*, (err, row) => {
		if(err)
			return console.error(err.message);
		if(row){
			if(bcrypt.compareSync(password, row.password))
				return row;
		}
		return null;
	}
*/
async function getUserDBHashed(email, password) {
  var getAccount = "SELECT * FROM users WHERE email = ?";
  var user = await db.get(getAccount, [email]);
  if (user && user.password == password) {
    return user;
  } else {
    return null;
  }
}

async function getUserDB(email, password) {
  var getAccount = "SELECT * FROM users WHERE email = ?";
  var user = await db.get(getAccount, [email]);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    return null;
  }
}

//Helper function for createUser
async function runDBCreateUser(query, params) {
  await db.run(query, params, function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
  return console.log("success");
}

module.exports = {
  createUser,
  checkEmailUsed,
  retrieveUser,
  findById,
  updateUserInfo,
  deleteUser,
  deleteUserNoId,
};
