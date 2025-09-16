import React, { useRef } from 'react';
import Select, { components } from 'react-select';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';

// Draggable MultiValue Component for React Select
const DraggableMultiValue = ({ index, innerRef, innerProps, onDragStart, onDragOver, onDrop, ...props }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 6px',
        margin: '2px',
        backgroundColor: '#ddd',
        borderRadius: '4px',
        cursor: 'move',
      }}
      className='flex items-center gap-2 text-sm text-gray-700 dark:text-dark-background hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
    >
      <components.MultiValueLabel {...props} />
      {/* <components.MultiValueRemove {...props} /> */}
    </div>
  );
};

const SortableMultiSelect = ({
  name,
  label,
  options = [],
  onChange,
  labelClass = '',
  errorClass = '',
  containerClass = '',
  selectClass = '',
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleChange = (selectedOptions) => {
    setFieldTouched(name, true);
    setFieldValue(name, selectedOptions || []);
    if (onChange) onChange(selectedOptions);
  };

  const onDragStart = (e, position) => {
    dragItem.current = position;
  };

  const onDragOver = (e, position) => {
    e.preventDefault();
    dragOverItem.current = position;
  };

  const onDrop = (e) => {
    e.preventDefault();

    const copyListItems = [...(field.value || [])];
    const dragItemContent = copyListItems[dragItem.current];

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setFieldValue(name, copyListItems);
  };

  const renderError = () => {
    if (meta.touched && meta.error) {
      return <div className={classNames('text-red-500 text-sm mt-1', errorClass)}>{meta.error}</div>;
    }
    return null;
  };

  return (
    <div className={classNames('flex flex-col w-full mb-1', containerClass)}>
      {label && (
        <label htmlFor={`${name}-select`} className={classNames('block font-medium text-sm mb-1', labelClass)}>
          {label}
        </label>
      )}

      <Select
        inputId={`${name}-select`}
        name={name}
        isMulti
        closeMenuOnSelect={false}
        options={options}
        value={field.value || []}
        onChange={handleChange}
        className={classNames('form-input outline-none', selectClass)}
        styles={customStyles}
        {...rest}
      />

      {renderError()}
    </div>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#F9FAFB dark:#1E293B' : '#F9FAFB dark:#1E293B',
    borderColor: state.isFocused ? '#E5E7EB' : 'gray',
    boxShadow: state.isFocused ? '0 0 0 1px #E5E7EB' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#E5E7EB' : 'gray',
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'darkblue' : (state.isFocused ? 'lightgray' : 'white'),
    color: state.isSelected ? 'white' : 'black',
    padding: '8px 12px',
  }),
};

export default SortableMultiSelect;
