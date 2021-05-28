/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
// core components

import Sidebar from "components/Sidebar/Sidebar.js";
// import logo from 'assets/img/logo.jpg';
import routes from "routes.js";
import { others } from "routes.js";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import EditSession from "views/examples/EditSession";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true)

  React.useEffect(() => {
    setisLoading(true);
    getUser();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;


  }, [location]);



  async function getUser() {
    try {
      await axios.get('https://cims-server.herokuapp.com/auth/user', {
        headers: {
          'Content-Type': 'Application/json'
        },
        withCredentials: true
      }).then(res => {
        if (res.data.hasOwnProperty('name')) {
          setUser(true);
        } else {
          setUser(false);
        }

        setisLoading(false);
        console.log(res.data);


      });
    } catch (error) {
      setUser(false);
      setisLoading(false);
      console.log(error.message);
    }










    // console.log(user);

  }



  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" || prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getOtherRoutes = (others) => {
    return others.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route

            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  // const getBrandText = (path) => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
  //       -1
  //     ) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };





  if (isLoading) return <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}><CircularProgress /></div>


  console.log(user);
  if (!user) {
    return <Redirect to='/auth/Login' />
  }



  return (
    <>


      {user ?
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            // imgSrc: { logo },
            imgAlt: "...",
          }}
        /> :
        null}





      <div className="main-content" ref={mainContent}>
        {/* {window.location.pathname === '/admin/index' ? <AdminNavbar /> : null} */}


        <Switch>

          {getOtherRoutes(others)}
          {getRoutes(routes)}

          <Redirect from="*" to="/admin/index" />

        </Switch>




      </div>
    </>
  );
};

export default Admin;
