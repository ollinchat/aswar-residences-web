import type { AmenityListKey } from "@/lib/amenity-hotspots";

function unsplashPhoto(id: string, width = 880): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "78",
  });
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

export type AmenityVisualMedia =
  | {
      kind: "image";
      src: string;
      altEn: string;
      altAr: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      altEn: string;
      altAr: string;
    };

export const AMENITY_VISUALS: Record<AmenityListKey, AmenityVisualMedia> = {
  amenityPoolCabanas: {
    kind: "video",
    src: "https://videos.pexels.com/video-files/15769083/15769083-hd_1280_720_30fps.mp4",
    poster: unsplashPhoto("1602002418082-a4443e081dd1"),
    altEn: "Resort pool with cabanas and wet deck",
    altAr: "مسبح مع كبائن ومنطقة استرخاء",
  },
  amenityRooftopLounge: {
    kind: "image",
    src: unsplashPhoto("1480714378408-67cf0d13bc1b"),
    altEn: "Rooftop lounge overlooking the Dubai skyline",
    altAr: "صالة سطح بإطلالة على أفق دبي",
  },
  amenityYogaDeck: {
    kind: "image",
    src: unsplashPhoto("1544367567-0f2fcb009e0b"),
    altEn: "Open-air yoga deck at sunrise",
    altAr: "سطح يوجا في الهواء الطلق",
  },
  amenityGym: {
    kind: "image",
    src: unsplashPhoto("1571902943202-507ec2618e8f"),
    altEn: "Private fitness studio with modern equipment",
    altAr: "صالة لياقة خاصة بمعدات عصرية",
  },
  amenityJoggingTrack: {
    kind: "image",
    src: unsplashPhoto("1476480862126-209bfaa8ecc8"),
    altEn: "Outdoor jogging track with landscaped edges",
    altAr: "مسار جري خارجي بمحيط منسّق",
  },
};
