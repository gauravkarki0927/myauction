import React, { useState, useEffect } from "react";

const TimeDifference = () => {
    const [targetTime, setTargetTime] = useState(""); // State for the user-input time
    const [remainingTime, setRemainingTime] = useState("");

    // Function to calculate the remaining time
    const calculateRemainingTime = () => {
        const now = new Date(); // Get current time
        const target = new Date(targetTime); // Convert user-input time to Date object

        // Calculate the difference in milliseconds
        const difference = target - now;

        if (difference > 0) {
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
        } else {
            setRemainingTime("Time has passed!");
        }
    };

    // Automatically update the remaining time every second
    useEffect(() => {
        if (targetTime) {
            const interval = setInterval(calculateRemainingTime, 1000);
            return () => clearInterval(interval); // Clear interval on component unmount
        }
    }, [targetTime]);

    return (
        <div>
            <h1>Time Difference Calculator</h1>

            {/* Input for target time */}
            <input
                type="datetime-local"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
            />

            {/* Display remaining time */}
            <p>Remaining Time: {remainingTime}</p>
        </div>
    );
};

export default TimeDifference;
