import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileVideo, AlertCircle } from "lucide-react";
import { UPLOAD_CONFIG } from "../../utils/constants";
import { formatFileSize } from "../../utils/helpers";

const UploadBox = ({ onFileSelect, isUploading, uploadProgress }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        console.error("File rejected:", error.message);
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: UPLOAD_CONFIG.ACCEPTED_VIDEO_TYPES,
      maxSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
      multiple: false,
      disabled: isUploading,
    });

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        Upload Video
      </label>

      <div
        {...getRootProps()}
        className={`relative rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-6 sm:p-8 text-center transition-colors duration-150 cursor-pointer ${
          isUploading
            ? "dark:border-slate-700 dark:bg-slate-900/50 cursor-not-allowed bg-slate-100"
            : isDragActive && !isDragReject
              ? "border-brand-500 bg-brand-50/50 dark:bg-brand-950/30"
              : isDragReject
                ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                : "hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-950/30"
        }`}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center mx-auto">
              <FileVideo className="w-8 h-8 text-brand-600 dark:text-brand-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
                Uploading... {uploadProgress}%
              </p>
              <div className="max-w-xs mx-auto h-2 dark:bg-navy-700 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : isDragActive ? (
          <>
            {isDragReject ? (
              <>
                <AlertCircle className="w-16 h-16 dark:text-red-400 text-red-500 mx-auto mb-4" />
                <p className="text-lg font-semibold dark:text-red-400 text-red-600 mb-2">
                  File type not supported
                </p>
                <p className="text-sm dark:text-red-500 text-red-500">
                  Please upload a video file (.mp4, .mov, .avi, etc.)
                </p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-brand-600 dark:text-brand-400 mx-auto mb-4" />
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Drop your video here
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-brand-600 dark:text-brand-400" />
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
              Drag and drop your video here
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">
              or click to browse files
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm">
              <FileVideo className="w-5 h-5" />
              Choose File
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-4">
              Supported formats: MP4, MOV, AVI, MKV, WebM (max{" "}
              {formatFileSize(UPLOAD_CONFIG.MAX_FILE_SIZE)})
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
