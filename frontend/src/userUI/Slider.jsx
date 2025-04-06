import React, { useEffect, useState } from 'react';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setTransitionEnabled(true);
      setCurrentSlide((prevSlide) => (prevSlide >= 7 ? 1 : prevSlide + 1));
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const slideContainer = document.getElementById('slides');
    if (slideContainer) {
      if (currentSlide === 7) {
        setTimeout(() => {
          setTransitionEnabled(false);
          setCurrentSlide(1);
        }, 500);
      }
    }
  }, [currentSlide]);

  const handleLabelClick = (slideNumber) => {
    setTransitionEnabled(true);
    setCurrentSlide(slideNumber);
  };

  const handleShare = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          url,
        });
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      alert('Share not supported on this browser. Please copy the URL manually.');
    }
  };

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  return (
    <div className="flex justify-center items-center h-[520px] my-2">
      <div className="w-full h-full overflow-hidden relative">
        <div id="slides" className={`flex h-full w-full ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image1">
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image1">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#1 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Vehicals</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>
                      Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full h-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image2">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#2 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Antiques</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image3">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#3 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Ancients</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image4">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#4 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Scluptures</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image5">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#5 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Electronics & Gadgets</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image6">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#6 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Paintings</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide flex items-center justify-left min-w-full text-white slider-image1">
            <div className="content pt-10 px-6 xl:px-14 lg:px-14 w-full xl:w-4/5 lg:w-3/4">
              <h3 className="subtitle text-xl font-bold xl:pb-1 lg:pb-1 text-purple-400 inline-block">#1 Product</h3>
              <h1 className="xl:text-5xl lg:text-4xl text-2xl text-white font-semibold xl:py-2 lg:py-2">Vehicals</h1>
              <div className="lg:flex xl:flex py-2 w-full bg-transparent xl:py-4">
                <div className="flex items-center rounded-[4px] xl:text-[16px] lg:text-[16px] text-[12px] text-white xl:font-semibold lg:semibold h-5 xl:h-9 lg:h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                 {time}
                  <p className="text-white flex xl:text-md lg:text-md text-[12px] items-center xl:px-4 lg:px-4 ml-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {formattedDate}</p>
                </div>
              </div>
              <p className="description text-[13px] xl:text-[16px] lg:text-[16px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at viverra nibh. Praesent a porta enim, in rutrum metus. Quisque pretium sagittis consectetur. Integer ornare eleifend urna sed consectetur. Suspendisse condimentum ut dolor in euismod.
              </p>
              <div className="bg-transparent py-6">
                <div className="bg-transparent flex w-full space-x-3">
                  <div className="bg-transparent">
                    <a href="/login" className="bg-amber-100 flex text-black xl:py-2 lg:py-2 py-1 xl:px-5 lg:px-5 px-2 rounded-full xl:font-semibold lg:font-semibold hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor" className="size-5 bg-transparent my-[2px] mx-1"
                      >
                        <path
                          fill="currentColor"
                          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                        ></path>
                      </svg>Bid Now
                    </a>
                  </div>
                  <div className="bg-transparent px-2" onClick={handleShare}>
                    <a href="#" url="http://localhost:5173/" className="w-full bg-zinc-800 flex text-gray-800 dark:text-white xl:py-2 lg:py-2 py-1 xl:px-6 lg:px-6 px-3 rounded-full xl:font-semibold lg:font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 m-1 bg-transparent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                      </svg>Share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <label htmlFor="slide1" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(1)}>
          </label>
          <label htmlFor="slide2" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(2)}>
          </label>
          <label htmlFor="slide3" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(3)}>
          </label>
          <label htmlFor="slide4" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(4)}>
          </label>
          <label htmlFor="slide5" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(5)}>
          </label>
          <label htmlFor="slide6" className="bullet cursor-pointer w-4 h-4 rounded-full bg-[ #141414d5] shadow shadow-white hover:scale-125" onClick={() => handleLabelClick(6)}>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Slider;
