import { Alert, Button, Modal, ModalBody,TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { root } from 'postcss';
import { updateFailure,updateStart,updateSuccess ,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess} from '../../redux/User/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DashBoardProfile = () => {

    const {currentuser,error, loading} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileURL, setImageFileURL] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [imageFileUploading, setFileImageUploading] = useState(false)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const filePicker = useRef('')
    const dispatch = useDispatch()
    const [formdata, SetFormData] = useState({})


    const handleImageChange =(e) =>{

        const file = e.target.files[0]

        if(file){

            setImageFile(file)
            setImageFileURL(URL.createObjectURL(file))
        }
    }

    useEffect(()=>{

    
        if(imageFile){
           uploadImage()
        }
    },[imageFile])
    
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size < 2* 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
  
    const uploadImage = async() => {
      if (!imageFile || !imageFile.type.startsWith('image/')) {
          setImageUploadError('Please select a valid image file');
          return;
      }
      
      setFileImageUploading(true)
      setImageUploadError(null)
      const storage = getStorage();
      const filename = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
          'state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageFileUploadProgress(progress.toFixed(0) );
              // console.log('Upload is ' + progress.toFixed(0) + '% done');
          },
          (error) => {
            setImageUploadError('Could not upload image( file must be less than 2MB');
            setImageFileUploadProgress(null)
            setImageFile(null);
            setImageFileURL(null);
            setFileImageUploading(false)
          },
          () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setImageFileURL(downloadURL);
                  SetFormData({...formdata, profilepic:downloadURL})
                  setFileImageUploading(false)
              });
          }
      );
  };


  const handleChange = (e) => {
    SetFormData({...formdata, [e.target.id]:e.target.value})
  }

  const handleSubmit= async(e) =>{

    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formdata).length === 0){
      setUpdateUserError('No changes made.')
      return
    }

    if(imageFileUploading){
      setUpdateUserError('Please wait for image to upload')
      return
    }

    try {

      dispatch(updateStart())

      const res = await fetch(`/api/user/update/${currentuser._id}`,{
        method:'put',
        body:JSON.stringify(formdata),
        headers:{
          'Content-Type':'application/json',
        }
      })

      const data = await res.json()

      

      if(!res.ok){
        dispatch(updateFailure())
        setUpdateUserError(data.message)
      } else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User's profile updated successfully")
      }
      
      
    } catch (error) {
       dispatch(updateFailure(error.message))
       setUpdateUserError(error.message)
    }

  }


  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentuser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
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
  

  console.log(formdata)
  console.log(currentuser)

    console.log(imageFileUploadProgress, imageUploadError)
  return (
    <div className='max-w-lg mx-auto p-3 w-full mt-4'>
         <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
         <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type='file' accept='image/*' onChange={handleImageChange} ref={filePicker} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'onClick={()=>filePicker.current.click()}>

              {
                imageFileUploadProgress && <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={
                  {
                    root:{
                      width:'100%',
                      height:'100%',
                      position:'absolute',
                      top:0,
                      left:0
                   },

                  path:{
                     stroke:`rgba(62,152,199, ${imageFileUploadProgress/100})`
                  }
              }} />
              }
             <img src={imageFileURL || currentuser.profilepic} alt='user profile picture' className= {`rounded-full w-full h-full border-8 border-{lightgray} object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}/>
            </div>

            {updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)}

            
            {
              imageUploadError &&  <Alert  color='failure' >{imageUploadError}</Alert>
             }

            <TextInput type='text'  id= 'username' placeholder='username' defaultValue={currentuser.username} onChange={handleChange}/>

            <TextInput type='email'  id= 'email' placeholder='email' defaultValue={currentuser.email} onChange={handleChange}/>

            <TextInput type='password'  id= 'password' placeholder='Password' onChange={handleChange} />

            <Button type='submit' gradientDuoTone={'purpleToBlue'}  disabled={loading || imageFileUploading}>
                 { loading ?'loading..':'Update'}
            </Button>

            {
              currentuser?.isAdmin && (
                <Link to={'/add-post'}>
                   <Button 
                   type='button'
                   outline
                   gradientDuoTone={'tealToLime'}
                   className='w-full '
                >
                       Create Post
                </Button>
                </Link>
              )
            }
         </form>

         <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
            <span className='cursor-pointer' onClick={handleSignout}>SignOut</span>
         </div>

         {error && (
            <Alert color='failure' className='mt-5'>
              {error}
            </Alert>
         )}

          {updateUserError && ( <Alert color='failure' className='mt-5'>{updateUserError}</Alert>)}


      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashBoardProfile