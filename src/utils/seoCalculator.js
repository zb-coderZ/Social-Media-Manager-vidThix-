// vidThix - SEO Calculator
// Intelligent SEO scoring algorithm for content optimization

/**
 * Calculate SEO score based on title, description, and tags
 * @param {Object} data - Content data
 * @param {string} data.title - Video title
 * @param {string} data.description - Video description
 * @param {string} data.tags - Comma-separated tags
 * @returns {Object} - { score, suggestions, color }
 */
export function calculateSEOScore(data) {
  let score = 0;
  const suggestions = [];
  const { title = "", description = "", tags = "" } = data;

  // Title check (25 points)
  const titleLength = title.trim().length;
  if (titleLength >= 50 && titleLength <= 60) {
    score += 25;
  } else if (titleLength > 60 && titleLength <= 70) {
    score += 20;
    suggestions.push({
      type: "warning",
      message:
        "Title is slightly long. Aim for 50-60 characters for optimal display.",
      icon: "AlertCircle",
    });
  } else if (titleLength > 0 && titleLength < 50) {
    score += 15;
    suggestions.push({
      type: "error",
      message: "Title is too short. Expand to 50-60 characters for better SEO.",
      icon: "XCircle",
    });
  } else if (titleLength > 70) {
    score += 10;
    suggestions.push({
      type: "error",
      message:
        "Title is too long. It may get truncated. Keep it between 50-60 characters.",
      icon: "XCircle",
    });
  } else {
    suggestions.push({
      type: "error",
      message:
        "Add a compelling title (50-60 characters) to improve discoverability.",
      icon: "XCircle",
    });
  }

  // Description check (30 points)
  const descLength = description.trim().length;
  if (descLength >= 150 && descLength <= 300) {
    score += 30;
  } else if (descLength > 300 && descLength <= 500) {
    score += 25;
    suggestions.push({
      type: "info",
      message:
        "Description is good, but can be more concise. Aim for 150-300 characters.",
      icon: "Info",
    });
  } else if (descLength > 0 && descLength < 150) {
    score += 15;
    suggestions.push({
      type: "error",
      message:
        "Description is too brief. Expand to 150-300 characters with relevant keywords.",
      icon: "XCircle",
    });
  } else if (descLength > 500) {
    score += 20;
    suggestions.push({
      type: "warning",
      message:
        "Description is quite long. Consider highlighting key points in the first 300 characters.",
      icon: "AlertCircle",
    });
  } else {
    suggestions.push({
      type: "error",
      message:
        "Add a detailed description (150-300 characters) to help viewers understand your content.",
      icon: "XCircle",
    });
  }

  // Tags check (25 points)
  const tagArray = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
  const tagCount = tagArray.length;

  if (tagCount >= 10 && tagCount <= 15) {
    score += 25;
  } else if (tagCount >= 7 && tagCount < 10) {
    score += 18;
    suggestions.push({
      type: "warning",
      message: `Add ${10 - tagCount} more tags to reach the optimal range (10-15 tags).`,
      icon: "AlertCircle",
    });
  } else if (tagCount > 15 && tagCount <= 20) {
    score += 20;
    suggestions.push({
      type: "info",
      message:
        "You have many tags. Focus on the most relevant 10-15 tags for best results.",
      icon: "Info",
    });
  } else if (tagCount > 0 && tagCount < 7) {
    score += 10;
    suggestions.push({
      type: "error",
      message: `Add at least ${10 - tagCount} more tags. Optimal range is 10-15 relevant tags.`,
      icon: "XCircle",
    });
  } else if (tagCount > 20) {
    score += 15;
    suggestions.push({
      type: "warning",
      message:
        "Too many tags can dilute your content focus. Stick to 10-15 most relevant tags.",
      icon: "AlertCircle",
    });
  } else {
    suggestions.push({
      type: "error",
      message:
        "Add relevant tags (10-15) to help viewers discover your content.",
      icon: "XCircle",
    });
  }

  // Keyword density check (20 points)
  // Check if title keywords appear in description
  if (title.trim().length > 0 && description.trim().length > 0) {
    const titleWords = title
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 && !isCommonWord(word));

    const descLower = description.toLowerCase();
    const keywordsInDesc = titleWords.filter((word) =>
      descLower.includes(word),
    );
    const keywordDensity =
      titleWords.length > 0 ? keywordsInDesc.length / titleWords.length : 0;

    if (keywordDensity >= 0.5) {
      score += 20;
    } else if (keywordDensity >= 0.3) {
      score += 15;
      suggestions.push({
        type: "info",
        message:
          "Include more keywords from your title in the description for better SEO.",
        icon: "Info",
      });
    } else if (keywordDensity > 0) {
      score += 10;
      suggestions.push({
        type: "warning",
        message:
          "Low keyword consistency. Use more title keywords in your description.",
        icon: "AlertCircle",
      });
    } else {
      suggestions.push({
        type: "error",
        message:
          "Include important keywords from your title in the description.",
        icon: "XCircle",
      });
    }
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // If score is perfect, add success message
  if (score === 100) {
    suggestions.unshift({
      type: "success",
      message:
        "Perfect! Your content is fully optimized for maximum visibility.",
      icon: "CheckCircle",
    });
  } else if (score >= 80) {
    suggestions.unshift({
      type: "success",
      message:
        "Great job! Your content is well-optimized. Minor improvements can make it perfect.",
      icon: "CheckCircle",
    });
  }

  return {
    score,
    suggestions,
    color: getScoreColor(score),
  };
}

/**
 * Get color based on score
 * @param {number} score - SEO score (0-100)
 * @returns {string} - Hex color code
 */
function getScoreColor(score) {
  if (score >= 70) return "#22C55E"; // green
  if (score >= 40) return "#F59E0B"; // yellow/amber
  return "#EF4444"; // red
}

/**
 * Check if word is a common stop word
 * @param {string} word - Word to check
 * @returns {boolean}
 */
function isCommonWord(word) {
  const commonWords = new Set([
    "the",
    "this",
    "that",
    "with",
    "from",
    "have",
    "will",
    "your",
    "their",
    "what",
    "when",
    "where",
    "which",
    "about",
    "how",
    "can",
    "all",
    "some",
    "more",
    "than",
    "them",
    "into",
    "only",
    "other",
    "such",
    "just",
    "like",
    "make",
    "know",
  ]);
  return commonWords.has(word.toLowerCase());
}

/**
 * Get human-readable score category
 * @param {number} score - SEO score (0-100)
 * @returns {string} - Category name
 */
export function getScoreCategory(score) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Improvement";
}

/**
 * Calculate estimated reach based on SEO score
 * @param {number} score - SEO score (0-100)
 * @returns {string} - Estimated reach
 */
export function estimateReach(score) {
  if (score >= 90) return "Very High - Maximum visibility";
  if (score >= 70) return "High - Strong discoverability";
  if (score >= 40) return "Medium - Moderate visibility";
  return "Low - Limited reach";
}
