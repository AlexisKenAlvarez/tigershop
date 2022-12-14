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
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth"
import { collection, setDoc, doc } from "firebase/firestore"
import { verify } from "jsonwebtoken"
import { auth, database, actionCodeSettings } from "../components/firebase/firebase-config"


export async function getServerSideProps(context) {
    const secret = process.env.NEXT_PUBLIC_SECRET
    const jwt = context.req.cookies['authToken']
  
    const url = context.req.url
  
    if (url.includes('/signup')) {
  
      try {
        verify(jwt, secret);
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
  
      } catch (error) {
        console.log(error)
      
      }
    }

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
            label: 'Facebook link',
            placeholder: "(Optional)",
            type: 'text'
        },
        {
            id: 2,
            name: 'phone',
            label: 'phone no',
            type: 'text'
        },
        {
            id: 3,
            name: 'studentno',
            label: 'student No',
            type: 'text'
        }
    ]

    const page3half = [
        {
            id: 1,
            name: 'course',
            label: 'course',
            type: 'text'
        }, {
            id: 2,
            name: 'yearsection',
            label: 'Yr and Section',
            type: 'text'
        },
    ]

    const page3full = [
        {
            id: 'password1id',
            name: 'password',
            label: 'password',
            type: 'password'
        },
        {
            id: 'password12d',
            name: 'confirmpassword',
            label: 'confirm password',
            type: 'password'
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

    const [valuesError, setError] = useState({
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

    const [secondCheck, setSecond] = useState({
        check1: false,
        check2: false,
        check3: false
    })

    const [thirdCheck, setThird] = useState({
        check1: false,
        check2: false,
        check3: false,
        check4: false
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

        if (page === 1) {

            if (values.fullname === '') {
                setError(current => ({ ...current, fullname: "Cannot be empty" }))
                setFirst(current => ({ ...current, check1: false }))

            } else if (!(onlyLettersAndNumbers(values.fullname))) {
                setError(current => ({ ...current, fullname: "Invalid fullname" }))
                setFirst(current => ({ ...current, check1: false }))

            } else if (values.fullname.length <= 3) {
                setError(current => ({ ...current, fullname: "Too short" }))
                setFirst(current => ({ ...current, check1: false }))

            } else if (values.fullname.length >= 60) {
                setError(current => ({ ...current, fullname: "Too long" }))
                setFirst(current => ({ ...current, check1: false }))

            } else {
                setError(current => ({ ...current, fullname: '' }))
                setFirst(current => ({ ...current, check1: true }))
            }

            if (values.username === '') {
                setError(current => ({ ...current, username: "Cannot be empty" }))
                setFirst(current => ({ ...current, check2: false }))
            }
            else if (checkSpecialChar(values.username)) {
                setError(current => ({ ...current, username: "Cannot contain special characters" }))
                setFirst(current => ({ ...current, check2: false }))
            } else if (!(usernameLength(values.username))) {
                setError(current => ({ ...current, username: "Must be 3 to 10 characters" }))
                setFirst(current => ({ ...current, check2: false }))

            } else if (hasSpace(values.username)) {
                setError(current => ({ ...current, username: "Cannot contain white space" }))
                setFirst(current => ({ ...current, check2: false }))

            } else if (!(hasLetter(values.username))) {
                setError(current => ({ ...current, username: "Must have atleast 1 letter" }))
                setFirst(current => ({ ...current, check2: false }))

            } else {
                setError(current => ({ ...current, username: '' }))
                setFirst(current => ({ ...current, check2: true }))
            }

            if (values.email === '') {
                setError(current => ({ ...current, email: 'Cannot be empty' }))
                setFirst(current => ({ ...current, check3: false }))
            } else if (validateEmail(values.email)) {
                setError(current => ({ ...current, email: '' }))
                setFirst(current => ({ ...current, check3: true }))
            } else {
                setError(current => ({ ...current, email: 'Invalid email' }))
                setFirst(current => ({ ...current, check3: false }))
            }

            set1go(current => !current)

        } else if (page === 2) {
            if (values.facebook.length > 60) {
                setError(current => ({ ...current, facebook: 'Link too lengthy' }))
                setSecond(current => ({ ...current, check1: false }))

            } else {
                setSecond(current => ({ ...current, check1: true }))
                setError(current => ({ ...current, facebook: '' }))

            }

            if (values.phone === '') {
                setError(current => ({ ...current, phone: 'Cannot be empty' }))
                setSecond(current => ({ ...current, check2: false }))

            } else if (!(validPhone(values.phone))) {
                setError(current => ({ ...current, phone: 'Invalid phone number' }))
                setSecond(current => ({ ...current, check2: false }))

            } else if (values.phone.slice(0, 2) !== '09') {
                setError(current => ({ ...current, phone: 'Must start with 09' }))
                setSecond(current => ({ ...current, check2: false }))

            } else {
                setError(current => ({ ...current, phone: '' }))
                setSecond(current => ({ ...current, check2: true }))
            }

            if (values.studentno === '') {
                setError(current => ({ ...current, studentno: 'Cannot be empty' }))
                setSecond(current => ({ ...current, check3: false }))

            } else if (!(validStudentno(values.studentno))) {
                setError(current => ({ ...current, studentno: 'Invalid Student Number' }))
                setSecond(current => ({ ...current, check3: false }))
            } else {
                setSecond(current => ({ ...current, check3: true }))
                setError(current => ({ ...current, studentno: '' }))
            }

            set2go(current => !current)
        } else if (page === 3) {

            if (values.course === '') {
                setError(current => ({ ...current, course: 'Invalid' }))
                setThird(current => ({ ...current, check1: false }))
            } else if (!(validCourse(values.course))) {
                setThird(current => ({ ...current, check1: false }))
                setError(current => ({ ...current, course: 'Invalid' }))
            } else {
                setThird(current => ({ ...current, check1: true }))
                setError(current => ({ ...current, course: '' }))
            }

            if (values.yearsection === '') {
                setThird(current => ({ ...current, check2: false }))
                setError(current => ({ ...current, yearsection: 'Invalid' }))

            } else if (!(validSection(values.yearsection))) {
                setThird(current => ({ ...current, check2: false }))
                setError(current => ({ ...current, yearsection: 'Invalid' }))

            } else {
                setThird(current => ({ ...current, check2: true }))
                setError(current => ({ ...current, yearsection: '' }))

            }

            if (values.password === '') {
                setError(current => ({ ...current, password: 'Cannot be empty' }))
                setThird(current => ({ ...current, check3: false }))

            } else if (values.password.length <= 3) {
                setThird(current => ({ ...current, check3: false }))
                setError(current => ({ ...current, password: 'Too weak' }))
            } else if (values.password.length > 15) {
                setThird(current => ({ ...current, check3: false }))
                setError(current => ({ ...current, password: 'Too long' }))
            } else {
                setThird(current => ({ ...current, check3: true }))
                setError(current => ({ ...current, password: '' }))
            }
            if (values.confirmpassword === '') {
                setThird(current => ({ ...current, check4: false }))
                setError(current => ({ ...current, confirmpassword: 'Cannot be empty' }))
            }
            else if (values.confirmpassword.localeCompare(values.password) !== 0) {
                setThird(current => ({ ...current, check4: false }))
                setError(current => ({ ...current, confirmpassword: 'Does not match' }))
            } else {
                setError(current => ({ ...current, confirmpassword: '' }))
                setThird(current => ({ ...current, check4: true }))
            }

            set3go(current => !current)
        }

    }

    useEffect(() => {
        if (firstCheck.check1 && firstCheck.check2 && firstCheck.check3) {
            nextPage()

        }
    }, [page1go])

    useEffect(() => {
        if (secondCheck.check1 && secondCheck.check2 && secondCheck.check3) {
            nextPage()

        }

    }, [page2go])

    useEffect(() => {
        if (thirdCheck.check1 && thirdCheck.check2 && thirdCheck.check3) {
            register()
        }
    }, [page3go])

    const register = async () => {
        sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
            .then(() => {
                console.log("Email link sent")
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', values.email);
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
        try {
            const user = await createUserWithEmailAndPassword(auth, values.email, values.password)

            await setDoc(doc(database, "users", user._tokenResponse.localId), {
                username: values.username,
                email: values.email,
                fullname: values.fullname,
                phone: values.phone,
                facebook: values.facebook,
                studentno: +values.studentno,
                course: values.course,
                yearsection: values.yearsection,
            }).then(() => {
                console.log("Added user credentials")
                router.push("/temp")
            }).catch((err) => {
                console.log(err)
            })


            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }



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

    function validSection(str) {
        return /^[a-zA-Z0-9-_]{3,3}$/.test(str)
    }

    function hasLetter(str) {
        return /[a-zA-Z]+/.test(str)
    }

    function validCourse(str) {
        return /[a-zA-Z\s]+/.test(str)
    }

    function onlyLettersAndNumbers(str) {
        return /^[A-Za-z\s.,]*$/.test(str);
    }

    function validPhone(str) {
        return /^[0-9]{11,11}$/.test(str);
    }

    function validStudentno(str) {
        return /^[0-9]{9,9}$/.test(str);
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

                <div className="bg-white h-screen w-full p-0 mt-0 lg:h-[90%] lg:min-h-[620px] lg:max-h-[650px] lg:w-[90%] lg:max-w-[1000px] lg:flex mx-auto lg:rounded-3xl">
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
                            {page === 1 ? <Page1 inputs={props.inputs} onChange={handleChange} value={values} error={valuesError} /> :
                                page === 2 ? <Page2 inputs={props.page2inputs} onChange={handleChange} value={values} error={valuesError} /> :
                                    page === 3 ? <Page3 inputsFull={props.page3full} inputsHalf={props.page3half} onChange={handleChange} value={values} error={valuesError} /> : null}

                            {page === 3 ?
                                <div className="flex gap-x-4 mt-6">
                                    <p className="text-xs ml-1">By signing up, you agree to our<span className="text-[#2165B7] font-semibold cursor-pointer"> TOS and Privacy Policy.</span></p>
                                </div>
                                : null}

                            <div className="flex">
                                {page === 2 ? <ShortButton name="Back" className="mr-auto" onClick={handleBackPage} /> : null}
                                {page < 3 ? <ShortButton name="Next" className="ml-auto" onClick={handleNextPage} /> :
                                    <LongButton name="Create my account" onClick={handleNextPage} />}
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