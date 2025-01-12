import Homepage from './pages/HomePage'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import Login from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
function App() {

  return (
    <Router>
      <div>
        <ToastContainer />
        <Toaster position="top-right" />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}

export default App
