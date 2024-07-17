import { storage } from "../Shared/Storage";

export const SERVER_REQUEST = async (
  body: {},
  endpoint: string,
  reqType: string,
  dataType?: boolean,
) => {
  const url = `http://10.0.2.2:3000${endpoint}`;
  const FETCH_TIMEOUT = 12000;
  const token = storage.getString('token');

  const options: RequestInit = {
    method: reqType.toUpperCase(),
    headers: {
      'Content-Type': dataType ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  if (reqType.toUpperCase() !== 'GET') {
    // Include request body only for non-GET requests
    options.body = dataType ? body : JSON.stringify(body);
  }

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), FETCH_TIMEOUT),
  );

  const response = await Promise.race([fetch(url, options), timeoutPromise]);

  if (response) {
    const res = await response.json();
    return res;
  }
};
