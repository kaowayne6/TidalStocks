### Mission

To provide a stock visualizer site to allow for users to view and keep track of the stocks they are invested in. Have a easy to use interface and helpful data to keep track of your stocks.

### Why Stocks?

Has a ton of data that can be relevant to a lot of people. Also always good to observe trends. Some of us are investors also.

### Team Members

#### Wayne Kao

- Database Management, Passport Authentication, CI/CD Integration/Production Environment Hoster, Fullstack Dev
- Bio: Senior, likes anything tech related!

#### Sean Kim

- Full Stack dev, Front end, Server Endpoint, Chart, CI/CD Integration, CSS
- Bio: Senior, I wish I was graduated! Like to go for long swims on the road and short walks on the beach.

#### Dean Mundrawla

- Full Stack dev, RESTful API endpoint, CSS, Chart Data, Page Router, Passport Authentication
- Bio: Senior graduating this month who will be working as a SDE at VMWare in February!

### Goals of Site

1. To create ways to user to compare stocks with other company
2. Store your current stocks that you are tracking
3. Analyse data so that it can track and give insights on patterns and trends that happen throughout a certain time period

### CODE SNIPPETS

React

```javascript
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import StockViewer from "./components/stockviewer.component";
import ProfilePage from "./components/profilePage.component";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Tidal
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
```

SQLite (Session Storing)

```javascript
app.use(
  session({
    //proxy: true,
    secret: process.env.SESSION_SECRET || "aCode",
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({
      table: "session",
      db: "tidalDB.sqlite3",
      dir: "./Database",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);
```

Passport.js

```javascript
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
```

Database API

```Javascript
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
```

Axios
```Javascript
login(pState) {
    Axios.post(uri+"/login", {
      email: pState.emailLogin,
      password: pState.passwordLogin,
    }, {withCredentials:true}).then((response) => {
      console.log(response);
      if (response.data.message !== "No User Exists") {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ errorMsg: "Invalid email or password" });
      }
    });
  }
```

Node.js Server Endpoints

```javascript
app.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  passport.authenticate("local", function (err, user, info) {
    if (err) throw err;
    if (user == false) {
      res.send({ message: "No User Exists" });
      return;
    } else {
      req.login(user, (err) => {
        if (err) throw err;
        res.send({ message: "Sucessfully Authenticated" });
      });
    }
  })(req, res, next);
});

app.post("/updateInfo", (req, res) => {
  const id = req.body.id;
  const fname = req.body.fName;
  const lname = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  const changePassword = req.body.changePwd;

  db.updateUserInfo(id, fname, lname, email, password, changePassword);

  res.send({ message: "Update Succesful" });
});
```

RESTful API

```javascript
var yahooFinance = require("yahoo-finance");

export const getHistoricalData = async (ticker, fromDate, toDate) => {
  await yahooFinance
    .historical({
      symbol: ticker,
      from: fromDate,
      to: toDate,
      period: "d",
    })
    .then(function (quotes) {
      if (quotes[0]) {
        console.log(`successfully retrieved ${quotes.length} results`);
        return quotes;
      } else {
        console.log("N/A");
        return undefined;
      }
    });
};
```

Nivo

```JavaScript
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    axisBottom={{
      format: "%b %d",
      //tickValues: "every 2 days",
      // tickRotation: -90,
      legend: "time scale",
      legendOffset: -12,
    }}
    colors={{ scheme: "nivo" }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveLine;
```

Example use of CI/CD && Docker

```javascript
version: '3'

services:
  backend:
    build:
      context: ./server
      dockerfile: ./Dockerfile
    image: "tidal-backend"
    ports:
      - "3001:3001"
  frontend:
    build:
      context: ./client
      dockerfile: ./Dockerfile
    image: "client-frontend"
    ports:
      - "3000:3000"
    links:
      - "backend:be"
```

Heroku

```json
"scripts": {
    "heroku-prebuild": "npm install -g serve",
    "start": "serve -s build",
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

### URL

https://tidalstocks.herokuapp.com/

### Test Coverage plan

Right now our application has 2 major components: Creating an account and Signing into the dashboard.

Therefore, we will need to write test cases around these 2 core functionalities.

To run the test, just run "npm run test" in both client and server folder

## Test Cases for Creating an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that first name is updated
   2. Test that last name is updated
   3. Test that email address is updated
   4. Test that password is updated
3. Test that checkPasswordStrength is working as intended
   1. Test that it succesfully passes a valid password
   2. Test that an erroneous password fails condition 1
   3. Test that an erroneous password fails condition 2

## Test Cases for Login into an Account

1. Test that signup component renders
2. Test that state is updated on user input
   1. Test that email is updated
   2. Test that password is updated

## Test Cases for Server (In server folder)

1. Test that POST register server call works as intended
   1. Test register to a new user and successful authentication
   2. Test register on user with same email in database
2. Test that POST login server call works as intended
   1. Test with right login information
   2. Test with wrong login information
3. Test that GET user returns confirmation of authenticated user or not
   1. Test with not authenticated
   2. Test with authenticated
4. Test that GET logout succesfully logs user out of session using GET user

### Charting Library and Meaningful Data Documentation

1. The charting library we are using is [Nivo](https://nivo.rocks/line). Specfically, the Nivo line chart.
2. The data endpoint, Historical Stock, from Yahoo Finance provides the user meaningful data pertaining to the price of the stock in it's history.
   1. We then use the Nivo Line chart to graph that data to help the user see the trend of the stock price over a period of time

### ER Diagram

![ERD Diagram](/ERD.png?raw=true "ERD Diagram")
