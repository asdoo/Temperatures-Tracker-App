const STATION_IDS = {
    "Elobour": "EGM00062337",
    "October": "EGM00062338"
};

async function fetchWeather() {
    const city = document.getElementById('citySelect').value;
    const date = document.getElementById('dateInput').value;

    if (!city || !date) {
        alert("Please select both city and date");
        return;
    }

    try {
        const url = `https://www.ncei.noaa.gov/access/services/data/v1?dataset=daily-summaries&stations=${STATION_IDS[city]}&startDate=${date}&endDate=${date}&dataTypes=TMIN,TMAX&units=metric&format=json`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.length > 0) {
            document.getElementById('minTemp').textContent = data[0].TMIN || 'N/A';
            document.getElementById('maxTemp').textContent = data[0].TMAX || 'N/A';
            document.getElementById('cityName').textContent = `${city} City`;
            document.getElementById('dateDisplay').textContent = date;
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data");
    }
}