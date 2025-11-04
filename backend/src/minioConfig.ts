import { S3Client } from "@aws-sdk/client-s3";
import appProperties from './appProperties';

export const s3 = new S3Client({
  region: "us-east-1",
  endpoint: appProperties.minioEndpoint,
  credentials: {
    accessKeyId: appProperties.minioAccessKey,
    secretAccessKey: appProperties.minioAccessKeySecret,
  },
  forcePathStyle: true,
});

export const BUCKET = appProperties.minioBucketName;