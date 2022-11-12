import Head from "next/head"
import Image from "next/image"
import React from "react"
import { Circle } from "better-react-spinkit"

function Loading() {
  return (
    <>
      <Head>
        <title>Loading</title>
      </Head>

      <div className="grid place-items-center h-screen bg-gray-200">
        <Circle color="#3385ff" size={100} />
      </div>
    </>
  )
}

export default Loading
