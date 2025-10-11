import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Camera, Download, ArrowLeft } from "lucide-react";

const Gallery = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
        <p className="text-gray-600">Session ID: {sessionId}</p>
      </div>

      {/* Gallery Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Session Photos</h2>
        </div>

        <div className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Gallery Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              Your photographer will upload photos here once your session is
              complete. You'll be notified via email when new photos are
              available.
            </p>

            {/* Mock Gallery Preview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download All Photos</span>
              </button>
              <p className="text-xs text-gray-500">
                Download will be available once photos are uploaded
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          What happens next?
        </h3>
        <ul className="text-blue-800 space-y-2">
          <li>• Your photographer will review and edit your photos</li>
          <li>• You'll receive an email notification when photos are ready</li>
          <li>• Photos will appear in this gallery for download</li>
          <li>• High-resolution versions will be available for download</li>
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
