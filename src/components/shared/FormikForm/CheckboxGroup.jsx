import React from 'react';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';

const CheckBoxGroup = ({
  name,
  label,
  onChange,
  options = [],
  errorClass = '',
  labelClass = '',
  optionClass = '',
  containerClass = '',
  optionLabelClass = '',
  optionContainerClass = '',
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (onChange) onChange(e);
    setFieldTouched(name, true);

    if (checked) {
      setFieldValue(name, [...(field.value || []), value]);
    } else {
      setFieldValue(name, (field.value || []).filter(val => val !== value));
    }
  };

  const renderError = () => {
    if (meta.touched && meta.error) {
      return <div className={classNames('text-red-500 text-sm mt-1', errorClass)}>{meta.error}</div>;
    }
    return null;
  };

  return (
    <div className={classNames('flex flex-col w-full dark:text-dark-text/90 mb-1', containerClass)}>
      {label && (
        <label htmlFor={`${name}-id`} className={classNames('block font-medium text-sm mb-1', labelClass)}>
          {label}
        </label>
      )}

      <div className={`flex flex-wrap gap-4 ${optionContainerClass} grid grid-cols-2`}>
        {options.map((option, index) => {
          const optionId = `${option.value}-id`;
          return (
            <div key={optionId} className={classNames('flex items-center space-x-2', optionClass)}>
              <input
                id={optionId}
                type="checkbox"
                className="form-checkbox accent-primary"
                {...field}
                value={option.value}
                checked={field.value.includes(option.value)}
                onChange={(e) => {
                  if (onChange)
                    onChange(e);
                  setFieldTouched(name, true);
                  if (e.target.checked) {
                    let arr = (field.value || []);
                    arr.push(e.target.value);
                    setFieldValue(name, arr);
                  } else {
                    setFieldValue(name, (field.value || []).filter(val => val != e.target.value));
                  }
                }}
                {...rest}
              />
              <label htmlFor={optionId} className={classNames('text-sm text-gray-700 dark:text-gray-300', optionLabelClass)}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {renderError()}
    </div>
  );
};

export default CheckBoxGroup;
