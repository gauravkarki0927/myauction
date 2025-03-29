import React, { useState } from 'react'
import pic from '../pictures/user.svg';

function Signup() {

    const [state, setState] = useState("");
    const [districts, setDistricts] = useState([]);

    const states = [
        { value: "koshi", label: "KOSHI" },
        { value: "madheshpradesh", label: "MADESH PRADESH" },
        { value: "bagmati", label: "BAGMATI" },
        { value: "gandaki", label: "GANDAKI" },
        { value: "lumbini", label: "LUMBINI" },
        { value: "karnali", label: "KARNALI" },
        { value: "sudurpaschim", label: "SUDURPASCHIM" },
    ];

    const districtOptions = {
        koshi: [
            "TAPLEJUNG",
            "TERHRATHUM",
            "PANCHTHAR",
            "SANKHUWASABHA",
            "SOLUKHUMBU",
            "BHOJPUR",
            "KHOTANG",
            "ILLAM",
            "UDAYAPUR",
            "OKHALDHUNGA",
            "JHAPA",
            "DHANKUTA",
            "MORANG",
            "SUNSARI",
        ],
        madheshpradesh: [
            "PARSA",
            "BARA",
            "RAUTAHAT",
            "SARLAHI",
            "MAHOTTARI",
            "DHANUSHA",
            "SIRAHA",
            "SAPTARI",
        ],
        bagmati: [
            "KATHMANDU",
            "LALITPUR",
            "BHAKTAPUR",
            "KAVRE",
            "SINDUPALCHOWK",
            "DOLAKHA",
            "DHADING",
            "NUWAKOT",
            "MAKWANPUR",
            "RASUWA",
            "RAMECHHAP",
            "CHITWAN",
            "SINDHULI",
        ],
        gandaki: [
            "KASKI",
            "GORKHA",
            "NAWALPUR",
            "PARBHAT",
            "TANAHU",
            "BAGLUNG",
            "MYAGDI",
            "LAMJUNG",
            "SYANGJA",
            "MANANG",
            "MUSTANG",
        ],
        lumbini: [
            "PARASI",
            "DANG",
            "GULMI",
            "KAPILVASTU",
            "ARGHAKACHI",
            "PALPA",
            "RUKUM EAST",
            "PYUTHAN",
            "BANKE",
            "BARDIYA",
            "RUPANDEHI",
            "ROLPA",
        ],
        karnali: [
            "RUKUM WEST",
            "MUGU",
            "DAILEKH",
            "DOLPA",
            "JUMLA",
            "JAJARKOT",
            "KALIKOT",
            "SALYAN",
            "SURKHET",
            "HUMLA",
        ],
        sudurpaschim: [
            "KAILALI",
            "KANCHANPUR",
            "ACHHAM",
            "DADELDHURA",
            "DOTI",
            "DARCHULA",
            "BAJHANG",
            "BAJURA",
            "BAITADI",
        ],
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        setDistricts(districtOptions[selectedState] || []);
    };

    return (
        <>
            <div class="mx-20 my-10 flex justify-center">
                <div class="w-full max-w-4xl">
                    <div class="shadow-lg bg-white rounded-lg">
                        <div class="p-6">
                            <div className="flex flex-col items-center">
                                <img className="w-20" src={pic} alt="Product Image" />
                                <p className="text-center font-semibold text-[24px] xl:text-[32px] md:text[28px]"> <a href="/"><span className="text-rose-700">My</span>Auction</a> </p>
                            </div>
                            <form id="registrationForm">

                                <div class="mb-4">
                                    <label for="name" class="block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your full name"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                        required
                                    />
                                    <p class="mt-1 text-sm text-red-500">Please enter your full name.</p>
                                </div>
                                <div class="mb-4">
                                    <label for="email" class="block text-sm font-medium">Email address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                        required
                                    />
                                    <p class="mt-1 text-sm text-red-500">Please enter a valid email address.</p>
                                </div>
                                <div class="mb-4">
                                    <label for="phone" class="block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="phone"
                                        placeholder="Enter your number"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                        required
                                    />
                                    <p class="mt-1 text-sm text-red-500">Please enter a valid contact information.</p>
                                </div>
                                <div class="mb-4">
                                    <label for="dob" class="block text-sm font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                        required
                                    />
                                </div>
                                <div class="mb-4">
                                    <label for="profileImage" class="block text-sm font-medium">Profile Image</label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="image/*"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Country</label>
                                    <input
                                        type="text"
                                        value="Nepal"
                                        disabled
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                    />
                                    <input type="hidden" name="country" value="Nepal" />
                                </div>


                                <div class="mb-4">
                                    <label className="block text-sm font-medium" htmlFor="state">
                                        State
                                    </label>
                                    <select
                                        name="state"
                                        id="state"
                                        onChange={handleStateChange}
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                    >
                                        <option value="">-Choose state-</option>
                                        {states.map((s) => (
                                            <option key={s.value} value={s.value}>
                                                {s.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div class="mb-4">
                                    <label className="block text-sm font-medium" htmlFor="district">
                                        District
                                    </label>
                                    <select
                                        name="district"
                                        id="district"
                                        class="w-full mt-1 border-gray-300 outline-none p-2 rounded shadow-sm border border-gray-100"
                                    >
                                        <option value="">-Choose district-</option>
                                        {districts.map((d, index) => (
                                            <option key={index} value={d.toLowerCase()}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div class="w-full flex justify-between px-4">
                                    <p className="">Already have an account?<a href="/login" className="text-blue-500 italic"> Login here</a></p>
                                    <button
                                        type="submit"
                                        class="px-2 py-1 bg-black text-white cursor-pointer rounded"
                                    >
                                        Signup
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
