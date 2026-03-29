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
      <label className="block text-sm font-semibold dark:text-white text-gray-900">
        Upload Video
      </label>

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
          isUploading
            ? "dark:border-navy-700 dark:bg-navy-800/40 dark:cursor-not-allowed border-gray-300 bg-gray-100 cursor-not-allowed"
            : isDragActive && !isDragReject
              ? "dark:border-indigo-500 dark:bg-indigo-600/10 dark:shadow-glow border-indigo-400 bg-indigo-100/50 shadow-md"
              : isDragReject
                ? "dark:border-red-500/60 dark:bg-red-600/10 border-red-400 bg-red-100/50"
                : "dark:border-navy-700 dark:hover:border-cyan-400/50 dark:hover:bg-indigo-600/5 dark:cursor-pointer border-gray-300 hover:border-indigo-400/50 hover:bg-indigo-100/30 cursor-pointer"
        }`}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center mx-auto">
              <FileVideo className="w-8 h-8 dark:text-indigo-400 text-indigo-600 animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
                Uploading... {uploadProgress}%
              </p>
              <div className="max-w-xs mx-auto h-2 dark:bg-navy-700 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full dark:bg-gradient-to-r dark:from-indigo-600 dark:to-cyan-500 bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300"
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
                <Upload className="w-16 h-16 dark:text-indigo-400 text-indigo-600 mx-auto mb-4" />
                <p className="text-lg font-semibold dark:text-indigo-400 text-indigo-600 mb-2">
                  Drop your video here
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 dark:text-indigo-400 text-indigo-600" />
            </div>
            <p className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
              Drag and drop your video here
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
              or click to browse files
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange transform">
              <FileVideo className="w-5 h-5" />
              Choose File
            </div>
            <p className="text-xs dark:text-gray-500 text-gray-600 mt-4">
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
