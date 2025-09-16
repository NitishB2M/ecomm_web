"use client";
import { GenerateHash, CURRENT_USER, handleLogout, GET_AUTH_TOKEN } from "./Helpers";
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
        // ...header,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return await res.json();
    } else {
      if (res.status === 401) {
        eventEmitter.emit('unauthorized', {});
        handleLogout();
        return;
      }
      if (res.status === 409) {
        res = await res.json();
        throw { ...res, statusCode: 409 };
      }
    }
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export default ApiCall;