// Weather Converter
const convertBtn = document.getElementById('convert-btn');
const tempInput = document.getElementById('temp-input');
const unitFrom = document.getElementById('unit-from');
const unitTo = document.getElementById('unit-to');
const convertedResult = document.getElementById('converted-result');

// Weather Converter Logic
convertBtn.addEventListener('click', () => {
    const temp = parseFloat(tempInput.value);
    if (isNaN(temp)) {
        convertedResult.textContent = 'Result: Please enter a valid number';
        return;
    }
    let result;
    switch (unitFrom.value + '-' + unitTo.value) {
        case 'celsius-fahrenheit':
            result = (temp * 9/5) + 32;
            break;
        case 'fahrenheit-celsius':
            result = (temp - 32) * 5/9;
            break;
        case 'celsius-kelvin':
            result = temp + 273.15;
            break;
        case 'kelvin-celsius':
            result = temp - 273.15;
            break;
        case 'fahrenheit-kelvin':
            result = (temp - 32) * 5/9 + 273.15;
            break;
        case 'kelvin-fahrenheit':
            result = (temp - 273.15) * 9/5 + 32;
            break;
        default:
            result = temp;
    }
    convertedResult.textContent = `Result: ${result.toFixed(2)} ${unitTo.value === 'celsius' ? '°C' : unitTo.value === 'fahrenheit' ? '°F' : 'K'}`;
});

// UV Index Calculator
const calcUvBtn = document.getElementById('calc-uv-btn');
const uvLocation = document.getElementById('uv-location');
const uvTime = document.getElementById('uv-time');
const uvResult = document.getElementById('uv-result');

// AQI Calculator
const calcAqiBtn = document.getElementById('calc-aqi-btn');
const aqiLocation = document.getElementById('aqi-location');
const aqiResult = document.getElementById('aqi-result');

// List of Indian states and major cities
const indianLocations = {
    "Andhra Pradesh": ["Amaravati", "Visakhapatnam", "Kurnool", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar", "Tawang"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
    "Goa": ["Panaji", "Margao"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Chandigarh", "Faridabad", "Gurugram"],
    "Himachal Pradesh": ["Shimla", "Dharamshala"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar"],
    "West Bengal": ["Kolkata", "Siliguri", "Durgapur"]
};

// Flatten the list for easier validation
const allLocations = Object.keys(indianLocations).concat(...Object.values(indianLocations));

// UV Calculator Logic with Validation
calcUvBtn.addEventListener('click', () => {
    const location = uvLocation.value.trim().toLowerCase();
    const time = uvTime.value;
    if (!location || !time) {
        uvResult.textContent = 'UV Index: Please enter location and time';
        return;
    }
    if (!allLocations.some(loc => loc.toLowerCase() === location)) {
        uvResult.textContent = 'UV Index: Invalid location. Please enter a valid Indian state or city.';
        return;
    }
    // Placeholder UV calculation (random value 0-11)
    const uvIndex = Math.floor(Math.random() * 12);
    uvResult.textContent = `UV Index: ${uvIndex}`;
});

// AQI Calculator Logic with Validation
calcAqiBtn.addEventListener('click', () => {
    const location = aqiLocation.value.trim().toLowerCase();
    if (!location) {
        aqiResult.textContent = 'AQI: Please enter a location';
        return;
    }
    if (!allLocations.some(loc => loc.toLowerCase() === location)) {
        aqiResult.textContent = 'AQI: Invalid location. Please enter a valid Indian state or city.';
        return;
    }
    // Placeholder AQI calculation (random value 0-500)
    const aqiValue = Math.floor(Math.random() * 501);
    let aqiCategory;
    if (aqiValue <= 50) aqiCategory = 'Good';
    else if (aqiValue <= 100) aqiCategory = 'Moderate';
    else if (aqiValue <= 150) aqiCategory = 'Unhealthy for Sensitive Groups';
    else if (aqiValue <= 200) aqiCategory = 'Unhealthy';
    else if (aqiValue <= 300) aqiCategory = 'Very Unhealthy';
    else aqiCategory = 'Hazardous';
    aqiResult.textContent = `AQI: ${aqiValue} (${aqiCategory})`;
});