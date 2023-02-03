export interface IS3Service {
  getSignedUrl(key: string, bucket: string): Promise<string>;
}
