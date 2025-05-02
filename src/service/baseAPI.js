const base_url = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (response.status === 401) {
    window.location.href = "/login";
    return;
  }
  return response.json();
};

export const fetchFromApi = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  const token = sessionStorage.getItem("MVtoken");
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${base_url}${url}${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const postToApi = async (
  url,
  data,
  contentType = "application/json"
) => {
  const token = sessionStorage.getItem("MVtoken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  const body =
    contentType === "application/x-www-form-urlencoded"
      ? new URLSearchParams(data).toString()
      : contentType === "multipart/form-data"
      ? data
      : JSON.stringify(data);

  const response = await fetch(`${base_url}${url}`, {
    method: "POST",
    headers: headers,
    body: body,
  });

  return handleResponse(response);
};

export const postToApiWithToken = async (
  url,
  data,
  contentType = "application/json",
  token
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  const body =
    contentType === "application/x-www-form-urlencoded"
      ? new URLSearchParams(data).toString()
      : contentType === "multipart/form-data"
      ? data
      : JSON.stringify(data);

  const response = await fetch(`${base_url}${url}`, {
    method: "POST",
    headers: headers,
    body: body,
  });

  return handleResponse(response);
};

export const patchToApi = async (
  url,
  data,
  contentType = "application/json"
) => {
  const token = sessionStorage.getItem("MVtoken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (contentType !== "multipart/form-data") {
    headers["Content-Type"] = contentType;
  }

  const body =
    contentType === "application/x-www-form-urlencoded"
      ? new URLSearchParams(data).toString()
      : contentType === "multipart/form-data"
      ? data
      : JSON.stringify(data);

  const response = await fetch(`${base_url}${url}`, {
    method: "PATCH",
    headers: headers,
    body: body,
  });

  return handleResponse(response);
};

export const deleteFromApi = async (url) => {
  const token = sessionStorage.getItem("MVtoken");
  const response = await fetch(`${base_url}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
