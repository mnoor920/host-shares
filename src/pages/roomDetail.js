import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Layout from "../layout/layout"
import { FaStar } from 'react-icons/fa'

const RoomDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://file.notion.so/f/s/24643894-e5c3-4c40-974a-52594f581e03/listings.json?id=f795dab6-14d4-48a9-9567-c72151d311a2&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&expirationTimestamp=1685614360897&signature=y6gaECGUjdM-q0HwDbbkB9Y8u5PGGy_ObUlQxFjpLo0&downloadName=listings.json');
                const jsonData = await response.json();
                setData(jsonData && jsonData.data);
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
    console.log("Resutl data", searchedRoomDetail[0])

    return (
        <div>
            <Layout data={data}>
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
                                        <div className="absolute w-[170px] flex justify-center items-center hover:cursor-pointer h-[30px] bg-white right-8 bottom-8 rounded-xl">
                                            Show All Images
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="my-8">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="col-span-2">
                                        <div className="flex justify-between">
                                            <h2 className="mr-2 text-3xl font-bold text-black">
                                                Room in a cottage hosted by {searchedRoomDetail[0]?.info?.host?.name}
                                            </h2>
                                            <img src={searchedRoomDetail[0]?.info?.host?.avatar?.url} className='w-[40px] h-[40px] rounded-full' alt="" />
                                        </div>
                                    </div>
                                    <div className="">

                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </Layout>
        </div>
    )
}

export default RoomDetail