import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ data }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [city, setCity] = useState('');
    const [guest, setGuest] = useState(1);
    const navigate = useNavigate();

    const handleInputNumberChange = (e) => {
        let value = parseInt(e.target.value);

        if (isNaN(value) || value < 1) {
            value = 1;
        }

        setGuest(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams();
        searchParams.append('city', city);
        searchParams.append('guest', guest);

        const queryString = searchParams.toString();
        navigate(`/search?${queryString}`);
    };

    const cityName = [...new Set(data?.map(obj => obj?.info?.location?.city))];

    console.log("City name", cityName)
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1250px] m-auto gap-4 px-2">
                        <div className="w-full">
                            <select id="countries" value={city}
                                onChange={(e) => setCity(e.target.value)} className="h-[50px] bg-gray-50 border border-gray-300 text-[#329a9a] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#329a9a] dark:border-[#329a9a] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a City</option>
                                {cityName?.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}


                            </select>
                        </div>
                        <div className="">
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}

                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                                <input
                                    type="number"
                                    value={guest}
                                    onChange={handleInputNumberChange}
                                    className="mr-2 h-[50px] bg-gray-50 border border-gray-300 text-[#329a9a] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#329a9a] dark:border-[#329a9a] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />

                            </div>

                            <button className='h-[50px] bg-[#329a9a] rounded-xl text-white'>
                                Search
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>

    )
}

export default SearchForm