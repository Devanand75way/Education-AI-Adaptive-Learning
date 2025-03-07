import { Route, Routes } from 'react-router-dom'
import HeroSection from "./components/Hero-Section/Hero-section"
import RegisterPage from './components/Auth/Register'
import LoginPage from './components/Auth/Login'
import Courses from './components/Courses/Courses'
import LearningPage from './components/Learning/Learning-page'
import QuizPage from './components/Quiz/QuizPage'
import ViewCoursesPage from './components/Student/User'


import AuthRoutes from "./Layouts/AuthRoutes"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/auth' element={<LoginPage/>} />
      <Route path='/courses' element={<Courses/>} />

      <Route element={<AuthRoutes/>}>
         <Route path='/learning-class' element={<LearningPage/>} />
         <Route path="/quiz/:topic/:difficulty" element={<QuizPage />} />
         <Route path="/view-profile" element={<ViewCoursesPage />} />
      </Route>
    </Routes>
  )
}

export default App