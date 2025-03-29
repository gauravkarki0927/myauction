import React, { useState } from "react";

function LocationForm() {
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
        <div className="p-4 max-w-lg mx-auto bg-white shadow rounded">
           <div className="mb-b">
           <label className="block font-medium mb-2">Country</label>
            <input
                type="text"
                value="Nepal"
                disabled
                className="w-full border-gray-300 rounded p-2 mb-4 border border-gray-100"
            />
            <input type="hidden" name="country" value="Nepal" />
           </div>

           
            <div class="mb-4">
            <label className="block font-medium mb-2" htmlFor="state">
                State
            </label>
            <select
                name="state"
                id="state"
                onChange={handleStateChange}
                className="w-full border-gray-300 rounded p-2 mb-4 border border-gray-100"
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
            <label className="block font-medium mb-2" htmlFor="district">
                District
            </label>
            <select
                name="district"
                id="district"
                className="w-full border-gray-300 rounded p-2 mb-4 border border-gray-100"
            >
                <option value="">-Choose district-</option>
                {districts.map((d, index) => (
                    <option key={index} value={d.toLowerCase()}>
                        {d}
                    </option>
                ))}
            </select>
            </div>
        </div>
    );
}

export default LocationForm;
