import React from 'react';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';

const Input = (props) => {
  const {
    name,
    placeholder,
    label,
    step,
    type,
    onChange,
    inputClass='',
    errorClass,
    containerClass,
    labelClass,
    autoComplete,
    icon,
    iconPosition = 'right',
    disabled = false,
    ...rest
  } = props;

  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const hasError = meta.touched && meta.error;

  return (
    <div className={classNames('flex flex-col w-full dark:text-dark-text/90 mb-1', containerClass)}>
      { label && 
        <label
          htmlFor={name + '-id'}
          className={classNames("mb-1 text-sm dark:text-dark-primary", { 'label-error': hasError }, { 'text-secondary/90': disabled }, labelClass)}
        >
          {label}
        </label>
      }

      <div className="relative w-full flex items-center">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text/80">
            {icon}
          </span>
        )}

        {icon && iconPosition === 'right' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text/80">
            {icon}
          </span>
        )}
        <input
          id={`${name}-id`}
          name={name}
          type={type || 'text'}
          step={step}
          placeholder={placeholder}
          autoComplete={autoComplete || 'off'}
          disabled={disabled}
          {...field}
          {...rest}
          onChange={(e) => {
            if (onChange) onChange(e);
            setFieldTouched(name, true);
            setFieldValue(name, e.target.value);
          }}
          className={classNames(`outline-none`,
            {
              '!pl-10': icon && iconPosition === 'left',
              '!pr-10': icon && iconPosition === 'right',
            },
            'border-gray-300 focus:ring-2 focus:ring-slate-50', 
            {'error': hasError}, 
            { 'text-secondary/95': disabled },
            inputClass
          )}
        />
      </div>

      {hasError && (
        <p className={classNames('mt-1 text-xs text-red-500', errorClass)}>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default Input;
