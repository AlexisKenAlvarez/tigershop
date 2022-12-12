import Image from "next/image"
import FormInput from "../components/FormInput"
import { useState } from "react"
import LongButton from "../components/LongButton"

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



    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-1]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[550px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl">
                    <div className="overflow-hidden lg:hidden">
                        <div className="flex justify-between w-[90%] mx-auto mt-6 items-center h-fit">
                            <div className="border-[0.5px] border-greenBg h-fit px-7 py-3 mt-[-1rem] ml-2 rounded-lg font-medium text-sm text-greenBg">
                                SIGN UP
                            </div>
                            <Image src="/logo.png" alt="Logo" width='200' height='20' className="w-20" />
                        </div>
                    </div>

                    <div className="bg-greenBg h-full w-[65%] hidden lg:block rounded-3xl relative">
                        <Image src="/bgtiger.png" fill alt="BackgroundImage " sizes="(min-width: 20em) 33vw,(min-width: 44em) 100vw" priority className="pointer-events-none"/>
                        <Image src="/logo.png" alt="Logo" width='200' height='20' className="w-28 mx-auto mt-16" />

                        <h1 className="text-center text-orangeText font-bold text-2xl mt-8 text-shadow-xl">TIGER SHOP</h1>
                        <h2 className="text-center w-[70%] mx-auto text-xs mt-1 text-white font-bold tracking-wider">
                            COLLEGE OF ENGINEERING AND INFORMATION TECHNOLOGY
                        </h2>

                        <div className="text-white mt-12 text-center">
                            <p className="w-[18rem] mx-auto text-lg font-normal tracking-wider">
                                Log in your account to start shopping with us!
                            </p>

                            <p className="text-sm mt-10 font-thin">
                                No account yet? Click sign up below.
                            </p>

                            <div className="rounded-lg cursor-pointer uppercase flex justify-center items-center border-[0.5px] border-white w-fit h-fit mx-auto mt-8 p-3 tracking-wider px-10 select-none font-light hover:bg-white hover:text-greenBg hover:font-bold transition-all ease-in-out duration-200">
                                sign up
                            </div>  
                        </div>



                    </div>

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