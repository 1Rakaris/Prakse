const weatherCity=document.getElementById('weatherCity');
const weatherTemp=document.getElementById('weatherTemp');
const weatherStatus=document.getElementById('weatherStatus');
const weatherFeels=document.getElementById('weatherFeels');
const weatherHumidityValue=document.getElementById('weatherHumidityValue');
const weatherWindValue=document.getElementById('weatherWindValue');
const weatherRainValue=document.getElementById('weatherRainValue');
const weatherNowTemp=document.getElementById('weatherNowTemp');
const weatherAfternoonTemp=document.getElementById('weatherAfternoonTemp');
const weatherEveningTemp=document.getElementById('weatherEveningTemp');
const weatherNowIcon=document.getElementById('weatherNowIcon');
const weatherTomorrowIcon=document.getElementById('weatherTomorrowIcon');
const weatherDayAfterIcon=document.getElementById('weatherDayAfterIcon');
const weatherNote=document.getElementById('weatherNote');
const weatherApiUrl='https://api.open-meteo.com/v1/forecast?latitude=56.95&longitude=24.11&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day&daily=temperature_2m_max&forecast_days=3&timezone=auto';
let weatherData=null;
let weatherFailed=false;

function getWeatherText(code, isDay, lang){
  const text={
    en:{
      clearDay:'Clear sky',
      clearNight:'Clear night',
      partlyCloudyDay:'Partly cloudy',
      partlyCloudyNight:'Partly cloudy night',
      cloudy:'Cloudy',
      fog:'Foggy',
      drizzle:'Light drizzle',
      freezingDrizzle:'Freezing drizzle',
      rain:'Rain showers nearby',
      freezingRain:'Freezing rain',
      snow:'Snowfall',
      storm:'Thunderstorm',
    },
    lv:{
      clearDay:'Skaidras debesis',
      clearNight:'Skaidra nakts',
      partlyCloudyDay:'Daļēji mākoņains',
      partlyCloudyNight:'Daļēji mākoņains naktī',
      cloudy:'Mākoņains',
      fog:'Migla',
      drizzle:'Neliela smidzināšana',
      freezingDrizzle:'Apledojoša smidzināšana',
      rain:'Lietus tuvumā',
      freezingRain:'Apledojošs lietus',
      snow:'Sniegs',
      storm:'Pērkona negaiss',
    },
  };
  const dictionary=text[lang] || text.en;
  if (code === 0) return isDay ? dictionary.clearDay : dictionary.clearNight;
  if ([1, 2].includes(code)) return isDay ? dictionary.partlyCloudyDay : dictionary.partlyCloudyNight;
  if ([3, 45, 48].includes(code)) return code === 3 ? dictionary.cloudy : dictionary.fog;
  if ([51, 53, 55].includes(code)) return dictionary.drizzle;
  if ([56, 57].includes(code)) return dictionary.freezingDrizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return dictionary.rain;
  if ([66, 67].includes(code)) return dictionary.freezingRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return dictionary.snow;
  if ([95, 96, 99].includes(code)) return dictionary.storm;
  return dictionary.cloudy;
}
function formatTemp(value){
  return `${Math.round(value)}\u00B0`;
}
function getTempIcon(value){
  if (value > 20) return 'icons/Warm.png';
  if (value < 10) return 'icons/Cold.png';
  return 'icons/Neutral.png';
}
function formatWeatherTime(value, lang){
  const locale = lang === 'lv' ? 'lv-LV' : 'en-GB';
  return new Date(value).toLocaleTimeString(locale, {
    hour:'2-digit',
    minute:'2-digit',
  });
}
function getDailyTemp(daily, index, fallback){
  if(!daily?.temperature_2m_max?.length){
    return fallback;
  }
  return daily.temperature_2m_max[index] ?? fallback;
}
function renderWeather(lang, translations){
  const dictionary=translations[lang];
  if (!dictionary) return;
  if(weatherFailed){
    weatherStatus.textContent=dictionary.weatherStatus;
    weatherFeels.textContent=dictionary.weatherFeels;
    weatherNote.textContent=dictionary.weatherError;
    return;
  }
  if(!weatherData){
    weatherNote.textContent=dictionary.weatherLoading;
    return;
  }
  const { current, daily }=weatherData;
  const isDay=current.is_day === 1;
  const currentTemp=current.temperature_2m;
  const tomorrowTemp=getDailyTemp(daily, 1, currentTemp);
  const dayAfterTomorrowTemp=getDailyTemp(daily, 2, tomorrowTemp);
  weatherCity.textContent=dictionary.weatherCity;
  weatherTemp.textContent=formatTemp(currentTemp);
  weatherStatus.textContent=getWeatherText(current.weather_code, isDay, lang);
  weatherFeels.textContent=`${dictionary.weatherFeelsLabel} ${formatTemp(current.apparent_temperature)}`;
  weatherHumidityValue.textContent=`${Math.round(current.relative_humidity_2m)}%`;
  weatherWindValue.textContent=`${Math.round(current.wind_speed_10m)} km/h`;
  weatherRainValue.textContent=`${Math.round(current.precipitation_probability ?? 0)}%`;
  weatherNowTemp.textContent=formatTemp(currentTemp);
  weatherAfternoonTemp.textContent=formatTemp(tomorrowTemp);
  weatherEveningTemp.textContent=formatTemp(dayAfterTomorrowTemp);
  weatherNowIcon.src=getTempIcon(currentTemp);
  weatherTomorrowIcon.src=getTempIcon(tomorrowTemp);
  weatherDayAfterIcon.src=getTempIcon(dayAfterTomorrowTemp);
  weatherNote.textContent=`${dictionary.weatherUpdated} ${formatWeatherTime(current.time, lang)} | Open-Meteo`;
}
async function loadWeather(lang, translations){
  weatherFailed=false;
  weatherNote.textContent=translations[lang].weatherLoading;
  try{
    const response=await fetch(weatherApiUrl);
    if(!response.ok){
      throw new Error(`Weather request failed: ${response.status}`);
    }
    weatherData=await response.json();
    renderWeather(lang, translations);
  } catch(error){
    weatherFailed=true;
    console.error(error);
    renderWeather(lang, translations);
  }
}
window.newsWeather={
  update(lang, translations){
    renderWeather(lang, translations);
  },
  load(lang, translations){
    return loadWeather(lang, translations);
  },
};