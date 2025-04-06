import React from 'react'
import Navigation from './Navigation'
import Footer from '../Footer'
import Reviewbox from './Reviewbox'
import user from '../../pictures/user.jpg';

function Givereviews() {
  return (
    <>
      <Navigation />
      <Reviewbox />
      <div>
        <div className="flex flex-wrap justify-left mt-16 xl:px-16 lg:px-12 md:px-10 px-6 py-3">
          <div className="px-2 py-4 lg:w-1/3 md:w-full">
            <div className="space-y-2 border-2 rounded-lg border-gray-200 border-opacity-50 p-2">
              <div className="flex gap-4">
                <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full">
                  <img src={user} alt="" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
                  <p className="text-gray-900 text-[13px] mb-3">03-20-2025, 12:26 am</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className="leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 lg:w-1/3 md:w-full">
            <div className="space-y-2 border-2 rounded-lg border-gray-200 border-opacity-50 p-2">
              <div className="flex gap-4">
                <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full">
                  <img src={user} alt="" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
                  <p className="text-gray-900 text-[13px] mb-3">03-20-2025, 12:26 am</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className="leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 lg:w-1/3 md:w-full">
            <div className="space-y-2 border-2 rounded-lg border-gray-200 border-opacity-50 p-2">
              <div className="flex gap-4">
                <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full">
                  <img src={user} alt="" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
                  <p className="text-gray-900 text-[13px] mb-3">03-20-2025, 12:26 am</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className="leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>
          <div className="px-2 py-4 lg:w-1/3 md:w-full">
            <div className="space-y-2 border-2 rounded-lg border-gray-200 border-opacity-50 p-2">
              <div className="flex gap-4">
                <div className="w-16 h-16 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full">
                  <img src={user} alt="" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium">Shooting Stars</h2>
                  <p className="text-gray-900 text-[13px] mb-3">03-20-2025, 12:26 am</p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <p className="leading-relaxed">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Givereviews
