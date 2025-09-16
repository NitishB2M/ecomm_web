import { useAddress } from '../@utils/hooks/useAddress';
import { useState, useEffect } from 'react';

const Addresses = ({callback}) => {

  const { addresses, addressLoading, addressError, fetchAddresses } = useAddress();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    if (addresses.length > 0) {
      addresses.forEach((address) => {
        if (address.is_primary) {
          setSelectedAddress(address);
        }
      });
    } else {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses]);

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    callback(address);
  };

  if (addressLoading) {
    return (
      <div className="p-6 rounded-lg shadow-sm bg-gray-200 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      </div>
    );
  }

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

  return (
    <div className="w-full dark:bg-d-boxBg/30 bg-l-boxBg/30 rounded-lg py-8 px-8">
      <div className="flex justify-between gap-4 mt-2">
        <div variant="h6" className="!mb-4">
          Select Shipping Address
        </div>
      </div>
      <div className="flex gap-2 mb-4 w-full">
        {addresses.length === 0 ? (
          <div>No addresses found.</div>
        ) : (
          <div className="p-4 border border-gray-200 rounded-lg bg-opacity-90 backdrop-blur-sm">
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
                  {addresses.map((address) => (
                    <option value={address.address_id} key={address.address_id}>
                      {address.address_type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {selectedAddress ? (
              <div className="mb-4 w-full">
                {Object.keys(selectedAddress).length > 0 ? (
                  renderAddress(selectedAddress)
                ) : (
                  <div>Select an address to view details.</div>
                )}
              </div>
            ) : (
              <div>Select an address to view details.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;