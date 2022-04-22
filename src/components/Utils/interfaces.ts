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
