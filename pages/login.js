import Image from "next/image"
import FormInput from "../components/FormInput"
import { useState } from "react"
import LongButton from "../components/LongButton"
import { useRouter } from "next/router"
import AuthNavMobile from "../components/AuthNavMobile"
import AuthSide from "../components/AuthSide"

export async function getServerSideProps() {
    
    const inputs = [
        {
            id: 1,
            name: "email",
            label: "email",
            type: "text",
        },
        {
            id: 2,
            name: "password",
            label: "password",
            type: "password"
        }
    ]

    return {
        props: {
            inputs
        }
    }
}

function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()

    const navigateSignup = () => {
        router.push("/signup")
    }

    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[550px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl">
                    <AuthNavMobile text="signup" onClick={navigateSignup}/>

                    <AuthSide head1="Log in your account to start shopping with us!" head2="No account yet? Click sign up below." buttonText="sign up" onClick={navigateSignup}/>


                    <div className="w-full">


                        <div className="w-[80%] mx-auto max-w-[350px] font-inter mt-6">
                            <h1 className="uppercase text-2xl font-bold italic w-52 text-center mx-auto mt-16 text-greenBg text-shadow-md mb-10 lg:text-left lg:mx-0 ">Welcome back, Tigers!</h1>
                            {props.inputs.map((value) => {
                                return (
                                    <FormInput key={value.id} {...value} />
                                )
                            })}

                            <p className="mt-4 ml-1 cursor-pointer">Forgot your password?</p>

                            <LongButton name="Login" />

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Login