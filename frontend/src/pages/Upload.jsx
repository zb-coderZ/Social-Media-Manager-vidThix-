import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "../context/ToastContext";
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

  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({});
  // SEO temporarily disabled. Preserve this state for later restoration.
  // const [seoResult, setSeoResult] = useState(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus(UPLOAD_STATUS.SELECTING);
    info("File selected. Fill in the details to continue.");
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

  /* SEO temporarily disabled. Preserve the analyzer handler for later restoration.
  const handleCheckSEO = () => {
    if (!formData.title && !formData.description && !formData.tags) {
      info('Fill in at least the title or description to check SEO score');
      return;
    }

    const result = calculateSEOScore(formData);
    setSeoResult(result);

    if (result.score >= 70) {
      success('Great! Your content has a high SEO score.');
    } else if (result.score >= 40) {
      info('Your SEO score is good, but can be improved.');
    } else {
      showError('Low SEO score. Please check the suggestions to improve.');
    }
  };
  */

  const uploadAndSaveMetadata = async () => {
    setUploadStatus(UPLOAD_STATUS.UPLOADING);
    setUploadProgress(0);

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

    const uploadedVideo = await api.uploadVideo(uploadData);
    const uploadedVideoId = uploadedVideo.id || uploadedVideo._id;
    if (!uploadedVideoId) {
      throw new Error("The upload response did not include a video id.");
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
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      const uploadedVideoId = await uploadAndSaveMetadata();
      const publishedVideo = await api.publishVideo(
        uploadedVideoId,
        selectedPlatform,
      );
      setPublishedUrl(publishedVideo.external_url);
      success("Video published successfully.");
    } catch (requestError) {
      setUploadStatus(UPLOAD_STATUS.ERROR);
      showError(requestError.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSchedule = async (scheduleData) => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      const scheduledVideoId = await uploadAndSaveMetadata();
      await api.scheduleVideo(scheduledVideoId, {
        scheduled_at: scheduleData.scheduledTime,
        privacy_status: "public",
        platform: selectedPlatform,
      });
      success("Post scheduled successfully.");
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
    setFormData({ title: "", description: "", tags: "", category: "" });
    setFormErrors({});
    setVideoId(null);
    setPublishedUrl(null);
    setIsProcessing(false);
    // SEO temporarily disabled. Restore when the analyzer is re-enabled.
    // setSeoResult(null);
  };

  const isFormComplete =
    selectedFile && formData.title && formData.description && formData.category;

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        ? "text-brand-600" : "text-slate-400"
        <p className="dark:text-gray-400 text-gray-600">
          Upload your video, customize it, publish, or schedule it.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          {
            icon: "upload",
            label: "Upload",
            status: selectedFile
              ? "complete"
              : uploadStatus === UPLOAD_STATUS.SELECTING
                ? "active"
                : "pending",
          },
          {
            icon: "edit",
            label: "Details",
            status: isFormComplete
              ? "complete"
              : selectedFile
                ? "active"
                : "pending",
          },
          // SEO temporarily disabled. Restore the SEO Check step later.
          {
            icon: "publish",
            label: "Publish",
            status:
              uploadStatus === UPLOAD_STATUS.COMPLETE ? "complete" : "pending",
          },
        ].map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${
              step.status === "complete"
                ? "dark:bg-emerald-500/20 dark:border-emerald-500/30 bg-emerald-50 border-emerald-200"
                : step.status === "active"
                  ? "text-brand-600 font-semibold border-b-2 border-brand-600"
                  : "dark:bg-navy-800/60 dark:border-navy-700 bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {step.status === "complete" ? (
                <CheckCircle2 className="w-5 h-5 dark:text-emerald-400 text-emerald-600" />
              ) : (
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.status === "active"
                      ? "text-brand-600"
                      : "text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>
              )}
              <span
                className={`text-sm font-semibold ${
                  step.status === "complete"
                    ? "text-brand-600"
                    : step.status === "active"
                      ? "text-brand-600"
                      : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload & Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selector */}
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
            <PlatformSelector
              selected={selectedPlatform}
              onChange={setSelectedPlatform}
            />
          </div>

          {/* Upload Box */}
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
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

          {/* Video Form */}
          {selectedFile && (
            <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
                Video Details
              </h3>
              <VideoForm
                formData={formData}
                onChange={setFormData}
                errors={formErrors}
              />
            </div>
          )}
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* SEO temporarily disabled. Restore the score panel here later. */}
          {/*
          {seoResult && (
            <SEOScore score={seoResult.score} suggestions={seoResult.suggestions} />
          )}
          */}

          {/* Actions */}
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
              Actions
            </h3>

            {/* SEO temporarily disabled. Restore the Check SEO Score action later. */}
            {/*
            <button
              onClick={handleCheckSEO}
              disabled={!selectedFile || (!formData.title && !formData.description)}
              className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 disabled:opacity-50"
            >
              <Target className="w-5 h-5" />
              Check SEO Score
            </button>
            */}

            <button
              onClick={() => setIsSchedulerOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm"
              className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 disabled:opacity-50"
            >
              <Calendar className="w-5 h-5" />
              Schedule Post
            </button>

            <button
              onClick={handleUpload}
              disabled={!isFormComplete || isProcessing}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-500/40 disabled:to-orange-600/40 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {uploadStatus === UPLOAD_STATUS.UPLOADING ? (
                <>
                  <LoadingSpinner size="sm" />
                  Uploading...
                </>
              ) : uploadStatus === UPLOAD_STATUS.COMPLETE ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {publishedUrl ? "Published!" : "Upload Complete!"}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Publish Now
                </>
              )}
            </button>

            {videoId && publishedUrl && (
              <a
                href={publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-center text-indigo-600 dark:text-cyan-400 hover:underline"
              >
                View published video on YouTube
              </a>
            )}

            <button
              onClick={handleReset}
              className="w-full px-6 py-3 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Tips */}
          <div className="p-6 dark:bg-indigo-500/10 dark:border dark:border-indigo-500/30 bg-indigo-50 border border-indigo-200 rounded-2xl">
            <h4 className="font-bold dark:text-indigo-400 text-indigo-900 mb-3">
              💡 Pro Tips
            </h4>
            <ul className="space-y-2 text-sm dark:text-indigo-300/80 text-indigo-700">
              {/* SEO tips temporarily disabled. Restore these tips with the analyzer. */}
              {/*
              <li>• Use 50-60 characters for optimal title length</li>
              <li>• Include keywords in your description</li>
              <li>• Add 10-15 relevant tags</li>
              <li>• Check SEO score before publishing</li>
              */}
              <li>• Schedule during peak engagement times</li>
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
