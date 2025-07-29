
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './routes/root'
import Board from './routes/board'
import IssuePage from './routes/issue'
import Settings from './routes/settings'
import Login from './routes/login'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Board />
        },
        {
          path: 'board',
          element: <Board />
        },
         {
          path: 'issue/:id',
          element: <IssuePage />
        },
         {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ])

  return (
   <div className=''>
    <RouterProvider router={router} />
   </div>
  )
}

export default App
