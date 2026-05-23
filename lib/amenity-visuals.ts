import type { AmenityListKey } from "@/lib/amenity-hotspots";
import { unsplashImage } from "@/lib/unsplash-image";

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
    poster: unsplashImage("photo-1600585154340-be6161a56a0c", 1400, 75),
    altEn: "Infinity pool with cabanas, marble deck, and soft daylight",
    altAr: "مسبح لا متناهٍ مع كبائن ورخام وإضاءة نهارية ناعمة",
  },
  amenityRooftopLounge: {
    kind: "image",
    src: unsplashImage("photo-1600607687644-c7171b42498f", 1400, 75),
    altEn: "Rooftop lounge with glass façade and Dubai skyline at golden hour",
    altAr: "صالة سطح بواجهة زجاجية وأفق دبي عند الغروب",
  },
  amenityYogaDeck: {
    kind: "image",
    src: unsplashImage("photo-1600210492486-724fe5c67fb0", 1400, 75),
    altEn: "Wellness deck with natural light and calm minimalist interiors",
    altAr: "سطح عافية بإضاءة طبيعية وتصميم هادئ",
  },
  amenityGym: {
    kind: "image",
    src: unsplashImage("photo-1571902943202-507ec2618e8f", 1400, 75),
    altEn: "Boutique fitness studio with premium equipment and architectural lighting",
    altAr: "صالة لياقة بوتيكية بمعدات فاخرة وإضاءة معمارية",
  },
  amenityJoggingTrack: {
    kind: "image",
    src: unsplashImage("photo-1600585154084-4e5fe7c39198", 1400, 75),
    altEn: "Landscaped jogging path with glass tower backdrop at dawn",
    altAr: "مسار جري منسّق مع أبراج زجاجية عند الفجر",
  },
};
