

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Admin/Dashboard'
import CreateTask from './pages/Admin/CreateTask'
import MyTask from './pages/User/MyTask'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import UserDashboard from './pages/User/Dashboard'
import Navbar from './components/Navbar'
import Team from './pages/Admin/Team'
import EditTask from './pages/Admin/EditTask'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='overflow-hidden min-h-screen'>


      <Router>
        <Navbar />

        <div className='pt-18'>
          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
              <Route path='/admin/users' element={<Team />} />
              <Route path='/admin/edit-task/:id' element={<EditTask />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["member"]} />}>
              <Route path='/user/dashboard' element={<UserDashboard />} />
              <Route path='/user/my-task' element={<MyTask />} />
              <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />

            </Route>
          </Routes>

        </div>
      </Router>
    </div>
  )
}

export default App