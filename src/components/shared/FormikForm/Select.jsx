import React from 'react';
import { useField, useFormikContext } from 'formik';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const Select = ({
  name,
  label,
  options = [],
  onChange,
  containerClass = '',
  labelClass = '',
  selectClass = '',
  errorClass = '',
  defaultValue,
  bgColor = false,
  borderColor = false,
  isSearchable = false,
  isDisabled = false,
  disabled = false,
  ...rest
}) => {
  const [ field, meta ] = useField(name);
  const { setFieldTouched, setFieldValue, submitCount } = useFormikContext();

  const hasError = (meta.touched || submitCount > 0) && meta.error;

  const handleChange = (selectedOption) => {
    setFieldTouched(name, true);
    setFieldValue(name, selectedOption || []);

    if (onChange) {
      onChange({ target: { value: selectedOption?.value, name } });
    }
  };

  const renderError = () => {
    return (
      (meta.touched || submitCount > 0) && meta.error && (
        <div className={`mt-1 text-xs text-red-500 ${errorClass}`}>
          {meta.error}
        </div>
      )
    );
  };

  return (
    <div className={classNames('select-container', containerClass)}>
      {label && (
        <label
          htmlFor={`${name}-id`}
          className={classNames('form-label', labelClass, {
            'label-error': hasError,
          })}
        >
          {label}
        </label>
      )}

      <ReactSelect
        id={`${name}-id`}
        name={name}
        options={options}
        components={animatedComponents}
        className={classNames('form-select mt-1', selectClass)}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: bgColor ? bgColor : 'transparent',
            borderColor: borderColor ? borderColor : 'transparent',
            height: 43,
            minHeight: 43,
          }),
        }}
        onChange={handleChange}
        onMenuOpen={() => setFieldTouched(name, true)}
        isDisabled={disabled}
        {...rest}
      />

      {renderError()}
    </div>
  );
};

export default Select;
