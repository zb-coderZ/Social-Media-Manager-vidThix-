import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import PlatformSelector from '../components/upload/PlatformSelector';
import UploadBox from '../components/upload/UploadBox';
import FilePreview from '../components/upload/FilePreview';
import VideoForm from '../components/upload/VideoForm';
import SEOScore from '../components/seo/SEOScore';
import Scheduler from '../components/scheduler/Scheduler';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { calculateSEOScore } from '../utils/seoCalculator';
import { sleep } from '../utils/helpers';
import { UPLOAD_STATUS } from '../utils/constants';

const Upload = () => {
  const navigate = useNavigate();
  const { addUpload, addScheduledPost } = useApp();
  const { success, error: showError, info } = useToast();

  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(UPLOAD_STATUS.IDLE);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [seoResult, setSeoResult] = useState(null);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus(UPLOAD_STATUS.SELECTING);
    info('File selected. Fill in the details to continue.');
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus(UPLOAD_STATUS.IDLE);
    setUploadProgress(0);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
    }

    if (!selectedFile) {
      showError('Please select a video file to upload');
      return false;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const simulateUpload = async () => {
    setUploadStatus(UPLOAD_STATUS.UPLOADING);

    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await sleep(300);
    }

    setUploadStatus(UPLOAD_STATUS.COMPLETE);
  };

  const handleUpload = async () => {
    if (!validateForm()) return;

    await simulateUpload();

    const upload = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      category: formData.category,
      platform: selectedPlatform,
      seoScore: seoResult?.score || 0,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      status: 'published'
    };

    addUpload(upload);
    success('Video uploaded successfully!');

    // Reset form
    setTimeout(() => {
      handleReset();
      navigate('/dashboard');
    }, 1500);
  };

  const handleSchedule = (scheduleData) => {
    if (!validateForm()) return;

    const post = {
      ...formData,
      ...scheduleData,
      platform: selectedPlatform,
      seoScore: seoResult?.score || 0,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      status: 'scheduled'
    };

    addScheduledPost(post);
    success('Post scheduled successfully!');

    setTimeout(() => {
      handleReset();
      navigate('/dashboard');
    }, 1500);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus(UPLOAD_STATUS.IDLE);
    setUploadProgress(0);
    setFormData({ title: '', description: '', tags: '', category: '' });
    setFormErrors({});
    setSeoResult(null);
  };

  const isFormComplete = selectedFile && formData.title && formData.description && formData.category;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
          Upload & Optimize Content
        </h1>
        <p className="dark:text-gray-400 text-gray-600">
          Upload your video, optimize for SEO, and schedule your post.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { icon: 'upload', label: 'Upload', status: selectedFile ? 'complete' : uploadStatus === UPLOAD_STATUS.SELECTING  ? 'active' : 'pending' },
          { icon: 'edit', label: 'Details', status: isFormComplete ? 'complete' : selectedFile ? 'active' : 'pending' },
          { icon: 'seo', label: 'SEO Check', status: seoResult ? 'complete' : isFormComplete ? 'active' : 'pending' },
          { icon: 'publish', label: 'Publish', status: uploadStatus === UPLOAD_STATUS.COMPLETE ? 'complete' : 'pending' }
        ].map((step, index) => (
          <div key={index} className={`p-4 rounded-xl border ${
            step.status === 'complete' ? 'dark:bg-emerald-500/20 dark:border-emerald-500/30 bg-emerald-50 border-emerald-200' :
            step.status === 'active' ? 'dark:bg-indigo-500/20 dark:border-indigo-500/30 bg-indigo-50 border-indigo-200' :
            'dark:bg-navy-800/60 dark:border-navy-700 bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              {step.status === 'complete' ? (
                <CheckCircle2 className="w-5 h-5 dark:text-emerald-400 text-emerald-600" />
              ) : (
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.status === 'active' ? 'dark:bg-indigo-600 dark:text-white bg-indigo-600 text-white' : 'dark:bg-navy-700 dark:text-gray-400 bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </span>
              )}
              <span className={`text-sm font-semibold ${
                step.status === 'complete' ? 'dark:text-emerald-400 text-emerald-700' :
                step.status === 'active' ? 'dark:text-indigo-400 text-indigo-700' :
                'dark:text-gray-400 text-gray-600'
              }`}>
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
            <PlatformSelector selected={selectedPlatform} onChange={setSelectedPlatform} />
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
              <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">Video Details</h3>
              <VideoForm
                formData={formData}
                onChange={setFormData}
                errors={formErrors}
              />
            </div>
          )}
        </div>

        {/* Right Column - SEO & Actions */}
        <div className="space-y-6">
          {/* SEO Score */}
          {seoResult && (
            <SEOScore score={seoResult.score} suggestions={seoResult.suggestions} />
          )}

          {/* Actions */}
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl space-y-3">
            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">Actions</h3>

            <button
              onClick={handleCheckSEO}
              disabled={!selectedFile || (!formData.title && !formData.description)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 dark:bg-cyan-600/80 dark:hover:bg-cyan-700/80 dark:disabled:bg-cyan-600/40 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <Target className="w-5 h-5" />
              Check SEO Score
            </button>

            <button
              onClick={() => setIsSchedulerOpen(true)}
              disabled={!isFormComplete}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800 dark:disabled:from-indigo-600/40 dark:disabled:to-indigo-700/40 from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-indigo-500 disabled:to-indigo-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <Calendar className="w-5 h-5" />
              Schedule Post
            </button>

            <button
              onClick={handleUpload}
              disabled={!isFormComplete || uploadStatus === UPLOAD_STATUS.UPLOADING}
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
                  Upload Complete!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Publish Now
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="w-full px-6 py-3 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Tips */}
          <div className="p-6 dark:bg-indigo-500/10 dark:border dark:border-indigo-500/30 bg-indigo-50 border border-indigo-200 rounded-2xl">
            <h4 className="font-bold dark:text-indigo-400 text-indigo-900 mb-3">💡 Pro Tips</h4>
            <ul className="space-y-2 text-sm dark:text-indigo-300/80 text-indigo-700">
              <li>• Use 50-60 characters for optimal title length</li>
              <li>• Include keywords in your description</li>
              <li>• Add 10-15 relevant tags</li>
              <li>• Check SEO score before publishing</li>
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
