import { KoyaLiteClient } from '../client';
import { File } from '@koyalite/core-types';
import { z } from 'zod';
import FormData from 'form-data';

const uploadOptionsSchema = z.object({
  path: z.string().min(1),
  contentType: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  isPublic: z.boolean().optional().default(false),
});

export class StorageResource {
  constructor(private client: KoyaLiteClient) {}

  // File Operations
  async listFiles(prefix?: string): Promise<File[]> {
    return this.client.get('/api/v1/storage/files', { prefix });
  }

  async uploadFile(file: Buffer | Blob, options: z.infer<typeof uploadOptionsSchema>): Promise<File> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    return this.client.post('/api/v1/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async uploadStream(stream: NodeJS.ReadableStream, options: z.infer<typeof uploadOptionsSchema>): Promise<File> {
    const formData = new FormData();
    formData.append('file', stream);
    formData.append('options', JSON.stringify(options));

    return this.client.post('/api/v1/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async downloadFile(fileId: string): Promise<Buffer> {
    const response = await this.client.get(`/api/v1/storage/files/${fileId}/download`, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response);
  }

  async downloadStream(fileId: string): Promise<NodeJS.ReadableStream> {
    return this.client.get(`/api/v1/storage/files/${fileId}/download`, {
      responseType: 'stream',
    });
  }

  async deleteFile(fileId: string): Promise<void> {
    return this.client.delete(`/api/v1/storage/files/${fileId}`);
  }

  async getFileMetadata(fileId: string): Promise<File> {
    return this.client.get(`/api/v1/storage/files/${fileId}`);
  }

  async updateFileMetadata(fileId: string, metadata: Record<string, string>): Promise<File> {
    return this.client.put(`/api/v1/storage/files/${fileId}/metadata`, { metadata });
  }

  // Presigned URLs
  async getUploadUrl(options: z.infer<typeof uploadOptionsSchema>): Promise<{
    url: string;
    fields: Record<string, string>;
  }> {
    return this.client.post('/api/v1/storage/upload-url', options);
  }

  async getDownloadUrl(fileId: string, expiresIn?: number): Promise<string> {
    return this.client.get(`/api/v1/storage/files/${fileId}/download-url`, {
      expiresIn,
    });
  }

  // Batch Operations
  async deleteFiles(fileIds: string[]): Promise<void> {
    return this.client.post('/api/v1/storage/batch-delete', { fileIds });
  }

  async moveFiles(files: { fileId: string; newPath: string }[]): Promise<File[]> {
    return this.client.post('/api/v1/storage/batch-move', { files });
  }

  // Progress Tracking
  uploadFileWithProgress(
    file: Buffer | Blob,
    options: z.infer<typeof uploadOptionsSchema>,
    onProgress?: (progress: number) => void
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('options', JSON.stringify(options));

      this.client.post('/api/v1/storage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress?.(progress);
          }
        },
      })
        .then(resolve)
        .catch(reject);
    });
  }
} 