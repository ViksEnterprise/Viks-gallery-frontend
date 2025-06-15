/**
 * Decode a JWT token and returns its payload
 * @param {string} token - JWT token string
 * @returns {object|null} - Decoded payload
 */

/** 
    Gets the details or payload from the JWT token
**/
const getJWTPayload = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return err;
  }
};

/**
 * Checks if given token has expired
 * @param {string} token - JWT token string
 * @returns {boolean|null} - True if expired, false if valid, null if invalid
 */

const checkTokenStatus = (token) => {
  const decoded = getJWTPayload(token);
  if (!decoded || !decoded.exp) return null;

  const now = Math.floor(Date.now() / 1000);
  return now > decoded.exp;
};

/**
 * Gets the expiration date of a JWT token
 * @param {string} token - JWT token string
 * @returns {Date|null} - Check for the given date
 */

const getJWTDate = (token) => {
  const decoded = getJWTPayload(token);
  if (!decoded || !decoded.exp) return null;

  return new Date(decoded.exp * 1000);
};

export { getJWTPayload, checkTokenStatus, getJWTDate };
