import React, { useEffect, useState } from 'react';
import API from '../api/API';

function Recipts() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        API.get('/getcheckout')
            .then(response => setRecords(response.data))
            .catch(error => console.error('Error fetching checkout records:', error));
    }, []);
    return (
        <>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">User</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Phone</th>
                        <th className="py-3 px-6 text-left">District</th>
                        <th className="py-3 px-6 text-left">Street</th>
                        <th className="py-3 px-6 text-left">Postal</th>
                        <th className="py-3 px-6 text-left">PID</th>
                        <th className="py-3 px-6 text-left">Total</th>
                        <th className="py-3 px-6 text-left">Payment Id</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {records.map((record, index) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={index + 1}>
                            <td className="py-3 px-6 text-left">{record.user_name}</td>
                            <td className="py-3 px-6 text-left">{record.email}</td>
                            <td className="py-3 px-6 text-left">{record.phone}</td>
                            <td className="py-3 px-6 text-left">{record.district}</td>
                            <td className="py-3 px-6 text-left">{record.street}</td>
                            <td className="py-3 px-6 text-left">{record.postal_code}</td>
                            <td className="py-3 px-6 text-left">{record.pid || "—"}</td>
                            <td className="py-3 px-6 text-left font-semibold text-green-700">{record.price || "Rs 0.00"}</td>
                            <td className="py-3 px-6 text-left">{record.payment_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </>
    )
}

export default Recipts
