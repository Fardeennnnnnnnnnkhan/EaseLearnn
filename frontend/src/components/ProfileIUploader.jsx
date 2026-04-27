import  { useState } from 'react';
import defaultImage from './default.png'; // Replace with your actual default image path

const ProfileUploader = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Upload field */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-light
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      {/* Profile Preview */}
      <div className="avatar flex-shrink-0 mb-4">
        <img
          className="w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover"
          src={preview || defaultImage}
          alt="Profile"
        />
      </div>

      {/* Remove Button */}
      {preview && (
        <button
          onClick={handleRemoveImage}
          className="px-4 py-2 text-sm bg-red-500 text-foreground rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ProfileUploader;
