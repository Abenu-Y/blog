import { Button } from 'flowbite-react'
import React from 'react'

import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'

import {useDispatch} from 'react-redux'
import { signInSuccess } from '../../redux/User/userSlice'
import {useNavigate} from 'react-router-dom'

import {app} from '../../../firebase'

const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleGoogleCLick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
         try {
           
            const resultsFromGoogle = await signInWithPopup(auth,provider)

            const {displayName , email, photoURL} = resultsFromGoogle.user
            console.log(displayName)

            const res = await fetch('/api/auth/google',{
                method:'post',
                body:JSON.stringify({name:displayName, email, googlePhotoUrl:photoURL}),
                headers:{
                    'Content-Type':'application/json',     
                }
            })

            const data = await res.json()

            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
            console.log(resultsFromGoogle.user)
            console.log(displayName,photoURL)
            
         } catch (error) {
            
         }
    }
  return (
    <Button type='button' gradientDuoTone={'purpleToBlue'} outline onClick={handleGoogleCLick}>
         <AiFillGoogleCircle  className='w-6 h-6  mr-2'/>
         <span> Continue with Google</span>
    </Button>
  )
}

export default OAuth