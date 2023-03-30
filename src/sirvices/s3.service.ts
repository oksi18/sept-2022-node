import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";

import { configs } from "../configs";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_BUCKET_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    })
  ) {}

  public async uploadPhoto(
    file: any,
    itemType: string,
    itemId: string
  ): Promise<string> {
    const filePath = this.buildPath(file.name, itemType, itemId); //шлях для нашого бакету
    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimeType,
        ACL: configs.AWS_S3_BUCKET_ACL, // low
      })
    );
    return filePath;
  }
  private buildPath(
    fileName: string,
    itemType: string,
    itemId: string
  ): string {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }

  public async deletePhoto(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      })
    );
  }
}
export const s3Service = new S3Service();
