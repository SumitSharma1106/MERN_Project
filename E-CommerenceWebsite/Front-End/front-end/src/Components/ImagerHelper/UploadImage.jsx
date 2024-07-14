// UploadImage.jsx
// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
const url = "https://api.cloudinary.com/v1_1/dy4zre1le/image/upload";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ecommerce-product");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error if you want to handle it further up the chain
  }
};

export default uploadImage;
