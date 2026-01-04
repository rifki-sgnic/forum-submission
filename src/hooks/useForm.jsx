import { useState } from "react";

export default function useForm(intiialValues) {
  const [values, setValues] = useState(intiialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => setValues(intiialValues);

  return {
    values,
    handleChange,
    resetForm,
  };
}
