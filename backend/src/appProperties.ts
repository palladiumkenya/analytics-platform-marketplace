import dotenv from 'dotenv';
dotenv.config()

function getEnvVar(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing env variable ${key}`);
    }
    return value;
}
const appProperties = {
    minioEndpoint: getEnvVar('MINIO_ENDPOINT'),
    minioAccessKey: getEnvVar('MINIO_ACCESS_KEY'),
    minioAccessKeySecret: getEnvVar('MINIO_SECRET_KEY'),
    minioBucketName: getEnvVar('MINIO_BUCKET'),
    databaseHost: getEnvVar('DATABASE_HOST'),
    databaseUsername: getEnvVar('DATABASE_USERNAME'),
    databasePassword: getEnvVar('DATABASE_PASSWORD'),
    databaseName: getEnvVar('DATABASE_NAME'),

}

export default appProperties;