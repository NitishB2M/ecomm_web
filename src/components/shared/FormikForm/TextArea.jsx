import React from 'react';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';

const TextArea = (props) => {
  const {
    name,
    placeholder,
    label,
    rows,
    cols,
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

  const renderError = () => {
    return (
      hasError  && (
        <div className={classNames("", { 'errors-msg': hasError }, errorClass)}>{meta.error}</div>
      )
    )
  }

  return (
    <div className={containerClass ? containerClass : ""}>
      { label && 
        <label
          htmlFor={name + '-id'}
          className={classNames("mb-1 text-sm", { 'label-error': hasError }, { 'text-secondary/90': disabled }, labelClass)}
        >
          {label}
        </label>
      }

      <div className="relative w-full flex !items-start">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-4 text-gray-400 dark:text-dark-text/80">
            {icon}
          </span>
        )}

        {icon && iconPosition === 'right' && (
          <span className="absolute right-3 top-4 text-gray-400 dark:text-dark-text/80">
            {icon}
          </span>
        )}
        <textarea
          cols={cols ? cols : 30}
          rows={rows ? rows : 4}
          id={name + '-id'}
          className={classNames(`textarea outline-none max-h-64 min-h-12`,
            {
              '!pl-10': icon && iconPosition === 'left',
              '!pr-10': icon && iconPosition === 'right',
            },
            'border-gray-300 focus:ring-2 focus:ring-slate-50', 
            {'error': hasError}, 
            { 'text-secondary/95': disabled },
            inputClass
          )}
          name={name}
          {...field}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => {
            if (onChange)
              onChange(e);
            setFieldTouched(name, true);
            setFieldValue(name, e.target.value);
          }}
          disabled={disabled}
          {...rest}
        />
        {renderError()}
      </div>
    </div>
  );
}

export default TextArea
