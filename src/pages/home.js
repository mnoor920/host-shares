import React, { useEffect, useState } from 'react'
import Layout from "../layout/layout"
import Cards from '../components/cards'
const Home = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
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

    console.log("all data", data)
    console.log("all categories", category)

    return (
        <div>
            <Layout data={data} category={category} >

                <div className="">
                    {isLoading ? (
                        <div className="placeholder-container">
                            <div className="placeholder-box"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 max-w-[1250px] m-auto gap-4 px-2">
                            {data?.map((item) => {
                                return (
                                    <Cards item={item?.info} />
                                )
                            })}

                        </div>
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default Home