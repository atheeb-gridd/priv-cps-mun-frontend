import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EB1, EB2, EB3, EB4, EB5} from '../constants/Const';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ExeBoard = () => {
  const eb1Ref = useRef(null);
  const eb2Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      eb1Ref.current.children,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: eb1Ref.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: false,
          markers: false,
        },
      }
    );

    gsap.fromTo(
      eb2Ref.current.children,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: eb2Ref.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: false,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <>
      <section className='flex flex-col items-center text-center gap-10 md:items-start md:text-left md:px-32 md:gap-4 w-full'>
        <h1 className='font-bold mb-10 text-3xl md:text-5xl text-center w-full'>
          Meet the Executive board
        </h1>
      </section>
      <section id="container" className='justify-center'>
        <div ref={eb1Ref} className="image-container mb-24 md:flex hidden">
          {EB1.map((member, index) => (
            <div
              key={index}
              className="img font-allotrix-font-secondary"
              style={{ backgroundImage: `url(${member.img})` }}
            >
              <div className="img-label">
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center md:hidden'>
          {EB1.map((member, index) => (
            <div key={index} className='relative w-[170px] h-[170px] rounded-lg'>
                <img className='w-full h-full rounded-lg object-cover' src={member.img} alt="AV" />

              <div className='absolute bottom-2 text-md bg-[white] text-[black] px-2 rounded-r-md font-allotrix-font-secondary'>
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="container" className='mb-24 justify-center'>
        <div ref={eb2Ref} className="image-container md:flex hidden">
          {EB2.map((member, index) => (
            <div
              key={index}
              className="img font-allotrix-font-secondary"
              style={{ backgroundImage: `url(${member.img})` }}
            >
              <div className="img-label">
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center md:hidden'>
          {EB2.map((member, index) => (
            <div key={index} className='relative w-[170px] h-[170px] rounded-lg'>
                <img className='w-full h-full rounded-lg object-cover' src={member.img} alt="AV" />

              <div className='absolute bottom-2 text-md bg-[white] text-[black] px-2 rounded-r-md font-allotrix-font-secondary'>
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        
      </section>
      <section id="container" className='mb-24 justify-center'>
        <div ref={eb2Ref} className="image-container md:flex hidden">
          {EB3.map((member, index) => (
            <div
              key={index}
              className="img font-allotrix-font-secondary"
              style={{ backgroundImage: `url(${member.img})` }}
            >
              <div className="img-label">
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center md:hidden'>
          {EB3.map((member, index) => (
            <div key={index} className='relative w-[170px] h-[170px] rounded-lg'>
                <img className='w-full h-full rounded-lg object-cover' src={member.img} alt="AV" />

              <div className='absolute bottom-2 text-md bg-[white] text-[black] px-2 rounded-r-md font-allotrix-font-secondary'>
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="container" className='mb-24 justify-center'>
        <div ref={eb2Ref} className="image-container md:flex hidden">
          {EB4.map((member, index) => (
            <div
              key={index}
              className="img font-allotrix-font-secondary"
              style={{ backgroundImage: `url(${member.img})` }}
            >
              <div className="img-label">
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center md:hidden'>
          {EB4.map((member, index) => (
            <div key={index} className='relative w-[170px] h-[170px] rounded-lg'>
                <img className='w-full h-full rounded-lg object-cover' src={member.img} alt="AV" />

              <div className='absolute bottom-2 text-md bg-[white] text-[black] px-2 rounded-r-md font-allotrix-font-secondary'>
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/*<section id="container" className='mb-24 justify-center'>
        <div ref={eb2Ref} className="image-container md:flex hidden">
          {EB5.map((member, index) => (
            <div
              key={index}
              className="img font-allotrix-font-secondary"
              style={{ backgroundImage: `url(${member.img})` }}
            >
              <div className="img-label">
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-center md:hidden'>
          {EB5.map((member, index) => (
            <div key={index} className='relative w-[170px] h-[170px] rounded-lg'>
                <img className='w-full h-full rounded-lg object-cover' src={member.img} alt="AV" />
              <div className='absolute bottom-2 text-md bg-[white] text-[black] px-2 rounded-r-md font-allotrix-font-secondary'>
                <h2>{member.name}</h2>
                <p>{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>*/}
    </>
  );
};

export default ExeBoard;
