import { Avatar } from "@material-ui/core"
import React from "react"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { useState } from "react"
import { Button } from "@mui/material"
import { addData, auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, doc, query, where } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import {useEffect} from "react"
function Sidebar() {
  const [isNewChatOpen, setNewChatOpen] = useState<boolean>()
  const [newChatAddress, setNewChatAddress] = useState<string>()
  const [user] = useAuthState(auth)
  const userChatsRef = collection(db, "chats")

  const userChats = query(
    userChatsRef,
    where("users", "array-contains", "cyoni10@gmail.com")
  )

  const [chatsSnapshot] = useCollection(userChats)

  const check = () => {
    console.log("x",chatsSnapshot)
  }
  useEffect(()=>{
    check()
  }, [])

  const startNewChat = () => {
    addData("chats", {
      users: [user?.email, newChatAddress],
    })
  }
  const toggleNewChat = () => setNewChatOpen((prev) => !prev)

  return (
    <div className=" sticky top-0 z-10 bg-white items-center h-[80px] ">
      <div className="flex justify-between border-b border-b-[whitesmoke]">
        <Avatar className="hover:cursor-pointer hover:opacity-80" />
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex mt-2 justify-center items-center rounded-md border p-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className=" w-full outline-none pl-2"
        />
      </div>

      <div className="mt-3  ">
        {isNewChatOpen ? (
          <div className="flex space-x-2 items-center">
            <input
              placeholder="Enter the address"
              type="text"
              value={newChatAddress}
              onChange={(e) => setNewChatAddress(e.target.value)}
              className="w-full p-2 outline-sky-400"
            />
            <Button
              onClick={() => {
                startNewChat()
                toggleNewChat()
              }}
              variant="contained"
            >
              OK
            </Button>
            <Button onClick={toggleNewChat}>Cancel</Button>
          </div>
        ) : (
          <button
            onClick={toggleNewChat}
            className="w-full border-t py-2 border-t-[whitesmoke] border-b border-b-[whitesmoke]"
          >
            Start New Chat
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
