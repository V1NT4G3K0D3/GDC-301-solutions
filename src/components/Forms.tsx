import React, { useState } from "react";
import Form from "./Form";
import { FormList } from "./FormList";

export const Forms = (props: { closeFormsCB: () => void }) => {
  const [formNumber, setFormNumber] = useState<number>(0);

  const openForm = (id: number) => {
    setFormNumber(id);
  };

  const closeForm = () => {
    setFormNumber(0);
  };

  return (
    <div>
      {formNumber ? (
        <Form closeFormCB={closeForm} id={formNumber} />
      ) : (
        <FormList closeFormsCB={props.closeFormsCB} openFormCB={openForm} />
      )}
    </div>
  );
};
