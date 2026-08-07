import React, { useEffect, useRef, useState } from 'react'
import Tag from '../components/Tag'
import Timer from '../components/Timer'
import dayjs, { duration } from 'dayjs'
import { CLIENTS, STALLS,} from '../constants/Const'
import TextReveal from '../components/TextReveal'
import ExeBoard from '../components/ExeBoard'
import PreviousMUN from '../components/PreviousMUN'
import Secgen from '../components/Secgen'
import OCMember from '../components/OCMembers'


const Home = () => {
    const today = dayjs()

    const endDate = today.add(59, 'days').endOf('day').set('date', 1).set('month', 7); // July is month 6 (0-indexed)
    
    const containerRef = useRef(null);
    
    const prevMUNContainer = document.getElementById("previous-mun-photos")

   

    
    

  return (
    <>
    <main className='bg-[#000] text-[#fff] flex flex-col justify-center items-center py-36 gap-4 overflow-hidden'>
        <Tag/>
        <h1 className='font-bold text-[#fff] md:text-8xl text-7xl px-4 text-center'><span className='text-cps-gold'>Conquer</span> From Within</h1>
        <p className='text-lg text-center'>Welcome to CPS Prime MUN, Chennai Public Schools’s Annual MUN Conference</p>
        <div className='flex gap-8 my-4'>
        <button className='cps-un-silver-btn text-lg' onClick={()=>{prevMUNContainer?.scrollIntoView({ behavior: 'smooth' });}}>Explore</button>

            <a href="/register"><button className='cps-un-gold-btn text-lg'>Register</button></a>

        </div>
        <div className='px-4'>
            <Timer endDate={endDate}/>
        </div>

       {/* <p className='text-lg mt-8 text-cps-grey font-bold'>Supported By</p>*/}
        {/*<section className='w-full h-[100px] flex items-center mb-24'>
        <div className='w-full md:w-full  justify-center overflow-hidden flex after:content[""] after:dark:from-brand-dark after:from-background after:bg-gradient-to-l after:right-0 after:top-0 after:bottom-0 after:w-20 after:z-10 after:absolute before:content[""] before:dark:from-brand-dark before:from-background before:bg-gradient-to-r before:left-0 before:top-0 before:bottom-0 before:w-20 before:z-10 before:absolute'>
                    {
                        
                        [...Array(1)].map((arr, i) => (
                            <div key={i} className='flex flex-nowrap justify-center '> {/*animate-slide */} 
                                {/*{
                                    CLIENTS.map((client) => (
                                        <div key={client.alt} className='relative w-[200px] justify-center m-10 shrink-0 flex items-center'>
                                            <img src={client.logo} alt={client.alt} className='object-contain max-w-none w-[100px]' />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
        </section> */}

    <hr  width="80%" className='my-8 text-cps-black'/>
        <PreviousMUN/>

   
    <hr  width="80%" className='my-8 text-cps-black'/>

    <OCMembers/>

    <TextReveal/>
    <Secgen/>

    {/*<h1 className='font-bold mb-10 text-3xl md:text-5xl text-center w-full'>
        Event Stalls
        </h1>        
        <section className='w-full h-[100px] flex items-center mb-24'>
        <div className='w-full md:w-full justify-center overflow-hidden flex after:content[""] after:dark:from-brand-dark after:from-background after:bg-gradient-to-l after:right-0 after:top-0 after:bottom-0 after:w-20 after:z-10 after:absolute before:content[""] before:dark:from-brand-dark before:from-background before:bg-gradient-to-r before:left-0 before:top-0 before:bottom-0 before:w-20 before:z-10 before:absolute'>
                    {
                        
                        [...Array(1)].map((arr, i) => (
                            <div key={i} className='flex flex-nowrap justify-center'>
                                {
                                    STALLS.map((client) => (
                                        <div key={client.alt} className='relative w-[200px] m-10 shrink-0 justify-center flex items-center'>
                                            <img src={client.logo} alt={client.alt} className='object-contain max-w-none w-[100px]' />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
        </section>*/}

    <section className='flex flex-col justify-center items-center gap-4 mt-6 p-2' >
        <h1>
            Quick Links
        </h1>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-center bg-cps-black rounded-lg md:rounded-full shadow-md shadow-cps-gold p-4 '>
                    <a href='/committees'><button className='cps-un-gold-btn'>Committees</button></a>
                    
                    {/*<a href='https://drive.google.com/drive/folders/1qiz8caGgf-br03Ym4AorA01VFLrb88iA?usp=sharing'><button className='cps-un-gold-btn'>Background Guides</button></a>*/}
                    <a href='/agendas'><button className='cps-un-gold-btn'>Agendas</button></a>
                    
                    <a href="/contact"><button className='cps-un-silver-btn'>Contact Us</button></a>
        </div>
        
    </section>


    

    </main>
</>
  )
}

export default Home