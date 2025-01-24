import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './global.css';
import ThemeProvider from './theme'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'
import LandingView from './pages/landing/landing-view'
import HomeGuard from './guards/home-guard'
import { AuthProvider } from './context/auth-provider'
import AuthDashboardGuard from './guards/auth-customer-guard'
import PatientView from './pages/dashboard/patient'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import QuizView from './pages/dashboard';
import { QuizProvider } from './context/quiz-provider';
import ResultView from './pages/dashboard/result/result-view';

function App() {

  return (
    <>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider>
            <SnackbarProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<HomeGuard />} >
                    <Route path='/' element={<LandingView />} />
                  </Route>
                  <Route element={<AuthDashboardGuard />}>
                    <Route path='/dashboard' element={<QuizProvider><QuizView /></QuizProvider>} />
                    <Route path='/results' element={<ResultView />} />
                    <Route path='/patient' element={<PatientView />} />
                  </Route>
                  <Route path='/register' element={<RegisterPage />} />
                  <Route path='/login' element={<LoginPage />} />
                </Routes>
              </BrowserRouter>
            </SnackbarProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </>
  )
}

export default App
