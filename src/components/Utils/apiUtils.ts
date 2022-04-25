import { PaginationParams } from "../types/common";
import { APIForm, APIFormField } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  // Set the URL
  let url, payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Set the headers
  // Basic authentication
  // const auth = "Basic " + window.btoa("pragati:EthAr8RFk738mjsv");

  // Token authentication
  const token = localStorage.getItem("token");
  const auth = token ? `Token ${token}` : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET");
};

// single form
export const createForm = (form: APIForm) => {
  return request(`forms/`, "POST", form);
};

export const getForm = (formId: number) => {
  return request(`forms/${formId.toString}/`, "GET");
};

export const updateForm = (form: APIForm) => {
  return request(`forms/${form.id}/`, "PUT", form);
};

export const deleteForm = (id: number) => {
  return request(`forms/${id}/`, "DELETE");
};

// all forms
export const listForms = (pageParams: PaginationParams) => {
  return request(`forms/`, "GET", pageParams);
};

// single field
export const createFormField = (formId: number, field: APIFormField) => {
  return request(`forms/${formId.toString}/fields/`, "POST", field);
};

export const getFormField = (formId: number, fieldId: number) => {
  return request(`forms/${formId.toString}/fields/${fieldId.toString}/`, "GET");
};

export const updateFormField = (
  formId: number,
  fieldId: number,
  field: APIFormField
) => {
  return request(
    `forms/${formId.toString}/fields/${fieldId.toString}/`,
    "PUT",
    field
  );
};

export const deleteFormField = (formId: number, fieldId: number) => {
  return request(
    `forms/${formId.toString}/fields/${fieldId.toString}/`,
    "DELETE"
  );
};

// all fields
export const listFormFields = (
  pageParams: PaginationParams,
  formId: number
) => {
  return request(`forms/${formId.toString}/fields/`, "GET", pageParams);
};
