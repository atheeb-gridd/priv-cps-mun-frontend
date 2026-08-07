import React from 'react'

const AgendaCard = ({logo, comName}) => {
  return (
    <div className='flex flex-col m-4 p-8 gap-4 justify-center rounded-xl items-center border-2 border-cps-gold bg-transparent max-h-[400px] max-w-[330px]'>
        <img src={logo} alt="logo" className='roudned-full '/>
        <h1 className='text-2xl font-bold'>{comName}</h1>
    </div>
  )
}

export default AgendaCard