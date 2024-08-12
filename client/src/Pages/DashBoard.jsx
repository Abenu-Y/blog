import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashBoardSideBar from '../Components/Dashboard/DashBoardSideBar'
import DashBoardProfile from '../Components/Dashboard/DashBoardProfile'
import DashPost from '../Components/Dashboard/DashPost'
import DashUsers from '../Components/Dashboard/DashUsers'
import DashComments from '../Components/Dashboard/DashComments'
import DashboardComp from '../Components/Dashboard/DashboardComp'

const DashBoard = () => {

  const location = useLocation()
  const [tab,seTab]=useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      seTab(tabFromUrl)
    }
   
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
       {/* sidebar */}
         <div className='md:w-56'>
                 <DashBoardSideBar />
         </div>


          {
            tab === 'profile' && <DashBoardProfile />
          }

           {
             tab === 'posts' && <DashPost />
           }

          {
            tab === 'users' && <DashUsers />
            }
     
           {
           tab === 'comments' && <DashComments />
           }
  
          {
            tab === 'dash' && <DashboardComp />
          }
    </div>
  )
}

export default DashBoard