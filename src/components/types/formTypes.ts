type textFieldTypes = "text" | "number" | "date" | "email" | "password" | "url";

type InputField = {
  id: number;
  label: string;
  value: string;
};

type ArrayField = {
  id: number;
  label: string;
  value: string[];
};

type TextField = InputField & {
  kind: "text";
  type: string;
};

type DropdownField = InputField & {
  kind: "dropdown";
  options: string[];
};

type MultiselectDropdownField = ArrayField & {
  kind: "multiselectdropdown";
  options: string[];
};

type RadioField = InputField & {
  kind: "radio";
  options: string[];
};

type TextareaField = InputField & {
  kind: "textarea";
  type: string;
};

export type OptionsFields = DropdownField | RadioField;

export type TypeFields = TextField | TextareaField;

// combine
export type SingleValueFields = OptionsFields | TypeFields;
export type MultiValueFields = MultiselectDropdownField;

export type FormField = SingleValueFields | MultiValueFields;
export type FormFieldKind =
  | SingleValueFields["kind"]
  | MultiValueFields["kind"];

export interface FormData {
  id: number;
  title: string;
  formFields: FormField[];
}

export type Answers = {
  attempt: Number;
  attempts: { questionId: Number; answer: string | string[] }[];
};

export type APIForm = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
  created_by?: number;
  created_date?: string;
  modified_date?: string;
};

export type APIFormFieldKind = "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC";

export type APIFormField = {
  id: number;
  label: string;
  kind: APIFormFieldKind;
  options?: string[];
  value?: string;
  meta?: any;
};

export type APIAnswer = {
  form_field: number;
  value: string;
};

export type APISubmission = {
  id?: number;
  answers: APIAnswer[];
  form?: APIForm;
  created_date?: string;
};

// Generic type
export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: APIForm) => {
  const errors: Errors<APIForm> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};
