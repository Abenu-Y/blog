import { Alert, Button, FloatingLabel, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, Navigate ,useNavigate} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/User/userSlice'
import OAuth from '../Components/GoogleAuth/oAuth'

const SignIn = () => {

  const [formdata , setFormData] = useState({})
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const{ loading, error:errorMessage} = useSelector(state => state.user)

  const handleChange =(e)=>{
    setFormData({...formdata, [e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(!formdata.email || !formdata.password){
      return dispatch(signInFailure('All fields are required'))
    }

    try {
      
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',{
        method:'post',
        body:JSON.stringify(formdata),
        headers:{
           'Content-Type':'application/json'
        }
      })

      const data = await res.json()
      console.log(data)

      if(data.success === false){
         dispatch(signInFailure(data.message))
      }

      if(res.ok){
        // return <Navigate to='/signin' />
        dispatch(signInSuccess(data))
        navigate('/')
      }
    
    } catch (error) {
        dispatch(signInFailure(error.message))
    }

  }

  console.log("formdata",formdata)
  return (
    <div className='min-h-screen mt-20'>

       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            
             <div className='flex-1'>
                <Link to='/' className='py-3   whitespace-nowrap  font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-2 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-lg p-6 text-white'>FullStackJourney</span>
              </Link>
              <p className='text-sm mt-5'>
              Join Abenezer on a full-stack journey, mastering TypeScript, Next.js, and MongoDB. Dive into cutting-edge technologies and build innovative, robust web applications together
              </p>
             </div>

             <div className='flex-1'>
                   <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                      
                         {/* <div>
                             <Label value='Email' />
                             <TextInput type='email' placeholder='email' id='email'  onChange={handleChange}/>
                         </div> */}

                         <div>
                           <FloatingLabel variant="outlined" label="email"  type='email' placeholder='email' id='email'  onChange={handleChange} className='t' />
                         </div>

                         <div>
                            <FloatingLabel variant="outlined" label="password" type='password' placeholder='Password' id='password' onChange={handleChange} />
                         </div>

                         {/* <div>
                             <Label value='Password' />
                             <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
                         </div> */}

                         <Button gradientDuoTone={'purpleToBlue'} type='submit'  disabled={loading}>
                           {
                            loading ?
                             (
                              <> 
                               <Spinner  size='sm'/>
                               <span className='pl-3'>Loading ...</span>
                              </>
                             ):
                            'Sign In'
                           }
                         </Button>
                          <OAuth />
                   </form>
                   <div className='flex gap-2 text-sm mt-5'>
                      <span>Dont Have an account ?</span>
                      <Link to={ '/signup'} className='text-blue-500'>Sign Up</Link>
                   </div>

                   {
                    errorMessage && ( 
                        <div>
                            <Alert className='mt-5' color={'failure'}>
                                {errorMessage}
                            </Alert>
                        </div>
                    )
                   }
             </div>
       </div>
    </div>
  )
}

export default SignIn