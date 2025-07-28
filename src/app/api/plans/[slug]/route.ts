import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { parseFormData } from "@/app/lib/parseForm";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/app/lib/util/cloudinary";
import slugifyLib from "slugify";
import { deleteImageFromCloudinary } from "@/app/lib/cloudinaryUtils";
type UploadedFile = {
  filepath: string;
  originalFilename?: string;
  mimetype?: string;
  size?: number;
};
// === GET ===
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log("🔎 GET slug:", slug);

    const client = await clientPromise;
    const db = client.db("alfa_business");
    const collection = db.collection("plans");

    const plan = await collection.findOne({ slug });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (err: any) {
    console.error("❌ GET error:", err.message || err);
    return NextResponse.json(
      { error: "Fetch error", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// === PUT ===
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log("👉 PUT received slug:", slug);

    const { fields, files } = await parseFormData(req);
    console.log("📥 Parsed fields:", fields);
    console.log("🖼️ Parsed files:", files);

    const {
      title,
      monthlyPrice,
      yearlyPrice,
      available,
      popular,
      description,
      monthlyFeatures,
      yearlyFeatures,
      existingImages = "[]",
    } = fields;

    // Parse and normalize `existingImages` (only keep ones that still exist)
    const parsedExistingImages: string[] = (() => {
      try {
        return JSON.parse(
          Array.isArray(existingImages)
            ? existingImages[0]
            : existingImages || "[]"
        );
      } catch (err) {
        console.warn("⚠️ Invalid existingImages JSON:", existingImages);
        return [];
      }
    })();

    // Handle file uploads (if any)
    const newFiles: UploadedFile[] = Array.isArray(files.images)
      ? files.images
      : files.images
      ? [files.images]
      : [];

    const uploadedImages = await Promise.all(
      newFiles.map((file: UploadedFile) =>
        uploadToCloudinary(file.filepath, "plans")
      )
    );

    // Fetch current plan to get old image list
    const client = await clientPromise;
    const db = client.db("alfa_business");
    const collection = db.collection("plans");

    const currentPlan = await collection.findOne({ slug });

    if (!currentPlan) {
      return NextResponse.json({ error: "Plan not found." }, { status: 404 });
    }

    const oldImages: string[] = currentPlan.images || [];

    // Determine which old images were removed by the user
    const removedImages = oldImages.filter(
      (url) => !parsedExistingImages.includes(url)
    );

    const finalImages = [...parsedExistingImages, ...uploadedImages];

    // Optional: Delete removed images from Cloudinary
    // await Promise.all(
    //   removedImages.map((url) => deleteFromCloudinary(url))
    // );

    const newSlug = slugifyLib(Array.isArray(title) ? title[0] : title || "", {
      lower: true,
      strict: true,
    });

    // Prevent duplicate slugs
    if (newSlug !== slug) {
      const slugExists = await collection.findOne({ slug: newSlug });
      if (slugExists) {
        return NextResponse.json(
          {
            error:
              "A plan with a similar title already exists. Please use a different title.",
          },
          { status: 409 }
        );
      }
    }

    const updateResult = await collection.updateOne(
      { slug },
      {
        $set: {
          title: Array.isArray(title) ? title[0] : title || "",
          slug: newSlug,
          description: Array.isArray(description)
            ? description[0]
            : description || "",
          monthlyPrice: Number(
            Array.isArray(monthlyPrice) ? monthlyPrice[0] : monthlyPrice || 0
          ),
          yearlyPrice: Number(
            Array.isArray(yearlyPrice) ? yearlyPrice[0] : yearlyPrice || 0
          ),
          available: Array.isArray(available)
            ? available[0] === "true"
            : available === "true",
          popular: Array.isArray(popular)
            ? popular[0] === "true"
            : popular === "true",
          monthlyFeatures: JSON.parse(
            Array.isArray(monthlyFeatures)
              ? monthlyFeatures[0]
              : monthlyFeatures || "[]"
          ),
          yearlyFeatures: JSON.parse(
            Array.isArray(yearlyFeatures)
              ? yearlyFeatures[0]
              : yearlyFeatures || "[]"
          ),
          images: finalImages,
        },
      }
    );

    return NextResponse.json(
      { message: "Plan updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("🔥 PUT error:", err.message || err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === DELETE ===
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const client = await clientPromise;
    const db = client.db("alfa_business");
    const collection = db.collection("plans");

    const plan = await collection.findOne({ slug });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (plan.images && plan.images.length > 0) {
      await Promise.all(
        plan.images.map((url: string) => deleteImageFromCloudinary(url))
      );
    }

    const deleteResult = await collection.deleteOne({ slug });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Plan deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("❌ DELETE error:", err.message || err);
    return NextResponse.json(
      { error: "Delete failed", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
