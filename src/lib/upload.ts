export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Image upload failed");
  }

  return data.url as string;
};
