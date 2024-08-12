import React, { useEffect, useState } from 'react'
import {Navbar,TextInput,Button, Dropdown, Avatar} from 'flowbite-react'
import {Link,useLocation, useNavigate} from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon ,FaSun} from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import {toggletheme} from '../../redux/theme/themeSlice'
import { signoutSuccess } from '../../redux/User/userSlice';


const Header = () => {

    const path = useLocation()
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { currentuser} = useSelector(state => state.user)
    const { theme} = useSelector(state => state.theme)
    // console.log("profilepic",currentuser)
    const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

console.log(searchTerm)
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    

  return (
    <Navbar className='border-b-2 py-3 sticky top-0 shadow-md z-50'>

         <Link to='/' className='block py-3  self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
             <span className='px-2 py-2 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-lg p-6 text-white'>FullStackJourney</span>
             <span className='px-1 text-sm'>with Abenezer</span>
         </Link>

         <form  onSubmit={handleSubmit}>
             <TextInput type='text' placeholder='Search ...' rightIcon={AiOutlineSearch}
                className='hidden lg:inline '
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
         </form>

         <Button className='w-12 h-10 lg:hidden' color='gary'  pill>
            <AiOutlineSearch />
         </Button>

         <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gary'  pill onClick={()=>dispatch(toggletheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
           
           {
            currentuser ?
             (
               <Dropdown arrowIcon={false} inline 
                label = {
                  <Avatar
                   alt='user'
                   rounded
                   img={currentuser.profilepic} />
                }>

                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentuser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentuser.email}</span>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>
                              Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                      
                      <Dropdown.Item onClick={handleSignout}>
                        Signout
                      </Dropdown.Item>

                    </Dropdown.Header>

               </Dropdown>
             )
             :
             (
              <Link to={'/signup'}>
                <Button gradientDuoTone='purpleToBlue' outline>
                  Sign In
                </Button>
               </Link>
             )
           }

            <Navbar.Toggle />
           
         </div>

         <Navbar.Collapse>
                <Navbar.Link  active={path.pathname === '/'} as={'div'}>
                   <Link to ='/' >
                      Home
                    </Link>
                </Navbar.Link> 

                <Navbar.Link active={path.pathname === '/projects'} as={'div'}>
                    <Link to ='/projects' >
                     Projects
                    </Link>
                </Navbar.Link>

            {
              currentuser && (
                  <Navbar.Link active={path.pathname === '/dashboard'}as={'div'}>  
                    <Link to ='/dashboard' >
                      DashBoard
                    </Link>
                </Navbar.Link>
                 )
            }
                <Navbar.Link active={path.pathname === '/about'} as={'div'}>
                    <Link to ='/about' >
                      About
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header