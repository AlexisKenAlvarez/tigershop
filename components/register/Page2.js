import FormInput from "../FormInput"

const Page2 = (props) => {
    const { inputs } = props
    return (
        <>
            {inputs.map((value) => {
                return (
                    <FormInput key={value.id} {...value} />
                )
            })}
        </>
    )
}

export default Page2