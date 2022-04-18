import { FormField, FormData } from "./interfaces";

export const setPage = (pageName: string) => {
  localStorage.setItem("page", pageName);
};

export const getPage = () => {
  const page = localStorage.getItem("page");
  if (page) {
    return page;
  } else {
    return "HOME";
  }
};

export const initialFormFields: FormField[] = [
  { kind: "text", label: "First Name", id: 1, type: "text", value: "" },
  { kind: "text", label: "Last Name", id: 2, type: "text", value: "" },
  { kind: "text", label: "Email", id: 3, type: "email", value: "" },
  { kind: "text", label: "DOB", id: 4, type: "date", value: "" },
  { kind: "text", label: "Phone number", id: 5, type: "number", value: "" },
  {
    kind: "dropdown",
    label: "Priority",
    id: 6,
    options: ["high", "low"],
    value: "",
  },
  {
    kind: "radio",
    label: "Priority",
    id: 7,
    options: ["high", "low"],
    value: "",
  },
];

export const getLocalForms: () => FormData[] = () => {
  const savedFormsString = localStorage.getItem("forms");
  return savedFormsString ? JSON.parse(savedFormsString) : [];
};

export const createNewForm: () => FormData = () => {
  const localForms = getLocalForms();
  const newForm = {
    id: Number(new Date()),
    title: "Untitled title",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

export const updateForm: (form: FormData) => void = (form) => {
  const localForms = getLocalForms();
  const updatedForms = localForms.map((localForm) =>
    localForm.id === form.id ? form : localForm
  );
  saveLocalForms(updatedForms);
};

export const getForm: (id: number) => FormData = (id) => {
  const localForms = getLocalForms();
  const formData = localForms?.find((form) => form.id === id);
  return formData ? formData : createNewForm();
};

export const getUndefinedOrForm: (id: number) => FormData | undefined = (
  id
) => {
  const localForms = getLocalForms();
  const formData = localForms?.find((form) => form.id === id);
  return formData;
};

export const deleteForm: (id: number) => FormData[] = (id) => {
  const localForms = getLocalForms();
  const updatedForms = localForms.filter((form) => form.id !== id);
  saveLocalForms(updatedForms);
  return updatedForms;
};

export const initialState: () => FormData = () => {
  const localForms = getLocalForms();
  if (localForms.length > 0) {
    return localForms[0];
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled title",
    formFields: initialFormFields,
  };
  saveLocalForms([newForm]);
  return newForm;
};

export const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};

export const saveFormData: (unsavedFormData: FormData) => void = (
  unsavedFormData: FormData
) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === unsavedFormData.id ? unsavedFormData : form
  );

  saveLocalForms(updatedLocalForms);
};
