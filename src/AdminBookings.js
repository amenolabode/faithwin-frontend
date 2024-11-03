import { useEffect, useState } from 'react';

export default function AdminBookings() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		fetchBookings();
	}, []);

	const fetchBookings = async () => {
		try {
			const response = await fetch('https://faithwin-backend.onrender.com/api/bookings');
			const data = await response.json();
			setBookings(Array.isArray(data.data) ? data.data : []);
		} catch (error) {
			console.error('Error fetching bookings:', error);
			setBookings([]);
		}
	};

	return (
		<div className='max-w-md w-full space-y-8 bg-white p-8 rounded-md' >
			<h3 className='text-lg font-medium text-gray-700'>Upcoming Appointments</h3>
			{bookings.length > 0 ? (
				<div className='mt-4 space-y-2'>
					{bookings.map((booking, index) => (
						<div key={index} className='p-3 bg-green-50 rounded-lg'>
							<p className='text-sm text-gray-700'>
								{booking.name} - {booking.service}
								<br />
								<span className='text-gray-500'>
									{new Date(booking.date).toLocaleDateString(undefined, {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}{' '}
									- {booking.time}
								</span>
							</p>
						</div>
					))}
				</div>
			) : (
				<p className='text-gray-500'>No bookings found.</p>
			)}
		</div>
	);
}
