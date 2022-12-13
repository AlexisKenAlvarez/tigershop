import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import AuthNavMobile from "../components/AuthNavMobile"
import AuthSide from "../components/AuthSide"
import ShortButton from "../components/ShortButton"
import Page1 from "../components/register/Page1"
import Page2 from "../components/register/Page2"
import Page3 from "../components/register/Page3"
import LongButton from "../components/LongButton"


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

    const page2inputs = [
        {
            id: 1,
            name: 'facebook',
            label: 'facebook link: (Optional)',
            type: 'text'
        },
        {
            id: 2,
            name: 'phone',
            label: 'phone number',
            type: 'text'
        },
        {
            id: 3,
            name: 'studentno',
            label: 'student number',
            type: 'text'
        }
    ]

    const page3half = [
        {
            id: 1,
            name: 'course',
            label: 'course',
            text: 'text'
        }, {
            id: 2,
            name: 'yearsection',
            label: 'Year and Section',
            text: 'text'
        },
    ]

    const page3full = [
        {
            id: 1,
            name: 'password',
            label: 'password',
            text: 'password'
        },
        {
            id: 2,
            name: 'confirmpassword',
            label: 'confirm password',
            text: 'password'
        },
    ]

    return {
        props: {
            inputs,
            page2inputs,
            page3half,
            page3full
        }
    }
}

function Signup(props) {
    const [values, setValues] = useState({
        email: '',
        username: '',
        fullname: '',
        facebook: '',
        phone: '',
        studentno: '',
        course: '',
        yearsection: '',
        password: '',
        confirmpassword: ''
    })

    const [firstCheck, setFirst] = useState({
        check1: false,
        check2: false,
        check3: false
    })

    const [page1go, set1go] = useState(false)
    const [page2go, set2go] = useState(false)
    const [page3go, set3go] = useState(false)


    const [page, setPage] = useState(1)
    const router = useRouter()


    const navigateLogin = () => {
        router.push("/login")
    }

    const handleNextPage = () => {
        if (page < 3) {
            if (page === 1) {

                if (values.fullname === '') {
                    console.log("fullname cannot be empty")
                    setFirst(current => ({ ...current, check1: false }))

                } else if (!(onlyLettersAndNumbers(values.fullname))) {
                    console.log("invalid")
                    setFirst(current => ({ ...current, check1: false }))

                } else if (values.fullname.length <= 3) {
                    console.log("username too short")
                    setFirst(current => ({ ...current, check1: false }))

                } else if (values.fullname.length >= 60) {
                    console.log("username too long")
                    setFirst(current => ({ ...current, check1: false }))

                } else {
                    setFirst(current => ({ ...current, check1: true }))
                }

                if (values.username === '') {
                    console.log("username cannot be empty")
                    setFirst(current => ({ ...current, check2: false }))
                }
                else if (checkSpecialChar(values.username)) {
                    console.log("username cannot contain special char")
                    setFirst(current => ({ ...current, check2: false }))
                } else if (!(usernameLength(values.username))) {
                    console.log("must be 3 to 10 chars")
                    setFirst(current => ({ ...current, check2: false }))

                } else if (hasSpace(values.username)) {
                    console.log("username cannot contain white space")
                    setFirst(current => ({ ...current, check2: false }))

                } else if (!(hasLetter(values.username))) {
                    console.log("must have atleast 1 letter")
                    setFirst(current => ({ ...current, check2: false }))

                } else {
                    setFirst(current => ({ ...current, check2: true }))
                }

                if (values.email === '') {

                    console.log("Email cannot be empty")
                    setFirst(current => ({ ...current, check3: false }))
                } else if (validateEmail(values.email)) {

                    setFirst(current => ({ ...current, check3: true }))
                } else {
                    console.log("inValid email")

                    setFirst(current => ({ ...current, check3: false }))
                }

                set1go(current => !current)

            } else if (page === 2) {
                
            }
        }
    }

    useEffect(() => {
        if (firstCheck.check1 && firstCheck.check2 && firstCheck.check3) {
            nextPage()
        }
    }, [page1go])

    


    const handleBackPage = () => {
        if (page === 2) {
            setPage(current => current - 1)
        }
    }

    const handleChange = (e) => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
            if (email.indexOf("@cvsu.edu.ph", email.length - "@cvsu.edu.ph".length) !== -1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function hasSpace(str) {
        return /\s/.test(str)
    }

    function checkSpecialChar(str) {
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
    }

    function usernameLength(str) {
        return /^[a-zA-Z0-9\s]{3,10}$/.test(str)
    }

    function hasLetter(str) {
        return /[a-zA-Z]+/.test(str)
    }

    function onlyLettersAndNumbers(str) {
        return /^[A-Za-z]*$/.test(str);
    }

    const nextPage = () => {
        setPage(current => current + 1)
    }


    return (
        <>
            <div className="main-bg font-inter h-screen flex justify-center items-center">
                <div className="bg-orangeBg h-screen w-full fixed top-0 z-[-2]">
                    <Image src="/cvsu.png" alt="CvSU" fill></Image>
                </div>

                <div className="bg-white h-screen w-full fixed top-0 z-[-1] lg:hidden"></div>

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[550px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl" style={page === 3 ? { minHeight: '670px', maxHeight: '700px' } : {}}>
                    <AuthNavMobile text="login" onClick={navigateLogin} />

                    <div className="w-full">
                        <div className="w-[80%] mx-auto max-w-[350px] font-inter mt-6 pb-10">
                            <h1 className="uppercase text-2xl font-bold italic w-52 text-center mx-auto mt-6 text-greenBg text-shadow-md lg:mt-14">Hello, Tiger!</h1>

                            <div className="flex mx-auto w-fit mt-6 justify-center items-center">
                                <div className="bg-greenSteps px-[1rem] py-2 rounded-full text-white font-medium text-sm">1</div>
                                <div className="w-12 h-[1.5px] bg-black mx-3"></div>
                                <div className="border-[1px] border-greenSteps px-[0.9rem] py-2 rounded-full text-greenSteps font-medium text-sm"
                                    style={page >= 2 ? { backgroundColor: "#023815", color: "white", fontWeight: 'bold' } : {}}>
                                    2
                                </div>
                                <div className="w-12 h-[1.5px] bg-black mx-3"></div>
                                <div className="border-[1px] border-greenSteps px-[0.9rem] py-2 rounded-full text-greenSteps font-medium text-sm"
                                    style={page === 3 ? { backgroundColor: "#023815", color: "white", fontWeight: 'bold' } : {}}>
                                    3
                                </div>
                            </div>
                            <p className="text-sm text-center text-greenSteps font-medium mt-4">Student Information</p>
                            {page === 1 ? <Page1 inputs={props.inputs} onChange={handleChange} value={values} /> :
                                page === 2 ? <Page2 inputs={props.page2inputs} onChange={handleChange} value={values} /> :
                                    page === 3 ? <Page3 inputsFull={props.page3full} inputsHalf={props.page3half} onChange={handleChange} value={values} /> : null}

                            {page === 3 ?
                                <div className="flex gap-x-4 mt-6">
                                    <input type="checkbox" className="mb-auto mt-2 ml-1"></input>
                                    <p className="text-xs">I agree that all of the information I have provided are correct and I consent the page to use that information for my future transactions within the page.</p>
                                </div>
                                : null}

                            <div className="flex">
                                {page === 2 ? <ShortButton name="Back" className="mr-auto" onClick={handleBackPage} /> : null}
                                {page < 3 ? <ShortButton name="Next" className="ml-auto" onClick={handleNextPage} /> : <LongButton name="Create my account" />}
                            </div>

                        </div>
                    </div>

                    <AuthSide head1="Create your account to start shopping with us!" head2="Already have an account? Click login below." buttonText="login" onClick={navigateLogin} />


                </div>
            </div>
        </>
    )
}

export default Signup