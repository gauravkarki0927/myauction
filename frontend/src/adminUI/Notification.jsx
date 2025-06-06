import { React, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BASE_URL } from '../api/BaseUrrlForImage.js';
import API from '../api/API';

function Notification() {

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get('/getApproves');
                setProducts(response.data);
            } catch (err) {
                toast.error('Error fetching products', { position: "top-right" });
            }
        };

        fetchProduct();
    }, []);


    function getRelativeTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const units = [
            { name: 'month', seconds: 2592000 },
            { name: 'week', seconds: 604800 },
            { name: 'day', seconds: 86400 },
            { name: 'hour', seconds: 3600 },
            { name: 'minute', seconds: 60 },
            { name: 'second', seconds: 1 }
        ];

        for (let unit of units) {
            const count = Math.floor(diffInSeconds / unit.seconds);
            if (count >= 1) {
                return `${count} ${unit.name}${count > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    const handleCheckboxChange = (id) => {
        setSelectedProducts(prev =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectAll(prev => {
            const newValue = !prev;
            setSelectedProducts(newValue ? products.map(p => p.product_id) : []);
            return newValue;
        });
    };

    const markAsRead = async () => {
        try {
            await API.post('/markAsRead', { ids: selectedProducts });
            toast.success('Marked as read', { position: "top-right" });

            setProducts(prev =>
                prev.map(p =>
                    selectedProducts.includes(p.product_id)
                        ? { ...p, read_as: 1 }
                        : p
                )
            );

            setSelectedProducts([]);
            setSelectAll(false);
        } catch (err) {
            toast.error('Error updating read status', { position: "top-right" });
        }
    };

    return (
        <>
            <div className="p-2 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 px-4 py-2 w-full">
                    <div className="text-red-500 text-[18px] sm:text-[20px] font-bold">
                        All Notifications
                    </div>

                    <div className="text-yellow-500 text-sm sm:text-[14px] flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="accent-yellow-500"
                            />
                            <span>Mark all</span>
                        </label>

                        <button
                            className="px-3 py-1 border border-blue-200 rounded text-green-500 cursor-pointer hover:bg-green-500 hover:text-white transition duration-150"
                            type="button"
                            onClick={markAsRead}
                            disabled={selectedProducts.length === 0}
                        >
                            Mark as Read
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full table-auto">
                        <tbody className="text-gray-700 text-sm">
                            {products.map(prods => (
                                <tr className="border-b border-gray-200" key={prods.product_id}>
                                    <td colSpan="2" className="py-3 px-2">
                                        <div
                                            className={`relative w-full p-3 rounded flex flex-col sm:flex-row sm:gap-4 gap-2 items-start sm:items-center justify-start ${prods.read_as == 0 ? 'bg-gray-300' : 'bg-gray-100'}`}
                                        >
                                            <div className="absolute sm:static top-2 right-2 sm:mr-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(prods.product_id)}
                                                    onChange={() => handleCheckboxChange(prods.product_id)}
                                                    className="accent-blue-500"
                                                />
                                            </div>

                                            {JSON.parse(prods.proImage)[0] && (
                                                <img
                                                    className="w-24 h-20 sm:w-20 sm:h-16 object-cover rounded-sm ml-6 sm:ml-0"
                                                    src={`${BASE_URL}/productImage/${JSON.parse(prods.proImage)[0]}`}
                                                    alt="Product Image"
                                                />
                                            )}

                                            {/* Text Content */}
                                            <div className="flex-1 w-full flex flex-col gap-1 sm:ml-2">
                                                <div className="text-base sm:text-lg font-semibold font-serif text-white dark:text-black">
                                                    {prods.productName}
                                                </div>

                                                <p className="text-sm text-gray-600 dark:text-gray-600">
                                                    {prods.approve == 0
                                                        ? `${prods.user_name} has posted a new product ID:${prods.product_id} and is waiting for admin approval`
                                                        : `${prods.user_name} has requested to update the details of their product ID:${prods.product_id} and is waiting for admin approval`}
                                                </p>

                                                <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-700 text-right">
                                                    {getRelativeTime(prods.recorded)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
        </>
    )
}

export default Notification
