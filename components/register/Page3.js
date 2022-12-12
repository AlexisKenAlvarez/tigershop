import React from 'react'
import FormInputSmall from '../FormInputSmall'
import FormInputShort from '../FormInputShort'

const Page3 = (props) => {
    const { inputsHalf, inputsFull } = props
    return (
        <>
            <div className='flex gap-x-6'>
                {inputsHalf.map((value) => {
                    return (
                        <FormInputShort key="value.id" {...value}/>
                    )
                })}
            </div>

            {inputsFull.map((value) => {
                return (
                    <FormInputSmall key={value.id} {...value}/> 
                )
            })}


        </>
    )
}

export default Page3