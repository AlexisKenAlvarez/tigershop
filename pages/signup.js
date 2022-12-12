import Image from "next/image"
import FormInput from "../components/FormInput"
import { useState } from "react"
import LongButton from "../components/LongButton"
import { useRouter } from "next/router"
import AuthNavMobile from "../components/AuthNavMobile"
import AuthSide from "../components/AuthSide"
import ShortButton from "../components/ShortButton"
import Page1 from "../components/register/Page1"

export async function getServerSideProps() {
    
    const inputs = [
        {
            id: 1,
            name: "fullname",
            label: "fullname",
            type: "text",
        },
        {
            id: 2,
            name: "username",
            label: "username",
            type: "text"
        },
        {
            id: 3,
            name: "email",
            label: "email",
            type: "email"
        }
    ]

    return {
        props: {
            inputs
        }
    }
}

function Signup(props) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()


    const navigateLogin = () => {
        router.push("/login")
    }

    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[550px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl">
                    <AuthNavMobile text="login" onClick={navigateLogin}/>

                    <div className="w-full">
                        <div className="w-[80%] mx-auto max-w-[350px] font-inter mt-6">
                            <h1 className="uppercase text-2xl font-bold italic w-52 text-center mx-auto mt-6 text-greenBg text-shadow-md lg:mt-14">Hello, Tiger!</h1>

                            <div className="flex mx-auto w-fit mt-6 justify-center items-center">
                                <div className="bg-greenSteps px-[1rem] py-2 rounded-full text-white font-medium text-sm">1</div>
                                <div className="w-12 h-[1.5px] bg-black mx-3"></div>
                                <div className="border-[1px] border-greenSteps px-[0.9rem] py-2 rounded-full text-greenSteps font-medium text-sm">2</div>
                                <div className="w-12 h-[1.5px] bg-black mx-3"></div>
                                <div className="border-[1px] border-greenSteps px-[0.9rem] py-2 rounded-full text-greenSteps font-medium text-sm">3</div>
                            </div>
                            <p className="text-sm text-center text-greenSteps font-medium mt-4">Student Information</p>
                            <Page1 inputs={props.inputs}/>

                            <ShortButton name="Next"/>

                        </div>
                    </div>

                    <AuthSide head1="Create your account to start shopping with us!" head2="Already have an account? Click login below." buttonText="login" onClick={navigateLogin}/>


                </div>
            </div>
        </>
    )
}

export default Signup