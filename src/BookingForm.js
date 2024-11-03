import { useState } from 'react';

const SERVICES = [
	{ id: 'haircut', label: 'Haircut & Styling', duration: '1 hour' },
	{ id: 'coloring', label: 'Hair Coloring', duration: '2 hours' },
	{ id: 'treatment', label: 'Hair Treatment', duration: '1.5 hours' },
];

const FORM_FIELDS = [
	{ id: 'name', label: 'Name', type: 'text', required: true },
	{ id: 'email', label: 'Email', type: 'email', required: true },
	{ id: 'phone', label: 'Phone Number', type: 'tel', required: true },
	{
		id: 'service',
		label: 'Service',
		type: 'select',
		required: true,
		options: SERVICES.map((service) => ({
			value: service.id,
			label: `${service.label} (${service.duration})`,
		})),
	},
	{
		id: 'date',
		label: 'Preferred Date',
		type: 'date',
		required: true,
		min: new Date().toISOString().split('T')[0],
	},
	{ id: 'time', label: 'Preferred Time', type: 'time', required: true },
];

const FormField = ({ field, value, onChange }) => {
	const baseInputClasses =
		'mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm border focus:border-green-600 focus:ring-green-600 p-2 h-[48px]';

	switch (field.type) {
		case 'select':
			return (
				<select
					id={field.id}
					name={field.id}
					required={field.required}
					value={value}
					onChange={onChange}
					className={baseInputClasses}>
					<option value=''>
						Select a {field.label.toLowerCase()}
					</option>
					{field.options.map((option) => (
						<option
							key={option.value}
							value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			);
		default:
			return (
				<input
					id={field.id}
					name={field.id}
					type={field.type}
					required={field.required}
					min={field.min}
					value={value}
					onChange={onChange}
					className={baseInputClasses}
				/>
			);
	}
};

export default function BookingForm() {
	const [formData, setFormData] = useState(
		FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {}),
	);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(
				'https://faithwin-backend.onrender.com/api/bookings',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData),
				},
			);

			if (response.ok) {
				setMessage({
					type: 'success',
					text: "Booking confirmed! We'll see you soon.",
				});
				setFormData(
					FORM_FIELDS.reduce(
						(acc, field) => ({ ...acc, [field.id]: '' }),
						{},
					),
				);
			} else {
				setMessage({
					type: 'error',
					text: 'Booking failed. Please try again.',
				});
			}
		} catch (error) {
			setMessage({
				type: 'error',
				text: 'An error occurred. Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-md'>
			<div className='flex items-center space-x-2'>
				<img
					src='/logo.png'
					alt=''
					className='h-[32px]'
				/>
				<div>
					<h2 className='text-2xl font-bold text-gray-700 leading-none'>
						Book Your Visit
					</h2>
					<p className='text-sm text-gray-600'>
						Transform your look with our expert stylists
					</p>
				</div>
			</div>

			{message && (
				<div
					className={`p-4 rounded-md ${
						message.type === 'success'
							? 'bg-green-50 text-green-800'
							: 'bg-red-50 text-red-800'
					}`}>
					{message.text}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className='mt-8 space-y-6'>
				<div className='space-y-4'>
					{FORM_FIELDS.map((field) => (
						<div key={field.id}>
							<label
								htmlFor={field.id}
								className='block text-sm font-medium text-gray-500'>
								{field.label}
							</label>
							<FormField
								field={field}
								value={formData[field.id]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full flex justify-center py-3 px-4 h-[52px] border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200'>
					{loading ? 'Booking...' : 'Book Appointment'}
				</button>
			</form>
		</div>
	);
}
