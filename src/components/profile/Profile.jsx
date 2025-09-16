import React, { useEffect, useState } from 'react';
import {
  CreditCard, MapPin, ShoppingCart, User,
  UserSwitch, XCircle, Heart,
  Envelope
} from 'phosphor-react';
import { TbTruckReturn } from "react-icons/tb";
import { FaMinus, FaPlus } from 'react-icons/fa';

import { useAuth } from '@/utils/context/AuthContext';
import { useAddress } from '@/utils/hooks/useAddress';
import { CURRENT_USER } from '@/utils/Helpers';

import AddressList from './AddressList';
import ProfileForm from './ProfileForm';
import ProfileSkeleton from '../skeletons/ProfileSkeleton';
import { AddressListSkeleton } from '../skeletons/AddressSkeleton';
import AddressForm from './AddressForm'; // Make sure this is available

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isEmailLinkAvailable, setIsEmailLinkAvailable] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);

  const {
    fetchProfile,
    sendVerificationEmail,
    switchRole
  } = useAuth();

  const user = CURRENT_USER();
  const { fetchAddress } = useAddress();

  useEffect(() => {
    async function fetchProfileData() {
      const profileRes = await fetchProfile(user);
      if (profileRes?.status) {
        setProfile(profileRes.data);
        setLoading(false);
      }
    }
    fetchProfileData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleVerifyEmail = async (email) => {
    try {
      const result = await sendVerificationEmail(email);
      if (result.success) {
        setIsEmailLinkAvailable(result.data);
      }
    } catch (error) {
      console.error('Failed to send verification email:', error);
    }
  };

  const handleEmailVerification = async () => {
    setTimeout(() => {
      setIsEmailLinkAvailable('');
      fetchProfile();
    }, 5000);
  };

  const handleSwitchRole = async (username) => {
    try {
      await switchRole(username);
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'address', label: 'Address Book', icon: <MapPin size={20} /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard size={20} /> },
    { id: 'order', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'return', label: 'Returns', icon: <TbTruckReturn size={20} /> },
    { id: 'cancellation', label: 'Cancellations', icon: <XCircle size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
  ];

  const handleAddressCallback = async (success) => {
    setIsAddressFormOpen(false);
    if (success) {
      const res = await fetchAddress();
      if (res.status) {
        setAddressList(res.data);
      }
    }
  };

  const handleSwitchTabs = async (tab) => {
    setActiveSection(tab);
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-[300px_1fr_250px] gap-3">
        {/* Sidebar */}
        <aside className="max-h-[calc(100vh-100px)] overflow-y-scroll bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 p-4 flex flex-col space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/70 shadow">
              <img
                src={`https://ui-avatars.com/api/?name=${profile?.first_name}+${profile?.last_name}`}
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {profile.first_name} {profile.last_name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Joined {formatDate(profile.created_at)}</p>
              {profile?.role?.active_role?.role && (
                <span className="text-xs mt-1 inline-block px-2 py-1 border border-blue-500 text-blue-500 dark:text-blue-300 rounded">
                  {profile.roles.active_role.role}
                </span>
              )}
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleSwitchTabs(item.id)}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition duration-200
                  ${activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex flex-col">
          {/* Section Content */}
          <section className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
            {activeSection === 'profile' && <ProfileForm data={profile} />}
            {activeSection === 'address' &&  (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-primary dark:text-dark-primary">
                    My Addresses
                  </h2>
                  <button
                    type="button"
                    className={`flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-500
                    ${isAddressFormOpen ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    onClick={() => setIsAddressFormOpen(!isAddressFormOpen)}
                  >
                    {isAddressFormOpen ? <><FaMinus /><span>Cancel</span></> : <><FaPlus /> <span>Add New Address</span></> }
                  </button>
                </div>

                {addressLoading ? (
                  <AddressListSkeleton />
                ) : (
                  <AddressList addressData={addressList} setAddressData={setAddressList} />
                )}

                {isAddressFormOpen && (
                  <AddressForm onAddressCallback={handleAddressCallback} />
                )}
              </div>
            )}
            {/* You can add other sections here */}
          </section>
        </main>

        {/* Action Cards */}
        <div className="max-h-[calc(100vh-100px)] overflow-y-scroll flex flex-col gap-4 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4 py-6 shadow">
          <h2 className="text-lg font-semibold text-primary dark:text-dark-primary">Actions</h2>

          {!profile.is_verified && (
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleVerifyEmail(profile.email)}
                disabled={!!isEmailLinkAvailable}
                className="button !w-full !bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white rounded-lg font-medium shadow"
              >
                <Envelope size={20} />
                Verify Email
              </button>
              {isEmailLinkAvailable && (
                <button
                  onClick={handleEmailVerification}
                  className="button w-full !bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white py-2 rounded-lg font-medium shadow"
                >
                  Click to Verify
                </button>
              )}
            </div>
          )}

          {profile.roles?.all_roles
            ?.filter(role => role.role_id !== profile.roles?.active_role?.role_id)
            ?.map(role => {
              return (
                <button
                  key={`${role.username}-${role.role_id}`}
                  onClick={() => handleSwitchRole(role.username)}
                  className="button !w-full !bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium shadow flex items-center gap-2"
                >
                  <UserSwitch size={20} />
                  Switch to {role.role}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
