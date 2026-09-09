import { useEffect } from "react";

function upsertNamedMeta(name, content) {
  if (!content) return;

  let meta = document.head.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function upsertPropertyMeta(property, content) {
  if (!content) return;

  let meta = document.head.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function upsertCanonical(href) {
  if (!href) return;

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export function usePageMeta({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
      upsertPropertyMeta("og:title", title);
    }

    upsertNamedMeta("description", description);
    upsertNamedMeta("keywords", keywords);
    upsertCanonical(canonical);

    upsertPropertyMeta("og:description", description);
    upsertPropertyMeta("og:type", ogType);
    upsertPropertyMeta("og:url", canonical);
    upsertPropertyMeta("og:image", ogImage);
  }, [title, description, keywords, canonical, ogImage, ogType]);
}
