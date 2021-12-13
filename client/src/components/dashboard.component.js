import React, { useState, useEffect } from "react";
import Axios from "axios";

const uri = process.env.REACT_APP_API_ENDPOINT;

const Dashboard = () => {
  Axios.defaults.withCredentials = true;

  const [name, setName] = useState(null);

  const getUser = () => {
    Axios.get(uri+"/user", {withCredentials:true}).then((response) => {
      console.log(response);
      setName(response.data.fName);
    });
  };

  const logout = () => {
    Axios.get(uri+"/logout", {withCredentials:true}).then((response) => {
      setName(null);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {name ? (
        <div>
          Welcome {name}!<button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </div>
  );
};

export default Dashboard;
