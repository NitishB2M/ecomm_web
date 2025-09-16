import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useAddress } from '@/utils/hooks/useAddress';
import { AddressListSkeleton } from '../skeletons/AddressSkeleton';
import Constants from '@/utils/Constant';
import { toast } from 'react-toastify';

const AddressList = ({ addressData, setAddressData }) => {
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const { setDefaultAddress, fetchAddress, deleteAddress } = useAddress();

  const selectable = false;
  const selectedId = null;

  useEffect(() => {
    if (addressData && addressData.length > 0) {
      setAddressList(addressData);
      setAddressData([]);
    } else {
      async function loadAddress() {
        try {
          const response = await fetchAddress();
          if (response.status) {
            setAddressList(response.data);
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
      loadAddress();
    }
  }, [addressData]);

  // if (addressLoading) return <AddressListSkeleton />;
  if (!addressList || addressList.length === 0) return <div>No addresses found.</div>;

  const handleEdit = (address) => {
    setInitialData(address);
    setIsAddressFormOpen(true);
  };

  const handleSetDefault = async (address) => {
    if (address.is_primary) {
      toast.error('Address is already set as default');
      return;
    }
    const res = await setDefaultAddress(address.address_id);
    if (res.status) {
      const response = await fetchAddress();
      if (response.status) {
        toast.success('Address set as default');
        setAddressList(response.data);
      }
    }
  };

  const handleAddressCallback = async (success) => {
    setIsAddressFormOpen(false);
    if (success) {
      const res = await fetchAddress();
      if (res.status) {
        setAddressList(res.data);
      }
    }
  };

  const handleDelete = async(data) => {
    const response = await deleteAddress(data);
    if(response.status) {
      const res = await fetchAddress();
      if (res.status) {
        setAddressList(res.data);
      }
      toast.success('Address deleted successfully');
    }
  };

  return (
    <div className="space-y-4 p-2">
      <div className="grid grid-cols-2 gap-4">
        {addressList && addressList.map((address) => (
          <div
            key={address.address_id}
            className={`relative border-l-4 rounded p-4 transition-shadow ${
              address.is_primary
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300 bg-gray-50 dark:bg-dark-background/80'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className={`text-lg font-semibold text-gray-800 dark:text-dark-ctaText ${address.is_primary ? '!text-green-600' : ''}`}>
                {address.address_type}
              </h2>
              {address.is_primary && (
                <span className="text-sm px-2 py-1 border border-green-600 text-green-600 rounded">
                  Default
                </span>
              )}
            </div>

            {/* Address details */}
            <div className="space-y-2 text-sm text-gray-700  dark:text-dark-muted">
              <div className="flex justify-between">
                <span className="font-medium">Street:</span>
                <span>{address.street}, {address.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{address.city}, {address.postal_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">State:</span>
                <span>{address.state}, {address.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{address.phone_number}</span>
              </div>
            </div>

            {/* Selection (if selectable) */}
            {selectable && (
              <div className="absolute top-4 right-4">
                {selectedId === address.address_id ? (
                  <FaCheckCircle className="text-blue-600" />
                ) : (
                  <FaRegCircle className="text-gray-400" />
                )}
              </div>
            )}

            {/* Action buttons */}
            {!selectable && (
              <div className="flex gap-2 justify-end mt-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded transition-500"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(address)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition-500"
                >
                  <FaTrash /> Delete
                </button>
                {!address.is_primary && (
                  <button
                    onClick={() => handleSetDefault(address)}
                    className="px-3 py-1 text-sm text-green-700 border border-green-700 rounded hover:bg-green-50 transition-500"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for AddressForm */}
      {isAddressFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsAddressFormOpen(false)}
            >
              ✕
            </button>
            <AddressForm
              initialData={initialData}
              onCancel={() => setIsAddressFormOpen(false)}
              onAddressCallback={handleAddressCallback}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;
