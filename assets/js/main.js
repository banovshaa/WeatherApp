let API_KEY='856ae3cdc54570a793ea7f60cc3ba275'
let input=document.querySelector('.search input')
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
CurrentTime()
function CurrentTime() {
    document.querySelector('.time').innerHTML=`
    <div>
        <span id="hour">${new Date().getHours()}</span>:<span id="minute">${new Date().getMinutes()}</span>
     </div>
    <span id="am-pm">${new Date().getHours() >=12 ? 'PM' : 'AM'}</span> 
  `
}
setInterval(CurrentTime(), 1000);
document.querySelector('#thisDay').innerHTML=days[new Date().getDay()]
document.querySelector('#thisDayNum').innerHTML=new Date().getDate()
document.querySelector('#thisMonth').innerHTML=months[new Date().getMonth()]
input.addEventListener('change',()=>{
   let value=input.value;
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric`)
   .then(result=>result.json())
   .then(data=>{
    console.log(data.name);
    document.querySelector('#country').innerHTML=data.sys.country
    document.querySelector('#city').innerHTML=data.name
    document.querySelector('#lat').innerHTML=data.coord.lat
    document.querySelector('#lon').innerHTML=data.coord.lon
    document.querySelector('.today span').innerHTML=data.main.temp
    document.querySelector('.detail p').innerHTML=data.weather[0].description
    document.querySelector('#humidity').innerHTML=data.main.humidity
    document.querySelector('#pressure').innerHTML=data.main.pressure
    document.querySelector('#wind').innerHTML=data.wind.speed
    document.querySelector('#rise').innerHTML=window.moment(data.sys.sunrise * 1000).format('HH:mm a')
    document.querySelector('#set').innerHTML=window.moment(data.sys.sunset * 1000).format('HH:mm a')
    
   })
   .catch(error=>console.log(error))
})
/*latitude
: 
40.3755097
longitude
: 
49.9643125*/
const successCallback=(position)=>{
    //${position.coords.latitude}&lon=${position.coords.longitude}
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b1dea66c38f0ed97a60cc85c21fd9243`)
    .then(response=>response.json())
    .then(data=>console.log(data))
}
const errorCallback=(error)=>{
    console.log(error);
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
