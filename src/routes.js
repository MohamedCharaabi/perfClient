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
import Index from "views/Index.js";
import Profile from "views/examples/Formers.js";
import Maps from "views/examples/Participants.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Themes.js";
import EditTheme from "views/examples/EditTheme.js";
import AddTheme from "views/examples/AddTheme.js";
import AddFormer from "views/examples/AddFormer.js";
import EditFormer from "views/examples/EditFormer.js";
import AddParticipant from "views/examples/AddParticipant.js";
import Sessions from "views/examples/Sessions.js";
import AddSession from "views/examples/AddSession.js";







var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/themes",
    name: "Themes",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/participants",
    name: "Participants",
    icon: "ni ni-single-02 text-yellow",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/formers",
    name: "Formers",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/sessions",
    name: "Sessions",
    icon: "ni ni-pin-3 text-orange",
    component: Sessions,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

];

export var others = [

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/edittheme/:id",
    name: "EditTheme",
    icon: "ni ni-circle-08 text-pink",
    component: EditTheme,
    layout: "/admin",
  },
  {
    path: "/deletetheme/:id",
    name: "DeletetTheme",
    icon: "ni ni-circle-08 text-pink",
    component: EditTheme,
    layout: "/admin",
  },
  {
    path: "/addtheme",
    name: "AddTheme",
    icon: "ni ni-circle-08 text-pink",
    component: AddTheme,
    layout: "/admin",
  },

  {
    path: "/addformer",
    name: "AddFormer",
    icon: "ni ni-circle-08 text-pink",
    component: AddFormer,
    layout: "/admin",
  },
  {
    path: "/editformer/:id",
    name: "EditFormer",
    icon: "ni ni-circle-08 text-pink",
    component: EditFormer,
    layout: "/admin",
  },

  {
    path: "/addparticipant",
    name: "AddParticipant",
    icon: "ni ni-circle-08 text-pink",
    component: AddParticipant,
    layout: "/admin",
  },
  // {
  //   path: "/editparticipant/:id",
  //   name: "EditParticipant",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: EditParticipant,
  //   layout: "/admin",
  // },
  {
    path: "/addSession",
    name: "AddSession",
    icon: "ni ni-circle-08 text-pink",
    component: AddSession,
    layout: "/admin",
  },

]

export default routes;
