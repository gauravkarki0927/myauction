import { React, useEffect } from "react"
import { useLocation } from 'react-router-dom';


function Esewasuccess() {

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encodedData = queryParams.get('data');

        if (encodedData) {
            try {
                const decoded = atob(encodedData); // Decode Base64
                const parsed = JSON.parse(decoded); // Parse JSON
                console.log('Transaction Data:', parsed);

                if (parsed) {
                    fetch('http://localhost:3000/submitTransaction', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            payment_id: parsed.transaction_code,
                            tuid: parsed.transaction_uuid,
                        }),
                    })
                        .then((res) => res.json())
                        .then((responseData) => {
                            console.log('Submission response:', responseData);
                        })
                        .catch((error) => {
                            console.error('Error submitting pid:', error);
                        });
                }

            } catch (error) {
                console.error('Error decoding transaction data:', error);
            }
        }

    }, [location.search]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-2xl p-4 bg-white shadow-2xl sm:p-10 sm:rounded-3xl">
                    <div className="text-center">
                        <div className="flex items-center justify-center mx-auto mb-6 rounded-full">
                            <i className="fa-solid fa-circle-check text-7xl text-green-600"></i>
                        </div>
                        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">Payment Successful!</h1>
                        <p className="mt-4 text-lg text-gray-800">
                            Thank you for your time.
                        </p>
                        <p className="mt-6 text-xl text-blue-600">
                            Your purchase will be sent to your address timely.
                        </p>
                        <p className="mt-4 text-sm text-gray-700">
                            If you have any questions or need further assistance, feel free to contact us at:
                            <a href="mailto:admin@eliteai.tools" className="font-medium text-indigo-600 dark:text-indigo-400 underline">
                                myproject.gk01@gmail.com
                            </a>
                        </p>
                    </div>
                    <div className="mt-8 text-center">
                        <a href="/access/userdash"
                            className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Esewasuccess
