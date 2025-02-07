'use client'
import { useEffect, useRef } from 'react';

const InfiniteLogosScroll = () => {
  const logosRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const ul = logosRef.current;

    if (ul) {
      const clonedUl = ul.cloneNode(true) as HTMLElement;
      ul.insertAdjacentElement('afterend', clonedUl);
      clonedUl.setAttribute('aria-hidden', 'true');
    }
  }, []);

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul
        ref={logosRef}
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
      >
        <li>
          <img src="/facebook.svg" alt="Facebook" />
        </li>
        <li>
          <img src="/disney.svg" alt="Disney" />
        </li>
        <li>
          <img src="/airbnb.svg" alt="Airbnb" />
        </li>
        <li>
          <img src="/apple.svg" alt="Apple" />
        </li>
        <li>
          <img src="/spark.svg" alt="Spark" />
        </li>
        <li>
          <img src="/samsung.svg" alt="Samsung" />
        </li>
        <li>
          <img src="/quora.svg" alt="Quora" />
        </li>
        <li>
          <img src="/sass.svg" alt="Sass" />
        </li>
      </ul>
    </div>
  );
};

export default InfiniteLogosScroll;



{/* <div className="w-full inline-flex flex-nowrap">
     <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none">
         <li>
             <img src="./facebook.svg" alt="Facebook" />
         </li>
         <li>
             <img src="./disney.svg" alt="Disney" />
         </li>
         <li>
             <img src="./airbnb.svg" alt="Airbnb" />
         </li>
         <li>
             <img src="./apple.svg" alt="Apple" />
         </li>
         <li>
             <img src="./spark.svg" alt="Spark" />
         </li>
         <li>
             <img src="./samsung.svg" alt="Samsung" />
         </li>
         <li>
             <img src="./quora.svg" alt="Quora" />
         </li>
         <li>
             <img src="./sass.svg" alt="Sass" />
         </li>
     </ul>                
</div */}