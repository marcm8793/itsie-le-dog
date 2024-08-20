import { NextResponse } from "next/server";

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=100`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            apiKey + ":" + apiSecret
          ).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Cloudinary");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching photos from Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
