const LongButton = (props) => {
    const { name } = props
    return (
        <div className="mt-10 rounded-lg flex items-center justify-center p-[1px] bg-greenButton hover:bg-white transition-all ease-in-out duration-300" >
            <div className="font-inter bg-greenButton text-white p-4 rounded-lg text-sm font-bold text-center hover:bg-greenHover cursor-pointer select-none w-full">
                <p className="tracking-wider lg:text-lg">
                    {name}
                </p>
            </div>
        </div >
    )
}

export default LongButton