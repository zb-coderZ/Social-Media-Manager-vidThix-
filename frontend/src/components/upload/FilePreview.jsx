import { X, FileVideo } from "lucide-react";
import { formatFileSize } from "../../utils/helpers";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="p-4 bg-white/60 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 backdrop-blur-xl border border-gray-200/50 rounded-xl">
      <div className="flex items-start gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 dark:from-indigo-600/20 to-cyan-100 dark:to-cyan-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileVideo className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">
            {file.name}
          </h4>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
            <span>Size: {formatFileSize(file.size)}</span>
            <span>Type: {file.type.split("/")[1].toUpperCase()}</span>
          </div>
          <div className="mt-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full inline-block">
            Ready to upload
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700/60 rounded-lg transition-colors duration-200 flex-shrink-0"
          aria-label="Remove file"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
