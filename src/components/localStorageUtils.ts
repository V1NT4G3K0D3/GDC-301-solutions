import { formField, formData } from "./interfaces";

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

export const initialFormFields: formField[] = [
  { label: "First Name", id: 1, type: "text", value: "" },
  { label: "Last Name", id: 2, type: "text", value: "" },
  { label: "Email", id: 3, type: "email", value: "" },
  { label: "DOB", id: 4, type: "date", value: "" },
  { label: "Phone number", id: 5, type: "number", value: "" },
];

export const getLocalForms: () => formData[] = () => {
  const savedFormsString = localStorage.getItem("forms");
  return savedFormsString ? JSON.parse(savedFormsString) : [];
};

export const createNewForm: () => formData = () => {
  const localForms = getLocalForms();
  const newForm = {
    id: Number(new Date()),
    title: "Untitled title",
    formFields: initialFormFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

export const updateForm: (form: formData) => void = (form) => {
  const localForms = getLocalForms();
  const updatedForms = localForms.map((localForm) =>
    localForm.id === form.id ? form : localForm
  );
  saveLocalForms(updatedForms);
};

export const getForm: (id: number) => formData = (id) => {
  const localForms = getLocalForms();
  const formData = localForms?.find((form) => form.id === id);
  return formData ? formData : createNewForm();
};

export const deleteForm: (id: number) => void = (id) => {
  const localForms = getLocalForms();
  const updatedForms = localForms.filter((form) => form.id !== id);
  saveLocalForms(updatedForms);
};

export const initialState: () => formData = () => {
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

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(localForms));
};

export const saveFormData: (unsavedFormData: formData) => void = (
  unsavedFormData: formData
) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === unsavedFormData.id ? unsavedFormData : form
  );

  saveLocalForms(updatedLocalForms);
};
