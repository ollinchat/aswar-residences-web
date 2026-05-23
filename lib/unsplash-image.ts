/** Stable Unsplash URL builder (`photo-{id}` full slug, ixlib crop). */
export function unsplashImage(
  photoId: string,
  width = 1600,
  quality = 75,
): string {
  const id = photoId.startsWith("photo-") ? photoId : `photo-${photoId}`;
  const params = new URLSearchParams({
    ixlib: "rb-4.0.3",
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality),
  });
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}
