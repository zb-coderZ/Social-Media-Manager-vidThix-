import { useCallback, useEffect, useState } from "react";
import { Calendar, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import { api } from "../utils/api";

const formatScheduledTime = (value) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const Scheduled = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const loadScheduled = useCallback(async () => {
    setIsLoading(true);
    try {
      setScheduledPosts(await api.getScheduled());
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      showError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, showError]);

  useEffect(() => {
    loadScheduled();
  }, [loadScheduled]);

  const handleCancel = async (postId) => {
    setCancellingId(postId);
    try {
      await api.deleteScheduled(postId);
      await loadScheduled();
      success("Scheduled post cancelled.");
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      showError(requestError.message);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
          Scheduled Posts
        </h1>
        <p className="dark:text-gray-400 text-gray-600">
          Manage your upcoming video publications.
        </p>
      </div>

      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading scheduled posts..." />
        ) : scheduledPosts.length === 0 ? (
          <div className="py-12 text-center dark:text-gray-400 text-gray-600">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-60" />
            No scheduled posts yet.
          </div>
        ) : (
          <div className="space-y-3">
            {scheduledPosts.map((post) => {
              const postId = post.id || post._id;
              return (
                <div key={postId} className="flex items-center justify-between gap-4 p-4 dark:bg-navy-900/60 dark:border dark:border-navy-700 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="min-w-0">
                    <p className="font-semibold dark:text-white text-gray-900 truncate">
                      {post.platform} video
                    </p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">
                      {formatScheduledTime(post.scheduled_time)}
                    </p>
                    <p className="text-xs dark:text-gray-500 text-gray-500 capitalize">
                      {post.privacy_status} · {post.status}
                    </p>
                  </div>
                  {post.status === "pending" && (
                    <button
                      onClick={() => handleCancel(postId)}
                      disabled={cancellingId === postId}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4" />
                      {cancellingId === postId ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduled;