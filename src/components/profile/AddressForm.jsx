import { useAddress } from '@/utils/hooks/useAddress';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import FormikForm from '../shared/FormikForm';

const countryList = [
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Australia', value: 'Australia' },
  { label: 'New Zealand', value: 'New Zealand' },
]

const addressTypeList = [
  { label: 'Home', value: 'home' },
  { label: 'Work', value: 'work' },
  { label: 'Other', value: 'other' },
  { label: 'Office', value: 'office' },
]

const AddressForm = ({ initialData = null, onAddressCallback }) => {
  const [addressLoading, setAddressLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    full_name: 'John Doe',
    phone_number: '9876543210',
    street: '123 Maple Street',
    area: 'Downtown',
    city: 'Springfield',
    state: 'Illinois',
    postal_code: '627042',
    country: countryList[0],
    address_type: addressTypeList[1],
    other_address_type: '',
    is_primary: false,
  });
  const { addAddress, updateAddress } = useAddress();

  const validationSchemas = Yup.object().shape({
    full_name: Yup.string().required('Name is required'),
    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Invalid phone number'),
    street: Yup.string().required('Street is required'),
    area: Yup.string().required('Area is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postal_code: Yup.string()
      .required('Postal code is required')
      .matches(/^\d{6}$/, 'Invalid postal code'),
    country: Yup.mixed().required('Country is required'),
    address_type: Yup.mixed().required('Address type is required'),
    other_address_type: Yup.string().when('address_type', {
      is: 'other',
      then: Yup.string().required('Please specify the address type'),
    }),
  })

  const handleSubmit = async (values) => {
    let result;
    const payload = {
      ...values,
      full_name: values.full_name.trim(),
      address_type: values.address_type.value,
      country: values.country.value
    };
    if (initialData) {
      result = await updateAddress(initialData.address_id, payload);
    } else {
      result = await addAddress(payload);
    }
    if (result.status) {
      toast.success(result.message);
      onAddressCallback(true);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit }) => (

        <form onSubmit={handleSubmit} className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {initialData ? 'Edit Address' : 'Add New Address'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormikForm.Select
              label="Address Type"
              name="address_type"
              placeholder="Select address type"
              options={addressTypeList}
            />
            <FormikForm.Input
              label="Full Name"
              name="full_name"
              type="text"
              placeholder="e.g. John Doe"
            />
            <FormikForm.Input
              label="Phone Number"
              name="phone_number"
              type="tel"
              placeholder="e.g. 1234567890"
            />
            <FormikForm.Input
              label="Street"
              name="street"
              type="text"
              placeholder="e.g. 123 Main St"
            />
            <FormikForm.Input
              label="Area"
              name="area"
              type="text"
              placeholder="e.g. New York"
            />
            <FormikForm.Input
              label="City"
              name="city"
              type="text"
              placeholder="e.g. New York"
            />
            <FormikForm.Input
              label="State"
              name="state"
              type="text"
              placeholder="e.g. New York"
            />
            <FormikForm.Input
              label="Postal Code"
              name="postal_code"
              type="text"
              placeholder="e.g. 123456"
              maxLength={6}
            />
            <FormikForm.Select
              label="Country"
              name="country"
              options={countryList}
            />

            {/* Other Address Type */}
            <FormikForm.Input
              label="Other Address Type"
              name="other_address_type"
              type="text"
              placeholder="e.g. Office"
              disabled={values.address_type !== 'other'}
            />

            <FormikForm.CheckBox
              label="Is Default"
              name="is_primary"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            {onAddressCallback && (
              <button
                type="button"
                onClick={() => onAddressCallback(false)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                disabled={addressLoading}
              >
                {initialData ? 'Cancel' : 'Close'}
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={addressLoading}
            >
              {addressLoading ? 'Saving...' : initialData ? 'Update Address' : 'Add New Address'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
