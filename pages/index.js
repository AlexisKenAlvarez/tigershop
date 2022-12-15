import Link from "next/link";
import { verify } from "jsonwebtoken";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase/firebase-config";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const secret = process.env.NEXT_PUBLIC_SECRET
  const jwt = context.req.cookies['authToken']

  const url = context.req.url
  if (url.includes('/')) {

    try {
      verify(jwt, secret);
      return {
        props: {
          status: true
        }
      }

    } catch (error) {
      console.log(error)
      return {
        props: {
          status: false
        }
      }
    }
  }
}

function Home(props) {
  const router = useRouter()

  const handleLogout = async () => {
      await signOut(auth)
      fetch("/api/logout", {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({})
      }).then((response) => {
          router.push("/login")
      })

  }
  return (
    <>
      <h1 className="font-inter">Home</h1>
      
      <p>{props.status ? "You are logged in, you can now access our features" : "You cannot access features because you are not logged in yet"}</p>
      {props.status ? 
      <p onClick={handleLogout}>Logout</p> : 
      <>
        <Link href="/login">Click here to login</Link>
        <Link href="/login">Click here to register</Link>
      </>  
      }

    </>

  )
}

export default Home
