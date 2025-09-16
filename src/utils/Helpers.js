"use client";

import Constants from "./Constant";

// import jsSHA from "jssha";
// import CryptoJS from 'crypto-js';
const iswindow = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  return true;
}

export const GET_AUTH_TOKEN = () => {
  if (!iswindow()) return { token: '', isValid: false };
  const token = localStorage.getItem('token') || '';
  return { token, isValid: !!token };
};

export const CURRENT_USER = (key = "USER") => {
  if (
    typeof window !== "undefined" &&
    localStorage &&
    !!localStorage.getItem(key)
  ) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const IsLoggedIn = () => {
  if (!iswindow()) return false;
  const token = localStorage.getItem('token') || '';
  let user = localStorage.getItem('USER') || '';
  if(user){
    user = JSON.parse(user);
  }
  return !!token && !!user && !!user.id;
}

export const GET_FROM_LOCAL_STORAGE = (key) => {
  if (!key) throw new Error("Invalid key");
  if (
    typeof window !== "undefined" &&
    localStorage &&
    !!localStorage.getItem(key)
  ) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const STORE_IN_LOCAL_STORAGE = (key, data) => {
  if (key && data) {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } else {
  }
};

export const STORE_IN_LOCAL_STORAGE_WO_JSON = (key, data) => {
  if (key && data) {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem(key, data);
    }
  } else {
  }
};

export const REMOVE_FROM_LOCAL_STORAGE = (key) => {
  if (key) {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.removeItem(key);
    }
  }
};

export const CLEAR_STORAGE = (exclude) => {
  if (typeof window !== "undefined" && localStorage) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (exclude.indexOf(key) === -1) {
        localStorage.removeItem(key);
      }
    }
  }
};

export function setCookie(name, value, minutes) {
  if (typeof document === "undefined") {
    return;
  }
  var expires = "";
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  if (typeof document === "undefined") {
    return;
  }
  var nameEQ = name + "=";
  var dca = document.cookie.split(";");
  for (var ca of dca) {
    var c = ca;
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name) {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const getLastPathSegment = (fullPath) => {
  const currentSubPaths = fullPath.split("/");
  return currentSubPaths[currentSubPaths.length - 1];
};

export const checkMultipleClinicSettings = (conditions = []) => {
  try {
    const settings = GET_FROM_LOCAL_STORAGE("CLINIC_SETTINGS");

    if (!settings || !Array.isArray(settings)) return true;

    return conditions.every(({ code, values = ['true'] }) => {
      const currSet = settings.find(set => set.code === code);
      return currSet ? values.includes(currSet.value) : false;
    });
  } catch (err) {
    console.error('Error in checkMultipleClinicSettings:', err);
    return false;
  }
};

export const getFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data;
  }
};

export const handleLogout = () => {
  localStorage.clear();
  if (typeof window !== "undefined") {
    window.location.href = Constants.PUBLIC_ROUTES.LOGIN;
  }
};

export const isWhiteListed = (path) => {
  const cleanPath = path.split('?')[0].replace(/\/$/, ''); // remove query & trailing slash
  return Constants.UNAUTHORIZED_ROUTES.some((route) => route.path === cleanPath);
};

export const GenerateHash = (dictInput) => {
  try {
    if (!dictInput) {
      throw new Error("Invalid input for hashing");
    }

    if (!process.env.SALT_KEY) {
      throw new Error("Missing SALT_KEY in environment variables");
    }

    let text = Buffer.from(JSON.stringify(dictInput)).toString("base64");
    text = text + process.env.SALT_KEY;

    // const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
    // shaObj.update(text);

    const hash = shaObj.getHash("HEX");
    return hash;
  } catch (ex) {
  }
};

export const AESEncrypt = (input) => {
  try {
    if (!input || input.length === 0) {
      throw new Error("Invalid input! Input must be a non-empty string.");
    }

    const key = process.env.CRYPTO_KEY;
    const ivValue = process.env.CRYPTO_IV;


    if (!key || key.length !== 64) {
      throw new Error("Invalid CRYPTO_KEY. Ensure it's a 64-character hex string.");
    }

    if (!ivValue || ivValue.length !== 32) {
      throw new Error("Invalid CRYPTO_IV. Ensure it's a 32-character hex string.");
    }

    // const encryptionKey = CryptoJS.enc.Hex.parse(key);
    // const iv = CryptoJS.enc.Hex.parse(ivValue);
    // const utf8Input = CryptoJS.enc.Utf8.parse(input);

    // const encrypted = CryptoJS.AES.encrypt(utf8Input, encryptionKey, {
    //   iv: iv,
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.Pkcs7,
    // }).toString();
    // return encrypted;
    return "";

  } catch (ex) {
    console.error("Encryption failed", ex);
    return null;
  }
};