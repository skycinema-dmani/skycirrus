import multer from 'multer';
declare const uploadsDir: string;
export declare const upload: multer.Multer;
export declare function fileUrl(filename: string): string;
export { uploadsDir };
