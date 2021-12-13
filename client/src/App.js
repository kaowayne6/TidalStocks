import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import StockViewer from "./components/stockviewer.component";
import ProfilePage from "./components/profilePage.component";
import { MyStocks } from "./components/mystockscomponents/MyStocks";

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
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/stock-viewer"}>
                    Stock Viewer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/my-stocks"}>
                    My Stocks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/profile-page"}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={Login}>
              <div className="auth-inner">
                <Login />
              </div>
            </Route>
            <Route path="/sign-in" component={Login}>
              <div className="auth-inner">
                <Login />
              </div>
            </Route>
            <Route path="/sign-up" component={SignUp}>
              <div className="auth-inner">
                <SignUp />
              </div>
            </Route>
            <Route path="/dashboard" component={Dashboard}>
              <div className="auth-inner">
                <Dashboard authed={true} />
              </div>
            </Route>
            <Route path="/stock-viewer" component={StockViewer}>
              <StockViewer />
            </Route>
            <Route path="/profile-page" component={ProfilePage}>
              <div className="auth-inner">
                <ProfilePage />
              </div>
            </Route>
            <Route path="/my-stocks" component={MyStocks}>
              <div className="auth-inner">
                <MyStocks authed={true} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

//this.setState({stateVar: newVal});

// function App() {
//   const [emailReg, setEmailReg] = React.useState("");
//   const [passwordReg, setPasswordReg] = React.useState("");
//   const [fNameReg, setFNameReg] = React.useState("");
//   const [lNameReg, setLNameReg] = React.useState("");

//   const [emailLogin, setEmailLogin] = React.useState("");
//   const [passwordLogin, setPasswordLogin] = React.useState("");
//   const[loginStatus, setLoginStatus] = React.useState("Login or Register");

//   const [data, setData] = React.useState(null);

//   Axios.defaults.withCredentials = true;
//   const register = () => {
//     Axios.post('http://localhost:3001/register', {
//       fName: fNameReg,
//       lName: lNameReg,
//       email: emailReg,
//       password: passwordReg},)
//       .then((response) =>{
//         console.log(response);
//       })
//   };

//   const login = () => {
//     console.log("Pressed");
//     Axios.post('http://localhost:3001/login', {
//       email: emailLogin,
//       password: passwordLogin})
//       .then((response) =>{
//         console.log(response);

//       })
//   };

//   // const user = () => {
//   //   console.log("Pressed");
//   //   Axios.get('http://localhost:3001/user')
//   //     .then((response) =>{
//   //       console.log(response.data);
//   //       setData(response.data);
//   //     })
//   // };

//   React.useEffect( () => {
//     Axios.get('http://localhost:3001/user')
//       .then((response) =>{
//         console.log(response.data);
//         //setData(response.data);
//       })
//   }, []);

//   return (
//     <div className="App">
//       <div className="registration">
//         <label>First Name</label>
//         <input type="text" onChange={(e) => {setFNameReg(e.target.value)}}/>
//         <label>Last Name</label>
//         <input type="text" onChange={(e) => {setLNameReg(e.target.value)}}/>
//         <label>Email</label>
//         <input type="text" onChange={(e) => {setEmailReg(e.target.value)}}/>
//         <label>Password</label>
//         <input type="text" onChange={(e) => {setPasswordReg(e.target.value)}}/>
//         <button onClick={register}>Register</button>
//       </div>

//       <div className = "login">
//         <label>Email</label>
//         <input type="text" onChange={(e) => {setEmailLogin(e.target.value)}}/>
//         <label>Password</label>
//         <input type="text" onChange={(e) => {setPasswordLogin(e.target.value)}} />
//         <button onClick={login}>Login</button>
//       </div>

//       <h1>{loginStatus}</h1>
//     </div>
//   );
// }

export default App;
