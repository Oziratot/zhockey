import React, { useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';

const PhoneInputComponent = function ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  const handleChange = useCallback((value) => {
    field.onChange({
      target: {
        name: field.name,
        value,
      },
    });
  }, []);

  return (
    <PhoneInput
      {...field}
      {...props}
      preferredCountries={['ru', 'by', 'kz']}
      country="ru"
      localization={ru}
      // type="tel"
      // mask="+{7} (000) 000-00-00"
      onChange={handleChange}
    />
  );
};

export default PhoneInputComponent;
