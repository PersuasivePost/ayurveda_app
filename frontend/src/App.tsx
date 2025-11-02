import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import FindDoctors from './pages/FindDoctors'
import Doctors from './pages/Doctors'
import BookingPage from './pages/BookingPage'
import Products from './pages/Products'
import LearnAyurveda from './pages/LearnAyurveda'
import QuickRemedies from './pages/QuickRemedies'
import Quiz from './pages/Quiz'
import QuizStart from './pages/QuizStart'

// Dashboard Pages
import Dashboard from './pages/Dashboard'
import DashboardAppointments from './pages/DashboardAppointments'
import DashboardProfile from './pages/DashboardProfile'
import DoctorDashboard from './pages/DoctorDashboard'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminContent from './pages/AdminContent'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/booking/:doctorId" element={<BookingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/learn-ayurveda" element={<LearnAyurveda />} />
          <Route path="/quick-remedies" element={<QuickRemedies />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/start" element={<QuizStart />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/appointments" element={<DashboardAppointments />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/content" element={<AdminContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
