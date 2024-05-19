// Utility function to get all cookies as an object
export function getAllCookies() {
    const cookies = document.cookie.split('; ');
    const cookieObj = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObj[name] = decodeURIComponent(value);
    });
    return cookieObj;
}

// Utility function to get a specific cookie by name
export function getCookie(name) {
    const cookies = getAllCookies();
    return cookies[name];
}
