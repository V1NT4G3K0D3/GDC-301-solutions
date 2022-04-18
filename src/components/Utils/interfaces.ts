type textFieldTypes = "text" | "number" | "date" | "email" | "password" | "url";

type TextField = {
  kind: "text";
  id: number;
  label: string;
  value: string;
  type: string;
};

type DropdownField = {
  kind: "dropdown";
  id: number;
  label: string;
  value: string;
  options: string[];
};

type MultiselectDropdownField = {
  kind: "multiselectdropdown";
  id: number;
  label: string;
  value: string[];
  options: string[];
};

type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  value: string;
  options: string[];
};

type TextareaField = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
  type: string;
};

export type OptionsFields =
  | DropdownField
  | MultiselectDropdownField
  | RadioField;

export type TypeFields = TextField | TextareaField;

// combine
export type SingleValueFields = OptionsFields | TypeFields;
export type MultiValueFields = MultiselectDropdownField;

export type FormField = SingleValueFields | MultiValueFields;

export interface FormData {
  id: number;
  title: string;
  formFields: FormField[];
}

export type Answers = {
  attempt: Number;
  attempts: { questionId: Number; answer: string | string[] }[];
};
