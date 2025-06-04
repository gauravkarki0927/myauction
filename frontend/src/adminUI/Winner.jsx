import { React, useState, useEffect } from 'react'
import axios from 'axios'
import profilePicSrc from '../pictures/user.jpg';

function Winner() {

    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/winners');
                setWinners(response.data);
            } catch (err) {
                alert('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div id="records" className="overflow-x-auto bg-white p-2">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-800 uppercase text-[13px] leading-normal">
                            <th className="py-3 px-6 text-left">UID</th>
                            <th className="py-3 px-6 text-left">Profile</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Product Image</th>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Product Type</th>
                            <th className="py-3 px-6 text-left">Final Price</th>
                            <th className="py-3 px-6 text-left">Submitted At</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {winners.map(winner => {
                            return (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={`${winner.user_id}-${winner.productName}-${winner.submitted}`}>
                                    <td className="py-3 px-6 text-left">{winner.user_id}</td>
                                    <td className="py-3 px-6 text-left">
                                        <img className="h-12" src={winner.user_profile ? `http://localhost:3000/uploads/${winner.user_profile}` : profilePicSrc} alt="" />
                                    </td>
                                    <td className="py-3 px-6 text-left">{winner.user_name}</td>
                                    <td className="py-3 px-6 text-left">{winner.user_email}</td>
                                    <td className="py-3 px-6 text-left">
                                        {JSON.parse(winner.proImage)[0] && (
                                            <img
                                                className="w-full"
                                                src={`http://localhost:3000/productImage/${JSON.parse(winner.proImage)[0]}`}
                                                alt="Product Image"
                                            />
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left">{winner.productName}</td>
                                    <td className="py-3 px-6 text-left">{winner.type}</td>
                                    <td className="py-3 px-6 text-left">{winner.price}</td>
                                    <td className="py-3 px-6 text-left">
                                        {new Date(winner.submitted).toLocaleString('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        })}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Winner
