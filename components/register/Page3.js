import React from 'react'
import FormInputSmall from '../FormInputSmall'
import FormInputShort from '../FormInputShort'

const Page3 = (props) => {
    const { inputsHalf, inputsFull, value, onChange } = props
    return (
        <>
            <div className='flex gap-x-6'>
                {inputsHalf.map((val) => {
                    return (
                        <FormInputShort key={val.id} {...val} value={value[val.name]} onChange={onChange} />
                    )
                })}
            </div>

            {inputsFull.map((val) => {
                return (
                    <FormInputSmall key={val.id} {...val} value={value[val.name]} onChange={onChange} /> 
                )
            })}


        </>
    )
}

export default Page3