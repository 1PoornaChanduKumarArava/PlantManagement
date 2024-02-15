import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LoginForm from './LoginPage/LoginForm'
import SignUpForm from './LoginPage/SignUpForm'
import Plant from './Plant'
import AddPlant from './AddPlant'
import EditPlant from './EditPlant'
import ForgotPassword from './ForgotPassword'

const AppRoute = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<LoginForm/>
            },
            {
                path:'/SignUp',
                element:<SignUpForm/>
            },
            {
                path:'/PlantListEdit',
                element:<Plant/>
            },
            {
                path:'/AddPlant',
                element:<AddPlant/>
            },
            {
                path:'/EditPlant',
                element:<EditPlant/>
            },
            {
                path:'/forgotPassword',
                element:<ForgotPassword/>
            }
        ]
    }
])

export default AppRoute
