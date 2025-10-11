import { useAuth } from "../contexts/AuthContext";
import { Camera, Upload, Calendar, User } from "lucide-react";

const PhotographerDashboard = () => {
  const { user, userRole } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Photographer Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.email}!</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Camera className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Photographer Account
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
              Session Requests
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Review and approve booking requests
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            View Requests
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Upload className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Photos
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Upload photos for completed sessions
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Upload Photos
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="h-8 w-8 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">My Sessions</h3>
          </div>
          <p className="text-gray-600 mb-4">Manage your photography sessions</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
            View Sessions
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
          <div className="text-gray-600">Pending Requests</div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">0</div>
          <div className="text-gray-600">Approved Sessions</div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
          <div className="text-gray-600">Photos Uploaded</div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
          <div className="text-gray-600">Completed Sessions</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            No recent activity. Start accepting session requests to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDashboard;
