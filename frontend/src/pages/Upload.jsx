import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload as UploadIcon,
  Globe,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useApp } from "../context/AppContext";
import { api } from "../utils/api";
import PlatformSelector from "../components/upload/PlatformSelector";
import UploadBox from "../components/upload/UploadBox";
import FilePreview from "../components/upload/FilePreview";
import VideoForm from "../components/upload/VideoForm";
import Scheduler from "../components/scheduler/Scheduler";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { UPLOAD_STATUS } from "../utils/constants";

const Upload = () => {
  const navigate = useNavigate();
  const { success, error: showError, info } = useToast();
  const { connectedPlatforms } = useApp();

  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "Education",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [, setVideoId] = useState(null);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isPlatformConnected = connectedPlatforms?.[selectedPlatform]?.connected === true;

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus(UPLOAD_STATUS.SELECTING);
    if (!formData.title) {
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setFormData((prev) => ({ ...prev, title: fileNameWithoutExt }));
    }
    info("File attached cleanly. Custom metadata fields to continue.");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus(UPLOAD_STATUS.IDLE);
    setUploadProgress(0);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.category) {
      errors.category = "Please select a category";
    }

    if (!selectedFile) {
      showError("Please select a video file to upload");
      return false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadAndSaveMetadata = async () => {
    setUploadStatus(UPLOAD_STATUS.UPLOADING);
    setUploadProgress(10);

    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append(
      "tags",
      JSON.stringify(
        formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    );
    uploadData.append("category", formData.category);

    // Simulate progress
    const progressTimer = setInterval(() => {
      setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev));
    }, 200);

    try {
      const uploadedVideo = await api.uploadVideo(uploadData);
      clearInterval(progressTimer);
      const uploadedVideoId = uploadedVideo.id || uploadedVideo._id;
      if (!uploadedVideoId) {
        throw new Error("The upload response did not include a valid video id.");
      }

      setVideoId(uploadedVideoId);
      setUploadProgress(100);
      setUploadStatus(UPLOAD_STATUS.COMPLETE);

      await api.updateVideo(uploadedVideoId, {
        title: formData.title,
        description: formData.description,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        category: formData.category,
      });

      return uploadedVideoId;
    } catch (err) {
      clearInterval(progressTimer);
      throw err;
    }
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    if (!isPlatformConnected) {
      showError(`Your ${selectedPlatform.toUpperCase()} account is not connected yet. Please connect your account under Platforms first.`);
      return;
    }

    setIsProcessing(true);
    try {
      const uploadedVideoId = await uploadAndSaveMetadata();
      const publishedVideo = await api.publishVideo(
        uploadedVideoId,
        selectedPlatform,
      );
      setPublishedUrl(publishedVideo.external_url);
      success(`Content published to ${selectedPlatform.toUpperCase()} successfully!`);
    } catch (requestError) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      showError(requestError.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSchedule = async (scheduleData) => {
    if (!validateForm()) return;

    if (!isPlatformConnected) {
      showError(`Your ${selectedPlatform.toUpperCase()} account is not connected yet. Please connect your account under Platforms first.`);
      return;
    }

    setIsProcessing(true);
    try {
      const scheduledVideoId = await uploadAndSaveMetadata();
      await api.scheduleVideo(scheduledVideoId, {
        scheduled_at: scheduleData.scheduledTime,
        privacy_status: "public",
        platform: selectedPlatform,
      });
      success(`Post scheduled for ${selectedPlatform.toUpperCase()} successfully.`);
      handleReset();
      navigate("/dashboard");
    } catch (requestError) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      showError(requestError.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus(UPLOAD_STATUS.IDLE);
    setUploadProgress(0);
    setFormData({ title: "", description: "", tags: "", category: "Education" });
    setFormErrors({});
    setVideoId(null);
    setPublishedUrl(null);
    setIsProcessing(false);
  };

  const isFormComplete =
    selectedFile && formData.title && formData.description && formData.category;

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
            Upload & Publish Content
          </h1>
          <p className="dark:text-gray-400 text-gray-600">
            Publish or schedule video posts directly to your connected YouTube and LinkedIn accounts.
          </p>
        </div>
      </div>

      {/* Progress Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          {
            step: "1",
            label: "Select Platform & Video",
            status: selectedFile
              ? "complete"
              : uploadStatus === UPLOAD_STATUS.SELECTING
                ? "active"
                : "pending",
          },
          {
            step: "2",
            label: "Customize Post Details",
            status: isFormComplete
              ? "complete"
              : selectedFile
                ? "active"
                : "pending",
          },
          {
            step: "3",
            label: "Publish or Schedule",
            status:
              uploadStatus === UPLOAD_STATUS.COMPLETE ? "complete" : "pending",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl border transition-all duration-200 ${
              item.status === "complete"
                ? "dark:bg-emerald-500/10 dark:border-emerald-500/30 bg-emerald-50 border-emerald-200"
                : item.status === "active"
                  ? "bg-white dark:bg-slate-900 border-brand-500 text-brand-600 font-semibold shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.status === "complete" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              ) : (
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    item.status === "active"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {item.step}
                </span>
              )}
              <span
                className={`text-xs sm:text-sm font-bold truncate ${
                  item.status === "complete"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : item.status === "active"
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Connection Notice if Not Connected */}
      {!isPlatformConnected && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300">
              Your <strong className="capitalize">{selectedPlatform}</strong> account is not connected yet. You need an active OAuth connection to publish directly.
            </p>
          </div>
          <Link
            to="/platforms"
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap transition-colors"
          >
            Connect {selectedPlatform.toUpperCase()} Account
          </Link>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 w-full min-w-0">
        {/* Left Column - Forms & File Drop */}
        <div className="lg:col-span-2 space-y-6 w-full min-w-0">
          {/* Platform Selector */}
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card w-full min-w-0">
            <PlatformSelector
              selected={selectedPlatform}
              onChange={setSelectedPlatform}
            />
          </div>

          {/* Upload Box */}
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card w-full min-w-0">
            <UploadBox
              onFileSelect={handleFileSelect}
              isUploading={uploadStatus === UPLOAD_STATUS.UPLOADING}
              uploadProgress={uploadProgress}
            />
          </div>

          {/* File Preview */}
          {selectedFile && uploadStatus !== UPLOAD_STATUS.UPLOADING && (
            <FilePreview file={selectedFile} onRemove={handleRemoveFile} />
          )}

          {/* Video Metadata Form */}
          {selectedFile && (
            <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card w-full min-w-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-500" />
                Post Details & Customization ({selectedPlatform.toUpperCase()})
              </h3>
              <VideoForm
                formData={formData}
                onChange={setFormData}
                errors={formErrors}
              />
            </div>
          )}
        </div>

        {/* Right Column - Actions & Tips */}
        <div className="lg:col-span-1 space-y-6 w-full min-w-0">
          {/* Actions Box */}
          <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card space-y-3.5 w-full min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
              Publish Actions
            </h3>

            <button
              onClick={() => setIsSchedulerOpen(true)}
              disabled={!isFormComplete || isProcessing || !isPlatformConnected}
              className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calendar className="w-5 h-5 text-brand-500" />
              Schedule Post
            </button>

            <button
              onClick={handleUpload}
              disabled={!isFormComplete || isProcessing || !isPlatformConnected}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-150 ${
                selectedPlatform === "linkedin"
                  ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                  : "bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-700 hover:to-accent-600 shadow-brand-500/20"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
            >
              {uploadStatus === UPLOAD_STATUS.UPLOADING ? (
                <>
                  <LoadingSpinner size="sm" />
                  Publishing to {selectedPlatform.toUpperCase()}...
                </>
              ) : uploadStatus === UPLOAD_STATUS.COMPLETE ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {publishedUrl ? "Published Successfully!" : "Upload Complete!"}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Publish to {selectedPlatform.toUpperCase()}
                </>
              )}
            </button>

            {publishedUrl && (
              <a
                href={publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold text-center text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 rounded-xl border border-brand-200 dark:border-brand-800 hover:underline"
              >
                View Live on {selectedPlatform.toUpperCase()} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={handleReset}
              className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs rounded-xl transition-all duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Pro Tips Box */}
          <div className="p-6 bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-transparent dark:bg-slate-900 border border-brand-500/20 dark:border-slate-800 rounded-2xl">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              Publishing Best Practices
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <li>• <strong>YouTube</strong>: High-resolution thumbnails and detailed tags improve search discoverability.</li>
              <li>• <strong>LinkedIn</strong>: Clear headlines and professional commentary drive higher member engagement.</li>
              <li>• <strong>Scheduling</strong>: Target peak engagement hours for maximum reach across timezones.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scheduler Modal */}
      <Scheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  );
};

export default Upload;
