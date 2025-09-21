"use client";
import { GenerateHash, CURRENT_USER, handleLogout, GET_AUTH_TOKEN } from "./Helpers";

const statusCode = [400, 401, 403, 404, 500, 502, 503, 504];
const ApiCall = async ({ url, method = "GET", body, withToken = true, header = {} }) => {
  try {
    const { token, isValid } = GET_AUTH_TOKEN();
    if (["post", "put", "patch"].includes(method.toLowerCase())) {
      if (body) {
        const hash = GenerateHash(body);
        header['x-verify'] = hash;
      } else {
        header['x-verify'] = "";
      }
    } else if (["get", "delete"].includes(method.toLowerCase())) {
      header['x-verify'] = "";
    }
    let res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": withToken && token && isValid ? `Bearer ${token}` : null,
        ...header,
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      if (res.status === 401) {
        eventEmitter.emit('unauthorized', {});
        handleLogout();
        return;
      }
      
      if (statusCode.includes(res.status) || res.status === 400) {
        throw { ...jsonResponse, statusCode: res.status };
      }
    }
  } catch (error) {
    if (error.statusCode || error.status !== undefined) {
      throw error;
    }
    throw new Error("Failed to fetch");
  }
};

export default ApiCall;