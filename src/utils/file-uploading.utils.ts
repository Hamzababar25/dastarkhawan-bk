import * as cloudinary from 'cloudinary'
import * as fs from 'fs'


cloudinary.v2.config({
  cloud_name: "dstwutgeh",
  api_key: "398229522881186",
  api_secret: "-W6RmFX4dQ_uDPme2qh2FLPP2yw",
  secure: true
})
export const UploadFile = async  (samplefile: string) => {
  const img = await cloudinary.v2.uploader.upload(samplefile
    , {
      resource_type: 'image'
    });
  return img.secure_url
}

export const UploadVideo = async (samplefile: string) => {
  // console.log("sample video", samplefile);

  const video = await cloudinary.v2.uploader.upload(samplefile
    , {
      resource_type: 'video', // Set the resource type to 'video' for video uploads
    });
  return video.secure_url;
}
export const UploadPDF = async (samplefile: string) => {
    const pdf = await cloudinary.v2.uploader.upload(samplefile, {
      resource_type: 'raw', // 'raw' is used for non-image and non-video files
    });
    return pdf.secure_url;
  };