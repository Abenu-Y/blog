import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs'
const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500 '>
           <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                      <div className='mt-5'>
                            <Link to='/' className='block py-3  self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                                    <span className='px-2 py-2 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-lg p-6 text-white'>FullStackJourney</span>
                            </Link>
                      </div>

                      <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>

                          <div>
                            <Footer.Title  title='About'/>
                            <Footer.LinkGroup col>
                                  <Footer.Link href='/about' target='_blank' rel='nopener noreferrer'> about</Footer.Link>
                                {/* <Footer.Link href='https://nextjs.org/' target='_blank' rel='nopener noreferrer'> Next.js</Footer.Link>
                                <Footer.Link href='https://www.w3schools.com/mongodb/index.php' target='_blank' rel='nopener noreferrer'> Mongodb</Footer.Link>
                                <Footer.Link href='https://www.w3schools.com/typescript/index.php'target='_blank' rel='nopener noreferrer'> Typescript</Footer.Link> */}
                            </Footer.LinkGroup>
                          </div>

                          <div>
                            <Footer.Title  title='Follow Us'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='/' target='_blank' rel='nopener noreferrer'> FaceBook</Footer.Link>
                                <Footer.Link href='https://www.w3schools.com/mongodb/index.php' target='_blank' rel='nopener noreferrer'> Instagram</Footer.Link>
                                <Footer.Link href='https://www.w3schools.com/typescript/index.php'target='_blank' rel='nopener noreferrer'> Linkedin</Footer.Link>
                            </Footer.LinkGroup>
                          </div>
                      

                          <div>
                            <Footer.Title  title='Legal'/>
                            <Footer.LinkGroup col>
                                <Footer.Link href='/privacy-policy' target='_blank' rel='nopener noreferrer'> Privacy Policy</Footer.Link>
                                <Footer.Link href='/terms-and-conditions'> Terms &amp; Conditions</Footer.Link>
                               
                            </Footer.LinkGroup>
                          </div>


                    
                             
                      </div>


                </div>

                    <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by="Abenu-Y" year={new Date().getFullYear()} />

                    <div className='flex gap-6  sm:mt-0 my-5 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsGithub} />
                        <Footer.Icon href='#' icon={BsLinkedin} />
                    </div>
                </div>
           </div>
    </Footer>
  )
}

export default FooterComp