import { Sidebar } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const DashBoardSideBar = () => {

    const location = useLocation()
    const [tab,seTab]=useState('')
    const {currentuser,error, loading} = useSelector(state => state.user)
    
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        seTab(tabFromUrl)
      }
     
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56 sticky top-4 left-0 h-full text-white '>
        <Sidebar.Items>
             <Sidebar.ItemGroup className='flex flex-col gap-1'>

             {
             currentuser && currentuser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
             ) 
        }

                <Link to='/dashboard?tab=profile' >
                    <Sidebar.Item  active={tab==='profile'} icon={HiUser} label={currentuser?.isAdmin ?"Admin":"User"}
                    labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>

            { currentuser?.isAdmin &&  ( 
               <Link to='/dashboard?tab=posts' >
                    <Sidebar.Item  active={tab==='posts'} icon={HiDocumentText} 
                    labelColor='dark' as='div'>
                        Posts
                    </Sidebar.Item>
                </Link>             )
             }

          {currentuser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
                  <Sidebar.Item  active={tab==='signout'} icon={HiArrowSmRight} className='cursor-pointer'>
                     SignOut
                  </Sidebar.Item>

             </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>



  )
}

export default DashBoardSideBar