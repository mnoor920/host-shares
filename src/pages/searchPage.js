import React, { useState, useEffect } from 'react'
import Layout from '../layout/layout'
import Cards from '../components/cards'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkerIcon from '../assests/marker.png';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    const guest = searchParams.get('guest');
    const customIcon = L.icon({
        iconUrl: MarkerIcon,
        iconSize: [25, 25], // Set the desired size of the icon
    });
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

    const searchedRoom = data.filter((item) => {
        return (
            item?.info.location.city == city && item?.info.maxGuestCapacity == guest
        );
    });

    const locations = searchedRoom?.map(obj => ({ lat: obj?.info?.location?.lat, lng: obj?.info?.location?.long, city: obj?.info?.title }));
    return (
        <Layout data={data} category={category} >

            <div className="">
                {isLoading ? (
                    <div className="placeholder-container">
                        <div className="placeholder-box"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-5 max-w-[1250px] m-auto gap-4 px-2">
                        {searchedRoom.length ? (
                            <>
                                <div className="col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 max-w-[1250px] m-auto gap-4">
                                        {searchedRoom?.map((item) => {
                                            return (
                                                <Cards item={item?.info} />
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="sticky top-0">
                                        {locations.length ? (
                                            <MapContainer center={[locations[0]?.lat, locations[0]?.lng]} zoom={10} style={{ height: '100vh', width: '100%' }}>
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution="Map data © OpenStreetMap contributors"
                                                />
                                                {locations?.map((location, index) => (
                                                    <Marker key={index} position={[location?.lat, location?.lng]} icon={customIcon} >
                                                        <Popup>{location?.city}</Popup>
                                                    </Marker>
                                                ))}
                                            </MapContainer>
                                        ) : ''}

                                    </div>
                                </div>
                            </>
                        ) :
                            <h2>
                                Room Not Found
                            </h2>
                        }

                    </div>
                )}
            </div>


        </Layout>
    )
}

export default SearchPage