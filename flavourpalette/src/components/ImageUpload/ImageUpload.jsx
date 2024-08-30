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

    if (file.size > 100000000) { 
      return setMessage('Image too large. Please select a smaller image (max: 80KB)');
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();

    
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    
    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const imageData = await res.json();

      if (imageData.secure_url) {
        handleImageUpload(imageData.secure_url);  
        setMessage('');  
      } else {
        setMessage('Error uploading image. Please try again.');
      }
    } catch (error) {
      setMessage('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    } finally {
      
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