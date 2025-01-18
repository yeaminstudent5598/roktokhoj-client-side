
import { FaUserFriends, FaHandHoldingUsd, FaHeartbeat } from 'react-icons/fa';

const AdminProfile = () => {
    const stats = [
        {
            icon: <FaUserFriends className="text-green-500 text-4xl" />, // Donor icon
            title: 'Total Donors',
            count: 1200,
        },
        {
            icon: <FaHandHoldingUsd className="text-yellow-500 text-4xl" />, // Funding icon
            title: 'Total Funding',
            count: '$15,000',
        },
        {
            icon: <FaHeartbeat className="text-red-500 text-4xl" />, // Blood donation request icon
            title: 'Blood Donation Requests',
            count: 300,
        },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">Welcome, Admin!</h1>
                <p className="text-gray-600">Manage and track your organization's progress efficiently.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <div className="mb-4">{stat.icon}</div>
                        <h2 className="text-3xl font-bold mb-2">{stat.count}</h2>
                        <p className="text-gray-600">{stat.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProfile;
