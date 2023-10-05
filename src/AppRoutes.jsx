


import Login from "./pages/Login"
import Home from "./pages/user/Home";
import Application from "./pages/user/Application";
import Course from "./pages/user/Course";
import SingleCourse from './pages/Course';
import SupervisorHome from './pages/supervisor/Home'
import SupervisorApplication from './pages/supervisor/Application'

const AppRoutes = [
  {
    index: true,
    // element: <Home />
    element: <Course />
  },

  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/application',
    element: <Application/>
  },
  {
    path: '/course',
    element: <Course/>
  },
  {
    path: '/course/:id',
    element: <SingleCourse/>
  },
  {
    path: '/supervisor',
    element: <SupervisorHome/>
  },
  {
    path: '/supervisor/application',
    element: <SupervisorApplication/>
  },
  {
    path:'/beMarker',
    element:<Home/>
  }
 
];

export default AppRoutes;
