const link = "http://api.weatherapi.com/v1/current.json?key=77bcde5690a04b479fd151212230603&days=1&aqi=yes&alerts=yes";

let store = {
    city: "Armenia",
    name: "",
    temperature: 0,
    localtime:"2023-03-06 00:00 AM",
    isDay: 0,
    description: "",
    img: "",
    properties: {
        cloud: 0, 
        humidity: 0, 
        windSpeed: 0,
        feelslike: 0,
        uv: 0,
        pressure: 0,
    }
}
let description =  document.querySelector(".description");
let city = document.querySelector(".city-title");
let icon = document.querySelector(".icon");
let time = document.querySelector(".city-info_subtitle");
let temperature = document.querySelector(".city-info_title");
let propertyIcon = document.querySelector(".property-icon");
let property = document.querySelector("#properties");
let cloud = document.querySelector(".cloud");
let feelsLike = document.querySelector(".feelslike");
let uv = document.querySelector(".uv");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let wind = document.querySelector(".wind");
let list = document.querySelectorAll(".list-group-item");
let weather = document.querySelector(".weather");
let cityName = store.city;
let labele = document.querySelectorAll(".container_label");
let checkBox = document.querySelectorAll(".checkbox")
let create = document.querySelectorAll(".create");
let city_s = document.querySelectorAll(".city-title-sec");
let cityNameItem;
let i;

 for (i = 0; i < list.length; i++) {
create[i].addEventListener("click", (create,cityName) => {  
        cityName=create.target.innerHTML;
        fetchData(cityName);  
 })
 };
 for (i = 0; i < list.length; i++) {
    list[i].addEventListener("click", (list,cityName) => {  
           cityName=list.target.innerHTML;
           fetchData(cityName); 
    })
    };
async function fetchData(cityName)  {
    const result = await fetch(`${link}&q=${cityName}`);
    const data = await result.json();
    console.log(data); 
   
const {
     current: { 
        cloud,
        feelslike_c: feelslike ,
        temp_c: temperature,
        humidity,
        condition: {
            text: description,
            icon: img,
        },
        pressure_mb: pressure,
        uv,
        vis_km: visibility,
        is_day: isDay,
        
        wind_kph: windSpeed, 
     },
     location: { localtime,name,country:city,}
    } = data;
 
   store = {
        ...store,
        city,
        name,
        temperature,
        localtime,
        isDay,
        description,
        img,
        properties: {
            cloud, 
            humidity,
            windSpeed,
            feelslike,
            uv,
            pressure,
            
        }
    };
    renderComponent();
   
}; 

const renderComponent = () => { 
    
    city.innerHTML = `${store.name}`;
    icon.src = `https:${store.img}`;
    description.innerHTML = `${store.description}`;
    time.innerHTML = `as of ${store.localtime}`;
    temperature.innerHTML = `${store.temperature}°C`;

    cloud.innerHTML = `${store.properties.cloud}%`;
    feelsLike.innerHTML = `${store.properties.feelslike}°C`;
    uv.innerHTML = `${store.properties.uv}/100`; 
    humidity.innerHTML = `${store.properties.humidity}%`; 
    pressure.innerHTML = `${store.properties.pressure}hPa`;
    wind.innerHTML = `${store.properties.windSpeed}km/h`;


 };

for (let i=0;i< checkBox.length;i++){
checkBox[i].addEventListener("click", async () => {
    if(checkBox[i].checked == true) {
        console.log("1");
        cityName = labele[i].htmlFor  ;
        console.log(cityName);
        await  fetchData(cityName);
    create[i].innerHTML =   `<div class="city-info row justify-content-between p-3 " style="background-color: #053257;">
                                <div class="top-left col-7">
                                    <div class="city-title-sec" id="city">
                                    <span> ${store.name}</span>
                                    </div>
                                    <div class="city-info_subtitle_sec">as of ${store.localtime}</div>
                                    <div class="property-info-description-sec">${store.description}</div>
                                    
                                </div>

                                <div class=" align-right col-5 text-end">
                                <div class="city-info_title_sec ">${store.temperature}°C</div>
                                
                                <div class="property-info-description-sec">Feels Like ${store.properties.feelslike}°C </div>
                                </div>
                             </div>`
    }else {
        create[i].innerHTML = "";
    }
})};

