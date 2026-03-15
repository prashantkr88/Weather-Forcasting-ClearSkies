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

const allLocations = Object.keys(indianLocations).concat(...Object.values(indianLocations));

// Fetch Weather Data
function fetchWeatherData(location) {
    const isValidLocation = allLocations.some(loc => loc.toLowerCase() === location.toLowerCase());
    if (!isValidLocation) {
        document.getElementById('current-location').textContent = 'Invalid Location';
        document.getElementById('current-temp').textContent = '-';
        document.getElementById('current-condition').textContent = '-';
        document.getElementById('current-humidity').textContent = '-';
        document.getElementById('current-wind').textContent = '-';
        document.getElementById('sunrise').textContent = '-';
        document.getElementById('sunset').textContent = '-';
        document.getElementById('aqi').textContent = '-';
        document.getElementById('alerts').textContent = 'No alerts (Invalid location)';
        document.getElementById('forecast-list').innerHTML = '<p>Forecast unavailable for invalid location.</p>';
        document.getElementById('aqi-location').textContent = 'Invalid Location';
        document.getElementById('aqi-value').textContent = '-';
        document.getElementById('aqi-category').textContent = '-';
        document.getElementById('pm25').textContent = '-';
        document.getElementById('pm10').textContent = '-';
        document.getElementById('so2').textContent = '-';
        document.getElementById('no2').textContent = '-';
        document.getElementById('o3').textContent = '-';
        document.getElementById('co').textContent = '-';
        return;
    }

    document.getElementById('current-location').textContent = location || 'Pune';
    document.getElementById('current-temp').textContent = '25';
    document.getElementById('current-condition').textContent = 'Partly Cloudy';
    document.getElementById('current-humidity').textContent = '60';
    document.getElementById('current-wind').textContent = '10';
    document.getElementById('sunrise').textContent = '06:00 AM';
    document.getElementById('sunset').textContent = '06:30 PM';
    const aqiValue = Math.floor(Math.random() * 501);
    let aqiCategory;
    if (aqiValue <= 50) aqiCategory = 'Good';
    else if (aqiValue <= 100) aqiCategory = 'Moderate';
    else if (aqiValue <= 150) aqiCategory = 'Unhealthy for Sensitive Groups';
    else if (aqiValue <= 200) aqiCategory = 'Unhealthy';
    else if (aqiValue <= 300) aqiCategory = 'Very Unhealthy';
    else aqiCategory = 'Hazardous';
    document.getElementById('aqi').textContent = `${aqiValue} (${aqiCategory})`;

    // Check and display alerts
    checkAlerts(location);

    // 5-Day Weather Forecast
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';
    const forecastData = [
        { day: 'Today', minTemp: 22, maxTemp: 28, condition: 'Sunny' },
        { day: 'Tomorrow', minTemp: 20, maxTemp: 25, condition: 'Cloudy' },
        { day: 'Day 3', minTemp: 18, maxTemp: 22, condition: 'Rainy' },
        { day: 'Day 4', minTemp: 21, maxTemp: 26, condition: 'Partly Cloudy' },
        { day: 'Day 5', minTemp: 23, maxTemp: 27, condition: 'Sunny' }
    ];
    forecastData.forEach(data => {
        const day = document.createElement('div');
        day.className = `forecast-day ${data.condition.toLowerCase().replace(' ', '-')}`;
        day.innerHTML = `<p>${data.day}: ${data.minTemp}°C - ${data.maxTemp}°C, ${data.condition} <i class="fas fa-${data.condition.toLowerCase().replace(' ', '-')}"></i></p>`;
        forecastList.appendChild(day);
    });

    // Air Quality Index Data
    document.getElementById('aqi-location').textContent = location || 'Pune';
    document.getElementById('aqi-value').textContent = aqiValue;
    document.getElementById('aqi-category').textContent = aqiCategory;
    document.getElementById('pm25').textContent = (Math.random() * 150).toFixed(1);
    document.getElementById('pm10').textContent = (Math.random() * 100).toFixed(1);
    document.getElementById('so2').textContent = (Math.random() * 20).toFixed(1);
    document.getElementById('no2').textContent = (Math.random() * 50).toFixed(1);
    document.getElementById('o3').textContent = (Math.random() * 20).toFixed(1);
    document.getElementById('co').textContent = (Math.random() * 5).toFixed(1);
}

// Check Weather Alerts
function checkAlerts(location) {
    const alerts = document.getElementById('alerts');
    if (!allLocations.some(loc => loc.toLowerCase() === location.toLowerCase())) {
        alerts.textContent = 'No alerts (Invalid location)';
        return;
    }
    const alertTypes = ['Heavy Rain', 'Strong Winds', 'Heatwave', 'Cold Wave', 'Thunderstorms'];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    alerts.textContent = `${randomAlert} Expected in ${location}!`;
}

// Initial Load
fetchWeatherData('Pune');