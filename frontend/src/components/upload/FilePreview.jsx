import { X, FileVideo } from "lucide-react";
import { formatFileSize } from "../../utils/helpers";

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  return (
    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card">
      <div className="flex items-start gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-24 h-24 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileVideo className="w-10 h-10 text-brand-600 dark:text-brand-400" />
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate mb-1">
            {file.name}
          </h4>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Size: {formatFileSize(file.size)}</span>
            <span>Type: {file.type.split("/")[1].toUpperCase()}</span>
          </div>
          <div className="mt-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold rounded-full inline-block">
            Ready to upload
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 flex-shrink-0"
          aria-label="Remove file"
        >
          <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
