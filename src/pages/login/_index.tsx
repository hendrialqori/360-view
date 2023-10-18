<<<<<<< HEAD
import React from 'react'
import { cn } from "@/utils/clsx";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import PulseLoader from 'react-spinners/PulseLoader';

export default function Login() {

  const [isShowPassword, setIsShowPassword] = React.useState(false)

  const handleTogglePassword = () => setIsShowPassword(prev => !prev)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="w-11/12 md:w-6/12 lg:w-3/12">
        <h2 className="text-center text-xl mb-7 font-semibold">Login | Virtual Tour</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div
            className="flex flex-col"
            aria-label="username">
            <label htmlFor="user" className="font-light">Username</label>
            <input
              type="text"
              id="user"
              className={cn(
                'mt-1 py-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
              )}
            />
          </div>
          <div className="relative" aria-label="password">
            <label htmlFor="pass" className="font-light">Password</label>
            <input
              type={isShowPassword ? 'text' : 'password'}
              id="pass"
              className={cn(
                'mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'
              )}
            />
            <button
              className="absolute top-10 right-4"
              onClick={handleTogglePassword}
            >
              {
                isShowPassword
                  ? <BsEyeSlash className="text-2xl" />
                  : <BsEye className="text-2xl" />
              }

            </button>
          </div>
          <button
            type="submit"
            className={cn(
              "bg-blue-500 text-white rounded-md shadow-md px-7 py-[.5rem] w-max",
              "ml-auto mr-0 tracking-wide"
            )}
          >
            Masuk
            {/* <PulseLoader color='white' size={10} className='translate-y-1' />  */}
          </button>
        </form>
      </section>
      <footer className="fixed bottom-10">
        <p className="text-gray-100">Powered by shinta VR</p>
      </footer>
    </main>
=======
export default function Login() {
  return (
    <div>
      
    </div>
>>>>>>> main
  )
}