import * as redis from "redis";
import logger from "../api/common/logger/logger";
import { awsAccessKeyId, awsSecretAccessKey, bucketName } from "./vars";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import mime from "mime";

class AwsS3Client {
  s3: AWS.S3;
  bucketName: string;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
      // region: "us-east-2",
    });
    this.bucketName = bucketName as string;
  }
  // uploadFile = (fileName: any) => {
  //   fs.readFile(fileName, (err, data) => {
  //     if (err) throw err;
  //     const params = {
  //       Bucket: this.bucketName,
  //       Key: fileName,
  //       Body: JSON.stringify(data, null, 2),
  //     };
  //     this.s3.upload(params, function (s3Err: any, data: any) {
  //       if (s3Err) throw s3Err;
  //       // const url = `https://${bucketName}.s3.amazonaws.com/${fileName}`
  //       console.log(`File uploaded successfully at ${data.Location}`);
  //       return data.Location;
  //     });
  //   });
  // };
  uploadFile = async (filePath: string) => {
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);
    const contentType = mime.getType(filePath) || "application/octet-stream";

    const params = {
      Bucket: this.bucketName,
      Key: `eventPosters/${fileName}`,
      Body: fileContent,
      ContentType: contentType,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(
        params,
        function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
          if (err) {
            reject(err);
          } else {
            resolve(data.Location);
          }
        }
      );
    });
  };
}

export const awsS3Client = new AwsS3Client();
