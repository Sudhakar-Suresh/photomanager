import { useState, useEffect } from "react";
import { Calendar, Upload, Check, X, Eye } from "lucide-react";
import api from "../lib/api";
import { supabase } from "../lib/supabase";

interface Session {
  id: number;
  date: string;
  time: string;
  package: string;
  location: string;
  status: string;
  client_name: string;
  notes: string;
  created_at: string;
}

const PhotographerDashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingPhotos, setUploadingPhotos] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await api.get("/sessions/");
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSession = async (sessionId: number) => {
    try {
      await api.post(`/sessions/${sessionId}/approve/`);
      fetchSessions();
    } catch (error) {
      console.error("Error approving session:", error);
    }
  };

  const handleRejectSession = async (sessionId: number) => {
    try {
      await api.patch(`/sessions/${sessionId}/`, { status: "rejected" });
      fetchSessions();
    } catch (error) {
      console.error("Error rejecting session:", error);
    }
  };

  const handlePhotoUpload = async (sessionId: number, files: FileList) => {
    setUploadingPhotos({ ...uploadingPhotos, [sessionId]: true });

    try {
      for (const file of Array.from(files)) {
        // Upload to Supabase Storage
        const fileName = `${sessionId}/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("photos")
          .upload(fileName, file);

        if (error) throw error;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("photos").getPublicUrl(fileName);

        // Save photo record to backend
        await api.post("/photos/", {
          session: sessionId,
          file_url: publicUrl,
          filename: file.name,
        });
      }

      alert("Photos uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("Error uploading photos");
    } finally {
      setUploadingPhotos({ ...uploadingPhotos, [sessionId]: false });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Photographer Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your photography sessions and uploads
        </p>
      </div>

      {/* Sessions List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Session Requests
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sessions.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No session requests yet.
            </div>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Calendar className="h-8 w-8 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString()} at{" "}
                          {session.time}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            session.status
                          )}`}
                        >
                          {session.status.charAt(0).toUpperCase() +
                            session.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Client:</strong> {session.client_name}
                        </p>
                        <p>
                          <strong>Package:</strong>{" "}
                          {session.package.charAt(0).toUpperCase() +
                            session.package.slice(1)}
                        </p>
                        <p>
                          <strong>Location:</strong> {session.location}
                        </p>
                        {session.notes && (
                          <p>
                            <strong>Notes:</strong> {session.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {session.status === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveSession(session.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                        >
                          <Check className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectSession(session.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}

                    {session.status === "approved" && (
                      <div className="space-y-2">
                        <div>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files &&
                              handlePhotoUpload(session.id, e.target.files)
                            }
                            className="hidden"
                            id={`upload-${session.id}`}
                            disabled={uploadingPhotos[session.id]}
                          />
                          <label
                            htmlFor={`upload-${session.id}`}
                            className={`bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 cursor-pointer ${
                              uploadingPhotos[session.id]
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Upload className="h-4 w-4" />
                            <span>
                              {uploadingPhotos[session.id]
                                ? "Uploading..."
                                : "Upload Photos"}
                            </span>
                          </label>
                        </div>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View Gallery</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotographerDashboard;
