import { useState } from 'react';

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ImageUpload = ({ handleImageUpload }) => {
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null)

  const handleSelectImage = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setMessage('No file selected.');
      setPreview(null);
      return;
    }

    setMessage('');
    setPreview(null);

    if (file.size > 100000000) {  // Adjust the size limit as needed
      return setMessage('Image too large. Please select a smaller image (max: 80KB)');
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();  // Create an empty form

    // Append fields to form
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Send request to Cloudinary
    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const imageData = await res.json();

      if (imageData.secure_url) {
        handleImageUpload(imageData.secure_url);  // Pass the URL string to the parent component
        setMessage('');  // Clear any previous messages
      } else {
        setMessage('Error uploading image. Please try again.');
      }
    } catch (error) {
      setMessage('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    } finally {
      // Clean up the URL object to avoid memory leaks
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleSelectImage} />
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {preview && <img src={preview} alt="Image Preview" style={{ width: '300px', height: 'auto', marginTop: '10px' }} />}
    </div>
  );
};

export default ImageUpload;