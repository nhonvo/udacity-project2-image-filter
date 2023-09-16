import fs from "fs";
import Jimp from "jimp";

// Filter and Save Image from URL
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Jimp.read(inputURL);
      const outputPath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await image
        .resize(256, 256) // Resize the image
        .quality(60) // Set JPEG quality
        .greyscale() // Convert to greyscale
        .write(__dirname + outputPath, (img) => {
          resolve(__dirname + outputPath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// Delete Local Files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
