import { useState } from 'react';

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ImageUpload = ({ handleImageUpload }) => {
  const [message, setMessage] = useState('');

  const handleSelectImage = async (event) => {
    const file = event.target.files[0];

    if (file.size > 100000000) {  // Adjust the size limit as needed
      return setMessage('Image too large. Please select a smaller image (max: 80KB)');
    }

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
    }
  };

  return (
    <div>
      <input type="file" onChange={handleSelectImage} />
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default ImageUpload;