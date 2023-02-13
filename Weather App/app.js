window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperratureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')





    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com";
            const apiKEY = 'd0acb85066607cda4a9600dd25bb841d';

            const api = `https://api.open-meteo.com/v1/forecast?latitude=44.19&longitude=28.62&hourly=temperature_2m,precipitation&daily=sunrise,sunset&timezone=auto`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { timezone } = data;

                    //Set DOM Elements from the API
                    locationTimezone.textContent = timezone;
                    let arr = data.hourly.time;
                    const date = new Date();


                    for (let i = 0; i < arr.length; i++) {

                        if ((arr[i].substring(8, 10) == date.getDate()) && (parseInt(arr[i].substring(5, 7)) == date.getMonth() + 1) && (arr[i].substring(11, 13) == date.getHours())) {
                            temperatureDegree.textContent = data.hourly.temperature_2m[i]
                            var fahrenheit = ((data.hourly.temperature_2m[i]) * 9 / 5 + 32).toFixed(2)
                        }
                    }

                    //Change temp to Celsius/Fahrenheit
                    temperatureSection = addEventListener('click', () => {
                        temperratureSection.addEventListener('click', () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C"
                                temperatureDegree.textContent = ((fahrenheit - 32) * 5 / 9).toFixed(2)

                            } else {
                                temperatureSpan.textContent = "F"
                                temperatureDegree.textContent = fahrenheit
                            }
                        });
                    });


                    setIcons(document.querySelector(".icon"))



                });



        });


    }
    function setIcons(iconID) {
        const skycons = new Skycons({ color: "white" })
        const currentIcon = "PARTIALY_CLOUDY_DAY"
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }



});
