import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import FormikForm from '../shared/FormikForm';
import * as Yup from "yup";
import { LiaUserEditSolid } from "react-icons/lia";
import { XCircle } from 'phosphor-react';
import { CURRENT_USER } from '@/utils/Helpers';
import { useAuth } from '@/utils/context/AuthContext';
import { toast } from 'react-toastify';

const ProfileForm = ({ data }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isFormTouched, setIsFormTouched] = useState(false);
	const profile = CURRENT_USER();
	const [initialValues, setInitialValues] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
	});
	const { updateProfile } = useAuth();

	useEffect(() => {
		if (data && initialValues && initialValues.email !== profile.email){
			setInitialValues({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				phone: data?.phone
			});
		} else if (profile && initialValues && initialValues.email !== profile.email) {
			setInitialValues({
				first_name: profile.first_name,
				last_name: profile.last_name,
				email: profile.email,
				phone: profile?.phone
			});
		}
	}, [data]);

	const validationSchema = Yup.object().shape({
		first_name: Yup.string().required('First name is required'),
		last_name: Yup.string().required('Last name is required'),
		email: Yup.string().required('Email is required'),
		phone: Yup.string().optional(),
	});

	const handleSubmit = async (values) => {
		const result = await updateProfile(values);
		if (result.status) {
			toast.success(result.message);
			setIsFormTouched(false);
			setIsEditing(false);
		} else {
			toast.error(result.error);
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({ values, handleSubmit }) => (
				<>
					<div className="flex items-center gap-2 mb-4">
						<h2 className="text-xl font-bold custom-text">Profile Details</h2>
					</div>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-2 gap-3 items-start">
							<div className="space-y-4 col-span-10">
								<div className='gap-4 items-start grid grid-cols-2'>
									<div className='col-span-1'>
										<FormikForm.Input
											name="first_name"
											label="First Name"
											type="text"
											placeholder="Enter first name"
											disabled={!isEditing}
											onChange={(e) => {
												setIsFormTouched(true);
											}}
										/>
									</div>
									<div className='col-span-1'>
										<FormikForm.Input
											name="last_name"
											label="Last Name"
											type="text"
											placeholder="Enter last name"
											disabled={!isEditing}
											onChange={(e) => {
												setIsFormTouched(true);
											}}
										/>
									</div>
								</div>
								<div className='gap-4 items-start grid grid-cols-2'>
									<div className=''>
										<FormikForm.Input
											name="email"
											label="Email"
											type="email"
											placeholder="Enter email"
											disabled={!isEditing}
											onChange={(e) => {
												setIsFormTouched(true);
											}}
										/>
									</div>
									<div className=''>
										<FormikForm.Input
											name="phone"
											label="Phone"
											type="text"
											placeholder="Enter phone number"
											disabled={!isEditing}
											onChange={(e) => {
												setIsFormTouched(true);
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-between items-center gap-2 mt-6">
							<div className="w-fit">
								{!isEditing ? (
									<div className="flex items-center gap-2 w-full dark:text-dark-text button border border-gray-500" onClick={() => setIsEditing(!isEditing)}>
										<LiaUserEditSolid title='Edit' size={20} className="flex items-end"/>	
										<div className='font-poppins'>Edit</div> 
									</div>
								) : (
									<div className={`flex items-center gap-2 w-full dark:text-dark-text button border border-gray-500 ${isEditing ? 'border-red-500' : ''}`} onClick={() => setIsEditing(!isEditing)}>
										<XCircle title='Close' size={20} className="flex items-end w-full text-red-500"/>
										<div className='font-poppins'>Close</div> 
									</div>
								)}
							</div>
							<div className="flex gap-2">
								<button type="submit" className={`button ${isEditing && isFormTouched ? '' : 'disabled'}`} disabled={!isEditing || !isFormTouched}>
									Save Changes
								</button>
							</div>
						</div>
					</form>
				</>
			)}
		</Formik>
	)
};

export default ProfileForm