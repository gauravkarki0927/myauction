import React, {useState} from 'react'
import axios from 'axios'

function Contact() {
    const [msg, setMsg] = useState('');
    const [user, setUser] = useState({
        to: "",
        subject:"",
        message: ""
    
    });

    const {to, subject, message} = user;

    const [status, setStatus] = useState('');

    const onInputChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:3000/sendMail/", user);
            setStatus(response.data.status);
            setMsg(response.data.respMesg);
        } catch (error) {
            setStatus(false);
            setMsg("Network error try again later!");
        }
    };
    
    

    return (
        <>
            <section className="bg-white" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <p className="text-base font-semibold uppercase tracking-wide text-gray-800">
                                Contact
                            </p>
                            <h2
                                className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                                Get in Touch
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-900">Let us know your concern
                                
                            </p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg text-gray-900">
                                    You can visit us at anytime, we are always at your service or contact us from anywhere. Our working time is given below so feel free to let us know about your concern.
                                </p>
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-800 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path
                                                    d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Our Address
                                            </h3>
                                            <p className="text-gray-700">32900 Divertole Chowk Butwal</p>
                                            <p className="text-gray-700">Rupandehi, Nepal</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-800 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" className="h-6 w-6">
                                                <path
                                                    d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                                </path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Contact
                                            </h3>
                                            <p className="text-gray-700">Mobile: +1 (123) 456-7890</p>
                                            <p className="text-gray-700">Mail: tailnext@gmail.com</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-800 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">Working
                                                hours</h3>
                                            <p className="text-gray-700">Monday - Friday: 08:00 - 17:00</p>
                                            <p className="text-gray-700">Saturday &amp; Sunday: 08:00 - 12:00</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                                <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
                                <p className={`py-2 text-center ${status ? "text-green-600" : "text-red-600"}`}>{msg}</p>
                                <form id="contactForm">
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label for="name" className="pb-1 text-gray-800 text-xs uppercase tracking-wider"></label><input onChange={onInputChange} type="text" name="subject" autocomplete="given-name" placeholder="Your name" className="mb-2 w-full outline-none rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-900 sm:mb-0" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label for="email" className="pb-1 text-gray-800 text-xs uppercase tracking-wider"></label><input onChange={onInputChange} type="email" name="to" autocomplete="email" placeholder="Your email address" className="mb-2 w-full outline-none rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-900 sm:mb-0" />
                                            </div>
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label for="textarea" className="pb-1 text-gray-800 text-xs uppercase tracking-wider"></label><textarea onChange={onInputChange} id="textarea" name="message" cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full outline-none rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md text-gray-900 sm:mb-0"></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onSubmit} type="submit" className="w-full bg-black cursor-pointer text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
