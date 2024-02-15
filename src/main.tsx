import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AppRoute from './Routes.tsx'
import { Provider } from 'react-redux'
import store1 from './Store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store1}>
    <RouterProvider router={AppRoute}/>
  </Provider>
)
