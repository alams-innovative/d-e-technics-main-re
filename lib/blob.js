import { put, del, list, head } from '@vercel/blob';

const BLOB_STORE = 'd-e-technics-nextjs-blob';
const PDF_FOLDER = 'pdf';

/**
 * Upload a PDF file to Vercel Blob storage
 * @param {File|Buffer} file - The PDF file to upload
 * @param {string} filename - The filename for the PDF
 * @returns {Promise<Object>} - Upload result with URL and metadata
 */
export async function uploadPDF(file, filename) {
  try {
    const pathname = `${PDF_FOLDER}/${filename}`;
    
    const blob = await put(pathname, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt
    };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Delete a PDF file from Vercel Blob storage
 * @param {string} url - The blob URL to delete
 * @returns {Promise<Object>} - Deletion result
 */
export async function deletePDF(url) {
  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      success: true,
      message: 'PDF deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting PDF:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * List all PDF files in the blob storage
 * @param {string} prefix - Optional prefix to filter files
 * @returns {Promise<Object>} - List of PDF files
 */
export async function listPDFs(prefix = '') {
  try {
    const fullPrefix = prefix ? `${PDF_FOLDER}/${prefix}` : PDF_FOLDER;
    
    const { blobs } = await list({
      prefix: fullPrefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      success: true,
      files: blobs.map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        filename: blob.pathname.replace(`${PDF_FOLDER}/`, '')
      }))
    };
  } catch (error) {
    console.error('Error listing PDFs:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get metadata for a specific PDF file
 * @param {string} url - The blob URL
 * @returns {Promise<Object>} - File metadata
 */
export async function getPDFMetadata(url) {
  try {
    const metadata = await head(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return {
      success: true,
      metadata: {
        url: metadata.url,
        pathname: metadata.pathname,
        size: metadata.size,
        uploadedAt: metadata.uploadedAt,
        contentType: metadata.contentType
      }
    };
  } catch (error) {
    console.error('Error getting PDF metadata:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
