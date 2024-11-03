import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import AdminBookings from './AdminBookings';

function App() {
	return (
		<Router>
			<div
				className=' flex-col items-center justify-center px-4 py-12 min-h-screen bg-cover bg-center bg-no-repeat bg-gray-50 flex'
				style={{
					backgroundImage: `url('/image.jpg')`,
				}}>
				{/* <nav className='mb-8'>
					<Link
						to='/'
						className='mr-4 text-green-700'>
						Book Appointment
					</Link>
					<Link
						to='/admin'
						className='text-green-700'>
						Admin View
					</Link>
				</nav> */}

				<Routes>
					<Route
						path='/'
						element={<BookingForm />}
					/>
					<Route
						path='/admin'
						element={<AdminBookings />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
