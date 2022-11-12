import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db, setData } from "../firebase"
import Login from "./Login"
import Loading from "./Loading"
import { useEffect } from "react"
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setData(
        `users/${user.uid}`,
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
