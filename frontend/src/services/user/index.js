const _fetch = async (url, data) => {
  const { headers = null, method = "GET", body } = data;
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...(method !== "GET" ? { body: JSON.stringify(body) } : null),
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }
  return response;
};

const _getUrl = (endpoint) => {
  return process.env.REACT_APP_BASE_URL + endpoint;
};

/** ------------- service function ---------------------- */

export const loginUser = async ({ body = {} }) => {
  const url = _getUrl("/login");
  const data = {
    body,
    method: "POST",
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};

export const addItems = async ({ token, body = {} }) => {
  const url = _getUrl("/user/items");
  const data = {
    body,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};

export const listItems = async ({ token }) => {
  const url = _getUrl("/user/items");
  const data = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};

export const deleteItem = async ({ token, id }) => {
  const url = _getUrl(`/user/items/${id}`);
  const data = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};

export const updateItem = async ({ token, id, body }) => {
  const url = _getUrl(`/user/items/${id}`);
  const data = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};

export const isUniqueItem = async ({ body }) => {
  const url = _getUrl(`/user/items/isunique`);
  const data = {
    method: "POST",
    body,
  };
  const response = await (await _fetch(url, data))?.json();
  return response;
};
