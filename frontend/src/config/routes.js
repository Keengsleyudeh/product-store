import Homepage from '../pages/Homepage'
import CreatePage from '../pages/CreatePage'
import Signup from '../pages/Signup'
import Login from '../pages/Login'

export const routes = [
  {
    path: '/',
    element: Homepage,
    protected: true,
  },
  {
    path: '/create',
    element: CreatePage,
    protected: true,
  },
  {
    path: '/signup',
    element: Signup,
    protected: false,
  },
  {
    path: '/login',
    element: Login,
    protected: false,
  },
]