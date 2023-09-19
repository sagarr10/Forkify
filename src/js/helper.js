import { async } from 'regenerator-runtime';
import { API_TIME_OUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([
      fetch(
        url
        // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca10`
      ),
      timeout(API_TIME_OUT),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} and (${res.status})`);
    return data;
    // console.log(data.data);
  } catch (error) {
    throw error;
  }
};
export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(API_TIME_OUT),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} and (${res.status})`);
    return data;
    // console.log(data.data);
  } catch (error) {
    throw error;
  }
};
