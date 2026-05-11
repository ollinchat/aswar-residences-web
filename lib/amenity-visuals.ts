import type { AmenityListKey } from "@/lib/amenity-hotspots";

/** Remote Unsplash image (see `next.config.ts` images.remotePatterns). */
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

/**
 * Background media per amenity — optimized dimensions, mix of stills + one
 * lightweight HD loop (pools). Replace with `/public/amenities/*` assets when
 * client-provided footage is available.
 */
export const AMENITY_VISUALS: Record<AmenityListKey, AmenityVisualMedia> = {
  amenityFurnishedUnits: {
    kind: "image",
    src: unsplashPhoto("1618221195710-dd6b41faaea6"),
    altEn: "Bright furnished living room with designer seating",
    altAr: "غرفة معيشة مفروشة فاخرة ومضيئة",
  },
  amenityAdultKidsPools: {
    kind: "video",
    src: "https://videos.pexels.com/video-files/15769083/15769083-hd_1280_720_30fps.mp4",
    poster: unsplashPhoto("1520250497591-112f2f40a3f4"),
    altEn: "Sunlit resort swimming pool with loungers",
    altAr: "مسبح منتجع مشمس مع كراسي استلقاء",
  },
  amenityGymJogTrack: {
    kind: "image",
    src: unsplashPhoto("1571902943202-507ec2618e8f"),
    altEn: "Modern fitness floor with strength equipment",
    altAr: "صالة رياضية عصرية بأجهزة القوة",
  },
  amenityYogaMultipurposeDecks: {
    kind: "image",
    src: unsplashPhoto("1544367567-0f2fcb009e0b"),
    altEn: "Outdoor yoga deck at sunrise",
    altAr: "سطح يوجا في الهواء الطلق عند شروق الشمس",
  },
  amenityBbqFirePit: {
    kind: "image",
    src: unsplashPhoto("1478131143081-80f7f84ca84d"),
    altEn: "Evening gathering around a fire pit",
    altAr: "لقاء مسائي حول نار خارجية",
  },
  amenityKidsPlayground: {
    kind: "image",
    src: unsplashPhoto("1558618666-fcd25c85cd64"),
    altEn: "Colourful outdoor children’s playground",
    altAr: "ملعب أطفال ملون في الهواء الطلق",
  },
  amenityReadingBeanBags: {
    kind: "image",
    src: unsplashPhoto("1507842217343-583bb7270b66"),
    altEn: "Quiet library shelves with reading nook",
    altAr: "رفوف مكتبة هادئة مع زاوية للقراءة",
  },
  amenityCabanasWetDecks: {
    kind: "image",
    src: unsplashPhoto("1602002418082-a4443e081dd1"),
    altEn: "Poolside cabanas and wooden deck",
    altAr: "كبائن بجانب المسبح وسطح خشبي",
  },
  amenityCourtyardWaterGarden: {
    kind: "image",
    src: unsplashPhoto("1416879595882-3373a0480b5b"),
    altEn: "Lush courtyard garden with layered greenery",
    altAr: "حديقة فناء داخلية خضراء غنية",
  },
  amenityMultipurposeHallLawn: {
    kind: "image",
    src: unsplashPhoto("1511578314322-379afb476865"),
    altEn: "Open event lawn and banquet setup",
    altAr: "مساحة عشبية للفعاليات مع تجهيز ولائم",
  },
  amenityRooftopOpenArea: {
    kind: "image",
    src: unsplashPhoto("1480714378408-67cf0d13bc1b"),
    altEn: "City skyline from a rooftop terrace",
    altAr: "أفق مدينة من شرفة سطح",
  },
};
