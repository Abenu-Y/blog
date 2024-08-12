import React from 'react'

import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Projects from './Pages/Projects'
import Search from './Pages/Search'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import PrivateRoute from './Components/Private/PrivateRoute'
import OnlyPrivateForAdmin from './Components/Private/OnlyPrivateForAdmin'
import AddPost from './Pages/AddPost'
import PostPage from './Pages/PostPage'
import UpdatePost from './Pages/UpdatePost'
import ScrollToTop from './Components/Scroll/ScrollToTop'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsandConditions from './Pages/TermsandConditions'



const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
          <Header />
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='about' element={<About />}/>
              <Route path='signin' element={<SignIn />}/>
              <Route path='signup' element={<SignUp />}/>
              <Route path='projects' element={<Projects />}/>
              <Route path='/search' element={<Search />} />
              <Route element={<PrivateRoute />}>
                 <Route path='dashboard' element={<DashBoard />}/>
              </Route>
              <Route element={<OnlyPrivateForAdmin />}>
                 <Route path='add-post' element={<AddPost />}/>
                 <Route path='/update-post/:postId' element={<UpdatePost />} />
              </Route>
              <Route path='/post/:postSlug' element={<PostPage />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-and-conditions' element={<TermsandConditions/>} />
          </Routes>
          <Footer />
    </BrowserRouter>
  )
}

export default App