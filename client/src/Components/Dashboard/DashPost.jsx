import { Button, Modal, Table, TableBody, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUserFailure, deleteUserStart } from '../../redux/User/userSlice'

const DashPost = () => {

    const {currentuser} = useSelector((state)=>state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState(null)

    useEffect(()=>{
        const fetchPosts = async() =>{
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentuser?._id}`)

                const data = await res.json()

                if(res.ok){
                    setUserPosts(data.posts)
                    if(data.posts.length < 9){
                        setShowMore(false)
                    }
                }
            } catch (error) {
                 console.log(error)
            }
        }

         if(currentuser?.isAdmin){
            fetchPosts()
         }
    },[currentuser._id])

    const handleShowMore = async() =>{
        const startIndex= userPosts?.length

        try {

            const res = await fetch(`/api/post/getposts?userId=${currentuser?._id}&startIndex=${startIndex}`)

            const data = await res.json()
            console.log(data.posts.length)

            if(res.ok){
                setUserPosts((prev)=>[...prev,...data.posts])
                if(data.posts.length < 9){
                    setShowMore(false)
                }
            }
            
        } catch (error) {
            console.log(error)
        }

        
    }

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
          
          const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentuser._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (!res.ok) {
              console.log(data.message)
          } else{
            setUserPosts((prev) =>
                prev.filter((post) => post._id !== postIdToDelete)
              );
          }
        } catch (error) {
          console.log(error)
        }
      };

    // console.log(showMore)
  return (
    <div className='w-full mt-4 table-auto overflow-x-scroll md:mx-auto p-7 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-400  dark:scrollbar-thumb-slate-700'>
        {
            currentuser?.isAdmin && userPosts?.length > 0 ? 
            (
                <>
                   <Table  hoverable className='shadow-md '>

                      <TableHead>
                           <TableHeadCell>
                               Date Updated
                           </TableHeadCell>
                           <TableHeadCell>
                               Post Image
                           </TableHeadCell>
                           <TableHeadCell>
                              Post Title
                           </TableHeadCell>
                           <TableHeadCell>
                               Category
                           </TableHeadCell>
                           <TableHeadCell>
                               Delete
                           </TableHeadCell>
                           <TableHeadCell>
                              <span>
                                Edit
                              </span>
                           </TableHeadCell>
                      </TableHead>

                      {

                        userPosts?.map((post)=>(
                            <TableBody key={post._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                     <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                     <Table.Cell>
                                        {
                                    <Link to={`/post/${post.slug}`}>
                                         <img src={post.image} alt={post.title}  className='w-20 h-20 object-cover bg-gray-500'/>
                                    </Link>

                                        }
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                                            {post.title}
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {post.category}
                                    </Table.Cell>

                                    <Table.Cell>
                                       <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={()=>{
                                         setShowModal(true)
                                         setPostIdToDelete(post._id)
                                       }}>
                                        Delete
                                       </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link to ={`/update-post/${post._id}`} className='text-teal-500 hover:underline'>
                                            <span>
                                            Edit
                                        </span>
                                        </Link>
                                    </Table.Cell>
                                    
                                </Table.Row>
                            </TableBody>
                              
                                
                        ))
                      }
                     
                   </Table>

                   {
                    showMore &&(
                        <button onClick={handleShowMore} className='w-full text-teal-5-- self-center text-s py-7'>
                             Show more
                        </button>
                    )
                   }
                </>

            ):
            (
                <p>
                    You have no post yet
                </p>
            )
        }

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
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
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

export default DashPost