export interface RatingPlatform {
  id: number;
  platform: string;
  badge: string;
  rating: string;
  subtitle: string;
  profileUrl: string;
  accent: string;       // hex color used for number, badge, and bar
  progress: number;     // 0-100, fill % of the bottom bar
}

export const RATINGS_DATA: RatingPlatform[] = [
  {
    id: 1,
    platform: "LEETCODE",
    badge: "Guardian",
    rating: "2210",
    subtitle: "Global #8510 · 1200+ solved",
    profileUrl: "https://leetcode.com/u/paras579/",
    accent: "#ef4444",
    progress: 62,
  },
  {
    id: 2,
    platform: "CODECHEF",
    badge: "4 Star",
    rating: "1811",
    subtitle: "AIR #3586",
    profileUrl: "https://www.codechef.com/users/paras579",
    accent: "#f5a623",
    progress: 36,
  },
    {
    id: 3,
    platform: "CODEFORCES",
    badge: "Pupil",
    rating: "1250",
    subtitle: "100+ solved",
    profileUrl: "https://codeforces.com/profile/Par08",
    accent: "#a855f7",
    progress: 14,
  },
];

export const TOTAL_PROBLEMS_SOLVED = "1500+";