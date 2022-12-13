import FormInput from '../FormInput'


const Page1 = (props) => {
    const { inputs, value, onChange } = props
    return (
        <>
            {inputs.map((val) => {
                return (
                    <FormInput key={val.id} {...val} value={value[val.name]} onChange={onChange}/>
                )
            })}
        </>
    )
}

export default Page1
