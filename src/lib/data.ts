// data.ts

export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;
  authorName: string;
  authorIsLocalGuide: boolean;
  authorReviewCount?: number;
  authorPhotoCount?: number;
  rating: ReviewRating;
  relativeTimeDescription: string;
  title?: string;
  text: string;
  reactionSummary?: string;
}

export interface OperatingHours {
  [day: string]: { open: string; close: string } | null;
}

export class LuminousSmileReviews {
  static readonly businessName = "Sotshintshi Attorneys";
  static readonly address =
    "303 Eastwood St, Arcadia, Pretoria, 0001, South Africa";
  static readonly averageRating = 4.8;
  static readonly reviewCount = 24;

  static readonly operatingHours: OperatingHours = {
    Monday: { open: "08:00", close: "17:00" },
    Tuesday: { open: "08:00", close: "17:00" },
    Wednesday: { open: "08:00", close: "17:00" },
    Thursday: { open: "08:00", close: "17:00" },
    Friday: { open: "08:00", close: "17:00" },
    Saturday: null,
    Sunday: null
  };

  static readonly reviews: Review[] = [
    {
      id: "client-1",
      authorName: "Thabo Mokoena",
      authorIsLocalGuide: true,
      authorReviewCount: 18,
      rating: 5,
      relativeTimeDescription: "2 months ago",
      text:
        "Sotshintshi Attorneys handled my commercial dispute with exceptional professionalism. " +
        "Their strategic approach saved our company significant losses. Highly recommend for any " +
        "business litigation matter.",
    },
    {
      id: "client-2",
      authorName: "Sarah van der Merwe",
      authorIsLocalGuide: false,
      authorReviewCount: 7,
      rating: 5,
      relativeTimeDescription: "4 months ago",
      text:
        "I was going through a difficult divorce and needed someone I could trust. The team at " +
        "Sotshintshi Attorneys were compassionate yet assertive, ensuring the best outcome for " +
        "my children and me. Outstanding family law representation.",
    },
    {
      id: "client-3",
      authorName: "James Ndlovu",
      authorIsLocalGuide: true,
      authorReviewCount: 32,
      authorPhotoCount: 8,
      rating: 5,
      relativeTimeDescription: "3 months ago",
      text:
        "Impeccable attention to detail in our property transaction. Every clause was thoroughly " +
        "reviewed, and the conveyancing process was seamless. A firm that truly puts clients first.",
    },
    {
      id: "client-4",
      authorName: "Priya Naidoo",
      authorIsLocalGuide: true,
      authorReviewCount: 22,
      authorPhotoCount: 5,
      rating: 5,
      relativeTimeDescription: "6 months ago",
      text:
        "After a workplace injury, I didn't know where to turn. Sotshintshi Attorneys took my case " +
        "on and secured a settlement that exceeded my expectations. Professional, empathetic, and " +
        "relentless in pursuing justice.",
    },
    {
      id: "client-5",
      authorName: "David Botha",
      authorIsLocalGuide: false,
      authorReviewCount: 4,
      rating: 5,
      relativeTimeDescription: "8 months ago",
      text:
        "The corporate law team drafted our shareholder agreement with precision. They anticipated " +
        "potential issues we hadn't considered and protected our interests comprehensively. " +
        "Excellent firm for business legal needs.",
    },
    {
      id: "client-6",
      authorName: "Lerato Mahlangu",
      authorIsLocalGuide: true,
      authorReviewCount: 15,
      authorPhotoCount: 3,
      rating: 5,
      relativeTimeDescription: "1 year ago",
      text:
        "From initial consultation to final resolution, the experience with Sotshintshi Attorneys " +
        "was first-class. They kept me informed at every stage and their legal knowledge is " +
        "truly exceptional. Would not hesitate to use them again.",
    },
    {
      id: "client-7",
      authorName: "Michael Erasmus",
      authorIsLocalGuide: true,
      authorReviewCount: 28,
      authorPhotoCount: 12,
      rating: 5,
      relativeTimeDescription: "5 months ago",
      text:
        "Needed urgent assistance with a contractual dispute. The team responded immediately and " +
        "provided clear, strategic counsel. Their courtroom presence was commanding and they " +
        "secured a favourable judgment.",
    },
    {
      id: "client-8",
      authorName: "Nomsa Dlamini",
      authorIsLocalGuide: false,
      authorReviewCount: 9,
      rating: 4,
      relativeTimeDescription: "1 year ago",
      text:
        "Very professional firm with knowledgeable attorneys. They handled my estate planning " +
        "thoroughly. The only reason for 4 stars is that it took slightly longer than expected, " +
        "but the quality of work was excellent.",
    },
    {
      id: "client-9",
      authorName: "Andre Pretorius",
      authorIsLocalGuide: true,
      authorReviewCount: 41,
      authorPhotoCount: 20,
      rating: 5,
      relativeTimeDescription: "2 months ago",
      text:
        "Sotshintshi Attorneys represented our company in a complex regulatory compliance matter. " +
        "Their deep understanding of South African law and commercial acumen made all the difference. " +
        "A top-tier firm in Pretoria.",
    },
  ];
}
