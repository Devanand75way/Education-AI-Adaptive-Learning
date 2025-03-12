import { Route, Routes } from 'react-router-dom'
import HeroSection from "./components/Hero-Section/Hero-section"
import RegisterPage from './components/Auth/Register'
import LoginPage from './components/Auth/Login'
import Courses from './components/Courses/Courses'
import LearningPage from './components/Learning/Learning-page'
import QuizPage from './components/Quiz/QuizPage'
import ViewCoursesPage from './components/Student/User'


import AuthRoutes from "./Layouts/AuthRoutes"
import AdminPanel from './Admin/Content'
import Simplify from './components/Simplify-topics/Simplify'
import CodeEditor from './components/Code-Editor/code.editor'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/auth' element={<LoginPage/>} />
      <Route path='/courses' element={<Courses/>} />
      <Route path="/simplify-topics" element={<Simplify />} />
      <Route path='/admin' element={<AdminPanel/>}/>

      <Route element={<AuthRoutes/>}>
         <Route path='/learning-class' element={<LearningPage/>} />
         <Route path="/quiz/:topic/:difficulty/:quizId" element={<QuizPage />} />
         <Route path="/view-profile" element={<ViewCoursesPage />} />
         <Route path='/code-practice' element={<CodeEditor/>}/>
         
      </Route>
    </Routes>
  )
}

export default App