import React, { useEffect, useState } from 'react'
import Layout from "../layout/layout"
import Cards from '../components/cards'
const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://file.notion.so/f/s/24643894-e5c3-4c40-974a-52594f581e03/listings.json?id=f795dab6-14d4-48a9-9567-c72151d311a2&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&expirationTimestamp=1685614360897&signature=y6gaECGUjdM-q0HwDbbkB9Y8u5PGGy_ObUlQxFjpLo0&downloadName=listings.json');
                const jsonData = await response.json();
                setData(jsonData && jsonData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log("all data", data)

    return (
        <div>
            <Layout data={data}>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 max-w-[1250px] m-auto gap-4 px-2">
                    {data?.map((item) => {
                        return (
                            <Cards item={item?.info} />
                        )
                    })}

                </div>
            </Layout>
        </div>
    )
}

export default Home