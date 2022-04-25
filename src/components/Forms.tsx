import React, { useState } from "react";
import Form from "./Forms/Form";
// import { FormList } from "./Forms/FormList";

export const Forms = () => {
  const [formNumber, setFormNumber] = useState<number>(0);
  // return <div>{formNumber ? <Form id={formNumber} /> : <FormList />}</div>;
  return <div>Form</div>;
};
