


import Login from "./pages/Login"
import Home from "./pages/user/Home";
import Application from "./pages/user/Application";
import Course from "./pages/user/Course";
import SingleCourse from './pages/Course';
import SupervisorHome from './pages/supervisor/Home'
import SupervisorApplication from './pages/supervisor/Application'
import SupervisorCourse from './pages/supervisor/Course'
import CoordinatorHome from './pages/coordinator/Home';
import CoordinatorApplication from './pages/coordinator/Application'
import CoordinatorCourse from './pages/coordinator/Course'
import CoordinatorPeople from './pages/coordinator/People'

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
    path: '/supervisor/course',
    element: <SupervisorCourse/>
  },
  {
    path: '/coordinator',
    element: <CoordinatorHome/>
  },
  {
    path: '/coordinator/application',
    element: <CoordinatorApplication/>
  },
  {
    path: '/coordinator/course',
    element: <CoordinatorCourse/>
  },
  {
    path: '/coordinator/people',
    element: <CoordinatorPeople/>
  },
  {
    path:'/beMarker/:id',
    element:<Home/>
  },
  {
    path:'/beMarker',
    element:<Home/>
  }
 
];

export default AppRoutes;
