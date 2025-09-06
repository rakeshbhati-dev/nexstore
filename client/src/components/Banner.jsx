import React, { useEffect, useState } from 'react'
import { getAllBanner } from '../services/banner'
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide, } from 'swiper/react'

function Banner() {
    const [bannerItem, setBannerItem] = useState([])
    const bannerImageSrc = import.meta.env.VITE_IMAGE_API
    async function fetchBannerHandler() {
        try {
            const response = await getAllBanner()
            setBannerItem(response.banner);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBannerHandler()
    }, [])
    return (
        <div className='w-full h-72 md:h-90'>
            {
                bannerItem.length > 0 &&
                <Swiper navigation={true} modules={[Navigation, Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="mySwiper w-full h-full ">
                    {
                        bannerItem.map((banner) => {
                            return(
                                <SwiperSlide className='w-full'>
                                <img src={`${bannerImageSrc}/banner/${banner.bannerImage}`} alt="" className='w-full h-full' />
                            </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            }
        </div>
    )
}

export default Banner