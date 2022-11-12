import { Button } from "@mui/material"
import { signInWithPopup } from "firebase/auth"
import Head from "next/head"
import Image from "next/image"
import React from "react"
import { auth, provider } from "../firebase"

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="grid place-items-center h-screen bg-gray-200">
        <div className="flex flex-col space-y-10 bg-white p-16  shadow-2xl">
          <Image width={150} height={180} alt="image" src="/WhatsApp.png" />
          <Button onClick={signIn}>Sign In With Google</Button>
        </div>
      </div>
    </>
  )
}

export default Login
