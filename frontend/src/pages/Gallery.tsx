import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Download, Eye } from "lucide-react";
import api from "../lib/api";

interface Photo {
  id: number;
  file_url: string;
  filename: string;
  uploaded_at: string;
  is_approved: boolean;
}

interface Session {
  id: number;
  date: string;
  package: string;
  location: string;
  client_name: string;
}

const Gallery = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchGalleryData();
    }
  }, [sessionId]);

  const fetchGalleryData = async () => {
    try {
      // Fetch session details
      const sessionResponse = await api.get(`/sessions/${sessionId}/`);
      setSession(sessionResponse.data);

      // Fetch photos for this session
      const photosResponse = await api.get(`/photos/?session_id=${sessionId}`);
      setPhotos(
        photosResponse.data.filter((photo: Photo) => photo.is_approved)
      );
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (photo: Photo) => {
    try {
      const response = await fetch(photo.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = photo.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading photo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading gallery...
      </div>
    );
  }

  if (!session) {
    return <div className="text-center py-8">Session not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Session Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
        <div className="text-gray-600">
          <p>
            <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Package:</strong>{" "}
            {session.package.charAt(0).toUpperCase() + session.package.slice(1)}
          </p>
          <p>
            <strong>Location:</strong> {session.location}
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No photos available yet.</p>
          <p className="text-gray-400">
            Photos will appear here once uploaded by your photographer.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={photo.file_url}
                    alt={photo.filename}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(photo)}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                photos.forEach((photo) => handleDownload(photo));
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto"
            >
              <Download className="h-5 w-5" />
              <span>Download All Photos</span>
            </button>
          </div>
        </>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.file_url}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
            <button
              onClick={() => handleDownload(selectedPhoto)}
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
