import React, { useCallback } from 'react';

const OnlyTextInputComponent = function ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  const handleChange = useCallback((e) => {
    const { name, onChange } = field;
    const value = e.target.value.replace(/[^A-Za-zА-Яа-я\s-.]/ig, '');
    onChange({ target: { name, value } });
  }, []);

  return (
    <input type="text" {...field} onChange={handleChange} {...props} />
  );
};

export default OnlyTextInputComponent;
