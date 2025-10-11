import { useAuth } from "../contexts/AuthContext";
import { Calendar, Plus, User } from "lucide-react";

const ClientDashboard = () => {
  const { user, userRole } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.email}!</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Account Information
            </h2>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {userRole}</p>
            <p className="text-gray-600">User ID: {user?.id}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Book Session
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Schedule a new photography session
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Booking</span>
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">My Sessions</h3>
          </div>
          <p className="text-gray-600 mb-4">
            View your upcoming and past sessions
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            View Sessions
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Photo Gallery
            </h3>
          </div>
          <p className="text-gray-600 mb-4">Browse and download your photos</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            View Gallery
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No recent activity. Book your first session to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
