import type { AmenityListKey } from "@/lib/amenity-hotspots";

/** Ultra-HD Unsplash crops — cinematic light, premium materials. */
function unsplashPhoto(id: string, width = 1400): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "88",
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
    poster: unsplashPhoto("1600585154340-be6161a56a0c"),
    altEn: "Infinity pool with cabanas, marble deck, and soft daylight",
    altAr: "مسبح لا متناهٍ مع كبائن ورخام وإضاءة نهارية ناعمة",
  },
  amenityRooftopLounge: {
    kind: "image",
    src: unsplashPhoto("1600607687644-c7171b42498f"),
    altEn: "Rooftop lounge with glass façade and Dubai skyline at golden hour",
    altAr: "صالة سطح بواجهة زجاجية وأفق دبي عند الغروب",
  },
  amenityYogaDeck: {
    kind: "image",
    src: unsplashPhoto("1600210492486-724fe5c67fb0"),
    altEn: "Wellness deck with natural light and calm minimalist interiors",
    altAr: "سطح عافية بإضاءة طبيعية وتصميم هادئ",
  },
  amenityGym: {
    kind: "image",
    src: unsplashPhoto("1534438327276-c14c5b6e3a5e"),
    altEn: "Boutique fitness studio with premium equipment and architectural lighting",
    altAr: "صالة لياقة بوتيكية بمعدات فاخرة وإضاءة معمارية",
  },
  amenityJoggingTrack: {
    kind: "image",
    src: unsplashPhoto("1600585154084-4e5fe7c39198"),
    altEn: "Landscaped jogging path with glass tower backdrop at dawn",
    altAr: "مسار جري منسّق مع أبراج زجاجية عند الفجر",
  },
};
