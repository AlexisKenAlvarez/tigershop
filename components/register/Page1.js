import React from 'react'
import FormInput from '../FormInput'


const Page1 = (props) => {
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

export default Page1
