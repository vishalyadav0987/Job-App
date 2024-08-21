import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Mode from './Mode(LIight and dark)/Mode';
import { Toaster } from 'react-hot-toast';
import store from './store'
import { loadUser } from './redux/actions/userAction';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import Navbar from './Components/Navbar/Navbar';
import JobPage from './Pages/JobPage/JobPage';
import Footer from './Components/Footer/Footer';
import JobDetailPage from './Pages/JobDetailPage/JobDetailPage';
import Compines from './Pages/Admin/Companies/Compines';
import CreateCompany from './Pages/Admin/CreateCompany/CreateCompany';
import CompanySetup from './Pages/Admin/CompanySetupDetail/CompanySetup';
import Jobs from './Pages/Admin/Jobs/Jobs';
import CreateJob from './Pages/Admin/CreateJob/CreateJob';
import Applicants from './Pages/Admin/Applicants/Applicants';
import EditJobDetails from './Pages/EditJobDetails/EditJobDetails';
import ProtectedRoute from './Utils/ProtectedRoute';
import { useSelector } from 'react-redux';
import NotFound from './Pages/NotFound/NotFound';

const App = () => {
  const loaction = useLocation();
  const noNavbarRoutes = ['/login', '/register'];
  const { isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  window.addEventListener("contextmenu", (e) => e.preventDefault())
  return (
    <>
      {
        loaction.pathname !== '/' && <Mode
          top={"20px"}
          right={"20px"}
          width={"75px"}
          height={"35px"}
          index={!noNavbarRoutes.includes(loaction.pathname) && -1}
        />
      }
      {
        !noNavbarRoutes.includes(location.pathname) && <Navbar />
      }

      <>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/jobs' element={<JobPage />} />
          <Route path='/job/detail/:id' element={<JobDetailPage />} />

          <Route path='/profile/update' element={!isAuthenticated
            ? <Navigate to='/' /> : <UpdateProfile />
          } />


          <Route element={<ProtectedRoute />}>
            {/* Admin */}
            <Route path='/admin/companies' element={<Compines />} />
            <Route path='/admin/company/create' element={<CreateCompany />} />
            <Route path='/admin/company/:id' element={<CompanySetup />} />
            <Route path='/admin/jobs' element={<Jobs />} />
            <Route path='/admin/job/create' element={<CreateJob />} />
            <Route path='/admin/job/:id/applicants' element={<Applicants />} />
            <Route path='/admin/job/:id' element={<EditJobDetails />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        {
          !noNavbarRoutes.includes(location.pathname) && <Footer />
        }

      </>
    </>
  )
}

export default App
