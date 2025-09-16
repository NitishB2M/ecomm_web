import React, { useEffect, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';
import ApiCall from '@/utils/APICalls';
import { toast } from 'react-toastify';
import ReactAsyncSelect from 'react-select/async';
import makeAnimated from "react-select/animated";

const animation = makeAnimated();

const DynamicAsycSelect = (props) => {
    const { name, label, onChange, valid = false, apiurl, defaultoption, containerStyle, optiontype, defaultValue, extraStyles, bgGrey, disabled, ...rest } = props;
    const [options, setOptions] = useState([]);
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    const FetchOption = async (term) => {
        try {
            const res = await ApiCall({
                url: apiurl,
                method: 'POST',
                body: { "term": term },
            });
            if (res.success) {
                const options = res.data.map(item => {
                    const keys = Object.keys(item);
                    const valueKey = keys[0];
                    const labelKey = keys[1] || keys[0];
                    return {
                        value: item[valueKey],
                        label: item[labelKey],
                    };
                });
                setOptions(options);
            }

        } catch (err) {
            toast.error(err);
        }
    }

    const debouncedFetchOption = debounce((term, callback) => {
        FetchOption(term).then(() => {
            callback(options);
        });
    }, 1000);
    const loadOptions = (inputValue, callback) => {
        debouncedFetchOption(inputValue, callback);
    };

    const renderError = () => {
        return (
            meta.touched && meta.error ? (
                <div className="p-error form-input errors-msg absolute">{meta.error}</div>
            ) : null
        )
    }

    return (
        <div className={containerStyle ? containerStyle : ""}>
            {
                label && <label
                    htmlFor={name + '-id'}
                    className=""
                >
                    {label}
                </label>
            }

            <ReactAsyncSelect
                id={name + '-id'}
                className={`mt-1 ${extraStyles} ${bgGrey ? '#cccccc' : 'bg-primary/10'} `}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'transparent',
                        height: 43
                    }),
                }}
                menuPlacement="bottom"
                name={name}
                loadOptions={loadOptions}
                components={animation}
                {...field}
                onChange={(val) => {
                    setFieldTouched(name, true);
                    setFieldValue(name, val ? val : []);
                    if (onChange)
                        onChange({ target: { value: val?.value, name } });
                }}
                onMenuOpen={() => {
                    setFieldTouched(name, true);
                }}
                {...rest}
                isClearable
                isDisabled={disabled}
            />
            {renderError()}
        </div>
    );
}

export default DynamicAsycSelect;
