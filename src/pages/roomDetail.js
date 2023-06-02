import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Layout from "../layout/layout"
import { FaStar, FaTimes } from 'react-icons/fa'
import { BsDoorOpen, BsCalendarHeart } from "react-icons/bs"
import { SiVexxhost } from 'react-icons/si'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerIcon from '../assests/marker.png';
import L from 'leaflet';

const RoomDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const customIcon = L.icon({
        iconUrl: MarkerIcon,
        iconSize: [25, 25], // Set the desired size of the icon
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://file.notion.so/f/s/24643894-e5c3-4c40-974a-52594f581e03/listings.json?id=f795dab6-14d4-48a9-9567-c72151d311a2&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&expirationTimestamp=1685811589206&signature=MAcz7-tuY6N6LscNmApYWI3MeGEF23rwc4v9iMsV04Q&downloadName=listings.json');
                const jsonData = await response.json();
                setData(jsonData && jsonData.data);
                setCategory(jsonData && jsonData.categories);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const searchedRoomDetail = data.filter((item) => {
        return (
            item?.info?.id == id
        );
    });

    const images = searchedRoomDetail[0]?.info?.images?.data
    const openLightbox = () => {
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };


    function ShowMoreLess({ text, maxLength }) {
        const [showFullText, setShowFullText] = useState(false);

        const toggleText = () => {
            setShowFullText(!showFullText);
        };

        const renderText = () => {
            if (showFullText || text?.length <= maxLength) {
                return text;
            }

            return text?.slice(0, maxLength) + '...';
        };

        return (
            <div>
                <p className='text-sm tracking-widest font-thin text-[#717171] mb-3'>{renderText()}</p>
                {text?.length > maxLength && (
                    <button onClick={toggleText}>
                        {showFullText ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div>
            <Layout data={data} category={category}>
                <div className="">
                    {isLoading ? (
                        <div className="placeholder-container">
                            <div className="placeholder-box"></div>
                        </div>
                    ) : (
                        <div className=" max-w-[1250px] mx-auto px-2 my-4">
                            <h2 className="text-3xl font-bold text-black">
                                {searchedRoomDetail[0]?.info?.title}
                            </h2>
                            <div className="flex justify-between my-2">
                                <div className="flex rating">
                                    <div className="flex">
                                        <span className="mr-1 mt-[0.5px]">
                                            <FaStar />
                                        </span>
                                        <span>
                                            {searchedRoomDetail[0]?.info?.ratings?.accuracy}
                                        </span>
                                    </div>
                                    <span className='mx-2'>.</span>
                                    <span className='mx-2'> {searchedRoomDetail[0]?.info?.visibleReviewCount} Reviews</span>
                                    <span className='mx-2'> {searchedRoomDetail[0]?.info?.location?.city}</span>


                                </div>

                            </div>

                            <div className="my-3">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="">
                                        <img src={searchedRoomDetail[0]?.info?.images?.data[0].url} className='w-full h-[320px] object-cover md:rounded-l-xl rounded-xl' alt="" />
                                    </div>
                                    <div className="relative grid grid-cols-2 gap-4">
                                        {searchedRoomDetail[0]?.info?.images?.data?.slice(1, 5).map((item) => {
                                            return (
                                                <div className="">
                                                    <img src={item?.url} className='w-full md:rounded-l-xl rounded-xl h-[150px] object-cover' alt="" />
                                                </div>
                                            )
                                        })}
                                        <div className="absolute w-[170px] flex justify-center items-center hover:cursor-pointer h-[30px] bg-white right-8 bottom-8 rounded-xl" onClick={openLightbox} >
                                            Show All Images
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="my-8">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="col-span-2">
                                        <div className="pb-3 border-b">
                                            <div className="flex justify-between">
                                                <h2 className="mr-2 text-3xl font-bold text-black">
                                                    Room in a cottage hosted by {searchedRoomDetail[0]?.info?.host?.name}
                                                </h2>
                                                <img src={searchedRoomDetail[0]?.info?.host?.avatar?.url} className='w-[40px] h-[40px] rounded-full' alt="" />
                                            </div>
                                            < p className='text-sm font-thin text-[#717171] mb-3'>
                                                {searchedRoomDetail[0]?.info?.maxGuestCapacity} Guest
                                                <span className='mx-2'>.</span>
                                                1 bedroom <span className='mx-2'>.</span> 1 bed <span className='mx-2'>.</span>1 bath
                                            </p>
                                            <br />
                                        </div>
                                        <br />
                                        <div className="py-5 border-b">
                                            <div className="flex">
                                                <div className="mr-2 icon">
                                                    <BsDoorOpen fontSize={25} />
                                                </div>
                                                <div className="ml-3">
                                                    <h2 className="text-xl font-bold text-black">
                                                        Self check-in
                                                    </h2>
                                                    < p className='text-sm font-thin text-[#717171] mb-3'>
                                                        You can check in with the doorman.
                                                    </p>
                                                    <br />
                                                </div>


                                            </div>
                                            <div className="flex">
                                                <div className="mr-2 icon">
                                                    <SiVexxhost fontSize={25} />
                                                </div>
                                                <div className="ml-3">
                                                    <h2 className="text-xl font-bold text-black">
                                                        Avi is a Superhost
                                                    </h2>
                                                    < p className='text-sm font-thin text-[#717171] mb-3'>
                                                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                                                    </p>
                                                    <br />
                                                </div>


                                            </div>
                                            <div className="flex">
                                                <div className="mr-2 icon">
                                                    <BsCalendarHeart fontSize={25} />
                                                </div>
                                                <div className="ml-3">
                                                    <h2 className="text-xl font-bold text-black">
                                                        Free cancellation before Jun 28.
                                                    </h2>

                                                    <br />
                                                </div>


                                            </div>
                                        </div>
                                        <br />
                                        <div className="border-b">
                                            <ShowMoreLess text={searchedRoomDetail[0]?.info?.description} maxLength={500} />
                                            <br />
                                        </div>
                                        <div className="border-b">
                                            <br />
                                            <h2 className="text-3xl font-bold text-black mt-7">
                                                What This Place offer
                                            </h2>
                                            <br />
                                            <div className="grid grid-cols-2 gap-4">
                                                {searchedRoomDetail[0]?.info?.amenities?.data?.slice(0, 30).map((item, index) => {
                                                    return (
                                                        <div className="flex">
                                                            <div className="mr-2 icon" key={index} >
                                                                <BsDoorOpen />
                                                            </div>
                                                            < p className='text-sm font-thin text-[#717171] mb-3'>
                                                                {item?.title}
                                                            </p>

                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <br />
                                        </div>


                                    </div>
                                    <div className="right_side">
                                        <div className="p-[24px] right_model sticky top-0">
                                            <div className="flex justify-between mb-3 font-bold top">
                                                <h2> ${searchedRoomDetail[0]?.info?.price} <sub className='font-thin'>night</sub> </h2>
                                                <h2> {searchedRoomDetail[0]?.info?.visibleReviewCount} Reviews  </h2>
                                            </div>
                                            <br />
                                            <div className="mt-3">
                                                <div className="grid grid-cols-2 pt-5">
                                                    <div className="p-2 border rounded-tl-[10px] roundeed_class">
                                                        <p className='text-sm font-thin text-[#717171]'>Check In</p>
                                                        <p className='text-sm font-thin text-[#717171]'>6/29/2023</p>
                                                    </div>
                                                    <div className="p-2 border rounded-tr-xl roundeed_class_one">
                                                        <p className='text-sm font-thin text-[#717171]'>Check In</p>
                                                        <p className='text-sm font-thin text-[#717171]'>6/29/2023</p>
                                                    </div>
                                                </div>
                                                <div className="p-2 border rounded-tl-[10px] roundeed_class_two">
                                                    <p className='text-sm font-thin text-[#717171]'>Guest</p>
                                                    <p className='text-sm font-thin text-[#717171]'>1 Guest</p>
                                                </div>
                                            </div>
                                            <br />
                                            <button className='w-full mt-4 btn bg-[#329a9a] roundeed_class_three text-white p-4 rounded-[12px]'>
                                                Reserve
                                            </button>

                                            <div className="flex justify-center w-full mt-2">
                                                <p className='text-sm font-thin text-[#717171] text-center mt-[16px]'>
                                                    You won't be charged yet
                                                </p>
                                            </div>
                                            <div className="mt-[16px]">
                                                <div className="flex justify-between">
                                                    <p className='text-sm font-bold text-[#717171] '>
                                                        ${searchedRoomDetail[0]?.info?.price} x 5 night
                                                    </p>
                                                    <p className='text-sm font-bold text-[#717171] '>
                                                        ${searchedRoomDetail[0]?.info?.price * 5}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="border-b">
                                    <br />
                                    <h2 className="text-3xl font-bold text-black mt-7">
                                        Where you’ll be
                                    </h2>
                                    <br />
                                    < p className='text-sm font-thin text-[#717171] mb-3'>
                                        {searchedRoomDetail[0]?.info?.location?.city}, {searchedRoomDetail[0]?.info?.location?.country?.title}
                                    </p>
                                    <br />
                                    {searchedRoomDetail.length ? (
                                        <MapContainer center={[searchedRoomDetail[0]?.info?.location?.lat, searchedRoomDetail[0]?.info?.location?.long]} zoom={10} style={{ height: '100vh', width: '100%' }}>
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution="Map data © OpenStreetMap contributors"
                                            />

                                            <Marker position={[searchedRoomDetail[0]?.info?.location?.lat, searchedRoomDetail[0]?.info?.location?.long]} icon={customIcon} >
                                                <Popup>{searchedRoomDetail[0]?.info?.title}</Popup>
                                            </Marker>

                                        </MapContainer>
                                    ) : ''}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </Layout>
            {isOpen && (

                <div className="fixed top-0 right-0 w-full bg-white images_views">
                    <div className="image_inner">
                        <div className="icon" onClick={closeLightbox} >
                            <FaTimes />
                        </div>
                        {images?.map((item, index) => {
                            return (
                                <div className="image_view" key={index}>
                                    <img src={item?.url} width="100%" alt="" />
                                </div>
                            )
                        })}
                    </div>




                </div>
            )}
        </div>
    )
}

export default RoomDetail