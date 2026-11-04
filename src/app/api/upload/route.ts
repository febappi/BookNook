import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const POST = async (request: Request) => {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Please login to upload an image" }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File) || !image.type.startsWith("image/")) {
    return NextResponse.json({ message: "Please choose an image file" }, { status: 400 });
  }
  if (image.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ message: "Image must be smaller than 5 MB" }, { status: 400 });
  }

  const imgbbData = new FormData();
  imgbbData.append("image", image);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
    method: "POST",
    body: imgbbData,
  });
  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json({ message: "Image upload failed. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ url: data.data.url });
};
