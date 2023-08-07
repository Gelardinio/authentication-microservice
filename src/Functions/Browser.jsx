export default async function getUserBrowserData() {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
  const userAgent = navigator.userAgent;
  let geolocation = null;

  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      geolocation = { latitude, longitude };
    } catch (error) {
      console.error('Geolocation Error:', error.message);
    }
  }

  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }

  let ip = null;
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ip = data.ip;
  } catch (error) {
    console.error('Failed to fetch IP address:', error.message);
  }

  return {
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    userAgent,
    geolocation,
    localStorageData,
    ip, 
  };
}
