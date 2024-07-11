// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

// const f = createUploadthing();

// const handleAuth = () => {
//     const { userId } = auth();
//     if (!userId) throw new Error("Unauthorized");
//     return { userId: userId };
// }
// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//     serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//         .middleware(() => handleAuth())
//         .onUploadComplete(() => {}),
    
//     messageFile: f(["image", "pdf"])
//         .middleware(() => handleAuth())
//         .onUploadComplete(() => {})
    
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

// *------------------------------------------------------------


import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async (req: Request) => {
  const { userId } = auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter: FileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      return handleAuth(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  messageFile: f(["image", "pdf"])
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      return handleAuth(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
};

export type OurFileRouter = typeof ourFileRouter;