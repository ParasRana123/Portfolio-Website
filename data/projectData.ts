export interface projectCard {
    title: string;
    description: string;
    video: string;
    website: string | null;
    code: string
}

export const PROJECTS_DATA: projectCard[] = [
    {
        title: "Collaborative Music Platform",
        description: "Real-time collaborative music listening platform with synchronized playback, group chat, shared queues, and playlist recommendations. Discover friends' playlists, save favorite songs, and enjoy seamless multi-user listening sessions.",
        video: "/tools/videos/musor_record.mp4",
        website: "https://musor-ten.vercel.app/",
        code: "https://github.com/ParasRana123/musor"
    },
    {
        title: "Movie Recommendation Engine",
        description: "This system provides personalized movie recommendations, with smart search that corrects typos and suggests matches. It helps you explore top-rated films by genre and dive into detailed cast and crew information for any movie.",
        video: "/tools/videos/movie_recom_record.mp4",
        website: "",
        code: "https://github.com/ParasRana123/Movie_Recommender"
    },
    {
        title: "Virtual Voice Assistant (NOVA)",
        description: "NOVA is your all-in-one digital sidekick that takes control, handles your hustle, and gets things done your way.",
        video: "/tools/videos/nova_record.mp4",
        website: "",
        code: "https://github.com/ParasRana123/NOVA",
    },
    {
        title: "Celebrity Face Lookalike",
        description: "A web application that detects faces from user-uploaded images and matches them with celebrity faces using deep learning techniques.",
        video: "/tools/videos/celeb.mp4",
        website: "",
        code: "https://github.com/ParasRana123/CelebFacelookalike",
    },
    {
        title: "Defence Portal (SIH)",
        description: "This was build as a part of Smart India Hackathon where we tackled a defence based problem statement and made a Defence Portal for the same.",
        video: "/tools/videos/sih_comp_record.mp4",
        website: "https://net-gen-x.vercel.app/",
        code: "https://github.com/ParasRana123/sih_defence",
    },
    {
        title: "Realtime Peer Chatapp",
        description: "An anonymous peer-to-peer video & audio chat application that mimics Omegle’s core functionality. Built using WebSockets for signaling and WebRTC for real-time media communication.",
        video: "",
        website: "",
        code: "https://github.com/ParasRana123/omegle"
    }
]