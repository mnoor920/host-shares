import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Cards = ({ item }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const allImages = item?.images?.data
    return (
        <div className='my-3'>
            <div className="rounded-xl">
                <div className="relative">
                    <div className="absolute z-10 top-2 right-2">
                        <FaRegHeart />
                    </div>

                    <Carousel responsive={responsive} showDots itemAriaLabel='40' >
                        {allImages?.length > 0 ? (allImages?.slice(0, 5)?.map((item, index) => {
                            return (
                                <div aria-label={`Carousel item ${index + 1}`}>
                                    <img src={item?.url} alt="" className="rounded-xl h-[300px] object-cover" width="100%" />
                                </div>
                            )
                        })

                        ) : ''}

                    </Carousel>
                </div>
                <div className="py-2">
                    <div className="flex justify-between">
                        <div className="mr-4">
                            <Link to={`/room_details/${item?.id}`}>
                                <h2 className='font-bold text-black'>
                                    {item?.title}
                                </h2>
                            </Link>

                            <p className='text-[#000] font-normal'>
                                {item?.location?.address} {item?.location?.city}
                            </p>
                        </div>
                        <div className="flex">
                            <FaStar className='mt-[0.5px]' /> <span>
                                {item?.ratings?.accuracy}
                            </span>
                        </div>
                    </div>
                    <h2 className='font-bold text-black'>
                        ${item?.price}  <span className='text-[#000] font-normal'>
                            Night
                        </span>
                    </h2>
                </div>



            </div>

        </div>
    )
}

export default Cards
