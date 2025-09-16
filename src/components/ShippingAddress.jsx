import React, { useState, useEffect } from 'react';
import { useAddress } from '@utils/hooks/useAddress';
import AddressForm from './profile/AddressForm';

const ShippingAddress = ({ callback }) => {
  const [selectedAddress, setSelectedAddress] = useState({});
  const { addresses, fetchAddresses, addressLoading } = useAddress();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length === 0) {
      setShowAddressForm(true);
    } else {
      setShowAddressForm(false);
    }
  }, [addresses]);

  const renderAddress = (address) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <span className="text-blue-500 font-semibold text-sm">Contact Person:</span>
          <span>{address.full_name}</span>
        </div>
        <div />
        <div className="flex justify-between items-center gap-2">
          <span className="text-blue-500 font-semibold text-sm">Phone:</span>
          <span>{address.phone_number}</span>
        </div>
        <div />
        <div className="flex justify-between items-center gap-2">
          <span className="text-blue-500 font-semibold text-sm">Address:</span>
          <span className="text-right">
            {address.street}, {address.area}, {address.city}, {address.state}, {address.country}, {address.postal_code}
          </span>
        </div>
      </div>
    );
  };

  const handleAddressChange = (address) => {
    console.log(address);
    setSelectedAddress(address);
    callback(true);
  };

  return (
    <div className="mt-4 p-6 rounded-lg shadow-sm dark:bg-d-boxBg dark:text-d-primary bg-l-boxBg border border-l-border dark:border-d-border">
      {/* Select Address */}
      {addressLoading ? (
        <div className="p-6 rounded-lg shadow-sm bg-gray-200 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-4 mt-2">
            <Typography variant="h6" className="!mb-4">
              Select Shipping Address
            </Typography>
            <div
              onClick={() => setShowAddressForm(!showAddressForm)}
              className={`border ${isEdit ? "custom-gray-btn	" : showAddressForm ? "custom-red-btn" : "custom-blue-btn"} self-start`}
              disabled={isEdit}
            >
              {showAddressForm ? "Cancel" : "Add New Address"}
            </div>
          </div>
          <div className="flex gap-2 mb-4 self-start">
            {addresses.length === 0 ? (
              <Typography>No addresses found.</Typography>
            ) : (
              <div className="p-4 border border-gray-200 rounded-lg bg-opacity-90 backdrop-blur-sm sm:w-1/3 self-start w-1/3">
                {/* Select dropdown and address display in a single div */}
                <div className="flex flex-row gap-2 mb-4">
                  <div className="">
                    <select
                      name="status"
                      aria-label="shipping address"
                      onChange={(e) => {
                        const selectedAddressId = e.target.value;
                        const selectedAddress = addresses.find(
                          (address) => address.address_id === parseInt(selectedAddressId)
                        );
                        handleAddressChange(selectedAddress);
                      }}
                      className="w-full sm:w-64 p-2 rounded-md border border-gray-300 dark:border-gray-600 text-black dark:text-white bg-white dark:bg-gray-700 transition duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300"
                    >
                      <option value="">Select an address</option>
                      {addresses.map((address) => (
                        <option value={address.address_id} key={address.address_id}>
                          {address.address_type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    {Object.keys(selectedAddress).length > 0 ? (
                      <div
                        onClick={() => setIsEdit(!isEdit)}
                        className={`${isEdit ? "custom-red-btn" : "custom-green-btn"} self-start`}
                        disabled={showAddressForm}
                      >
                        {isEdit ? "Cancel" : "Edit"}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Display selected address details or form */}
                {selectedAddress ? (
                  <div className="mb-4">
                    {Object.keys(selectedAddress).length > 0 ? (
                      renderAddress(selectedAddress)
                    ) : (
                      <Typography>Select an address to view details.</Typography>
                    )}
                  </div>
                ) : (
                  <Typography>Select an address to view details.</Typography>
                )}
              </div>
            )}

            {/* Conditional display of address form */}
            {isEdit ? (
              <div className="p-4 border border-gray-200 rounded-lg bg-opacity-90 backdrop-blur-sm w-2/3">
                <AddressForm isEdit={isEdit} initialData={selectedAddress} />
              </div>
            ) : showAddressForm ? (
              <div className="p-4 border border-gray-200 rounded-lg bg-opacity-90 backdrop-blur-sm w-2/3">
                <AddressForm initialData={{}} />
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingAddress;
