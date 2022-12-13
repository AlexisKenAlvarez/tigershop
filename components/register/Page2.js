import FormInput from "../FormInput"

const Page2 = (props) => {
    const { inputs, onChange, value } = props
    return (
        <>
            {inputs.map((val) => {
                return (
                    <FormInput key={val.id} {...val} value={value[val.name]} onChange={onChange} />
                )
            })}
        </>
    )
}

export default Page2