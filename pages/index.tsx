import type { NextPage } from "next"
import Sidebar from "../components/Sidebar"

const Home: NextPage = () => {
  return (
    <div className="text-lg py-2 px-3">
      <Sidebar />
    </div>
  )
}

export default Home
