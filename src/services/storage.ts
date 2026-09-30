/**
 * Storage Provider Abstraction
 * 
 * This allows the CRM to switch between Local Storage, S3, Supabase Storage, 
 * or other cloud providers without changing business logic in the UI.
 */

export interface StorageAdapter {
  uploadFile(file: File, path: string): Promise<string>;
  deleteFile(path: string): Promise<boolean>;
  getFileUrl(path: string): Promise<string>;
}

// Local Storage Implementation (Mock for now, could use fs in Next.js API routes)
class LocalStorageAdapter implements StorageAdapter {
  async uploadFile(file: File, path: string): Promise<string> {
    console.log(`[LocalStorage] Uploading ${file.name} to ${path}`);
    return `/uploads/${path}/${file.name}`;
  }

  async deleteFile(path: string): Promise<boolean> {
    console.log(`[LocalStorage] Deleting file at ${path}`);
    return true;
  }

  async getFileUrl(path: string): Promise<string> {
    return `/uploads/${path}`;
  }
}

// Factory to resolve the correct adapter based on ENV
export function getStorageProvider(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER || 'local';
  
  if (provider === 'local') {
    return new LocalStorageAdapter();
  }
  
  // Future: return new S3StorageAdapter() or new SupabaseStorageAdapter()
  return new LocalStorageAdapter();
}

export const storage = getStorageProvider();
