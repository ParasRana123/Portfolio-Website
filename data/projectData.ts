export interface ProjectCard {
    title: string;
    shortTitle?: string;
    category?: string;
    description: string;
    video: string;
    website: string | null;
    code: string;
    long_desc: string;
    technologies: string;
    key_features: string;
    youtube?: string;
    linkedin?: string;
}

export const PROJECTS_DATA: ProjectCard[] = [
    {
        title: "Collaborative Music Platform",
        shortTitle: "MUSOR",
        category: "FULL-STACK / WEBSOCKETS",
        description: "Real-time collaborative music listening platform with synchronized playback, group chat, shared queues, and playlist recommendations. Discover friends' playlists, save favorite songs, and enjoy seamless multi-user listening sessions.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787560313/musor_record.mp4",
        website: "https://musor-ten.vercel.app/",
        code: "https://github.com/ParasRana123/musor",
        long_desc: "Musor is a real-time collaborative music listening platform that allows friends to join shared rooms and listen to music together with synchronized playback. It features live group chat, a shared song queue, and playlist-based music discovery for a seamless social listening experience. The platform supports 10–15 concurrent users with low-latency real-time updates and minimal playback desynchronization. Built using React, Express, PostgreSQL, Clerk, and WebSockets.",
        technologies: "React.js , Node.js , Express.js , WebSockets , PostgreSQL , TailwindCSS , RESTful APIs , JWT Authentication",
        key_features: "- Join a room with friends and listen to the same song at the same time, in sync, across all devices.\n- Add songs to a collective queue that everyone in the room can see and contribute to.\n- Chat with everyone in the room in real time while listening together.\n- Get playlist suggestions based on what the group is listening to and enjoying.\n- Supports 10–15 concurrent users per listening session without lag or desync.\n- Browse your friends' saved songs and playlists directly from their profiles.\n- Clerk-based authentication and secure session management to keep accounts and rooms safe.\n- Low-latency real-time updates for song sync, chat messages, and queue changes.",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
    {
        title: "Realtime Peer Chatapp",
        shortTitle: "OMEGLE CLONE",
        category: "WEBRTC / REAL-TIME",
        description: "An anonymous peer-to-peer video & audio chat application that mimics Omegle’s core functionality. Built using WebSockets for signaling and WebRTC for real-time media communication.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787673475/omegle_record.mp4",
        website: "https://omegle-beta.vercel.app/",
        code: "https://github.com/ParasRana123/omegle",
        long_desc: "An anonymous peer-to-peer video and audio chat platform that randomly connects users for real-time conversations. Built with WebRTC for direct media streaming and Socket.IO for signaling, matchmaking, live messaging, and connection management.",
        technologies: "React.js , Node.js , Express.js , Socket.IO , WebRTC , Queue Management",
        key_features: "- Peer-to-peer communication using WebRTC for low-latency media streaming.\n- Dynamically pairs users into 1-to-1 rooms through an in-memory matchmaking queue.\n- Real-time messaging with typing indicators, timestamps, and connection notifications.\n- Handles SDP offers, answers, ICE candidates, chat events, and peer synchronization.\n- Instantly disconnects the current peer and requeues the user for a new match.\n- Supports camera/microphone preview, mute/unmute, and video toggle during calls.",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
    {
        title: "Celebrity Face Lookalike",
        shortTitle: "CELEB LOOKALIKE",
        category: "COMPUTER VISION / DEEP LEARNING",
        description: "A web application that detects faces from user-uploaded images and matches them with celebrity faces using deep learning techniques.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787560254/celeb_match_record.mp4",
        website: "https://celeb-face-sable.vercel.app/",
        code: "https://github.com/ParasRana123/CelebFacelookalike",
        long_desc: "A deep learning-powered web application that detects faces from user-uploaded images and matches them with visually similar celebrity faces. The system uses MTCNN for accurate face detection and alignment, followed by VGGFace with a ResNet50 backbone for deep facial feature extraction. Cosine similarity is used to compare facial embeddings and generate similarity scores for potential celebrity matches. Built with a responsive React frontend and Flask-based backend for an interactive end-to-end experience.",
        technologies: "React.js , Flask , TensorFlow , Keras-VGGFace , MTCNN",
        key_features: "- Matches uploaded faces against a database of celebrity facial embeddings using deep learning.\n- Uses MTCNN for accurate face detection, alignment, and handling of varying face positions.\n- Extracts high-level facial representations using the ResNet50-based VGGFace model.\n- Calculates cosine similarity between facial embeddings to rank the closest celebrity matches.\n- Processes uploaded images using OpenCV and Pillow for efficient face preprocessing.\n- Provides a smooth React-based interface for image uploads, match results, and similarity visualization.",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
    {
        title: "Defence Portal (SIH)",
        shortTitle: "NET-GEN-X",
        category: "CYBERSECURITY / DEFENCE",
        description: "This was build as a part of Smart India Hackathon where we tackled a defence based problem statement and made a Defence Portal for the same.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787560336/sih_comp_record.mp4",
        website: "https://net-gen-x.vercel.app/",
        code: "https://github.com/ParasRana123/sih_defence",
        long_desc: "A secure AI-powered cyber incident reporting and threat analysis platform designed for defence personnel, families, and veterans to report suspicious digital evidence. The system combines AI/ML-based threat detection, blockchain-backed audit trails, encrypted storage, and automated mitigation playbooks to classify incidents and enable faster response by security teams.",
        technologies: "React.js , Node.js , Express.js , scikit-learn , TensorFlow , PostgreSQL , Blockchain , TailwindCSS , RESTful APIs , JWT Authentication",
        key_features: "- Detects phishing, malware, deepfakes, espionage/honeytraps, and OPSEC risks.\n- Stores complaint and evidence hashes on a private blockchain for tamper-proof logging.\n- Classifies incidents as Critical, High, Medium, or Low for response prioritization.\n- Sends threat notifications with actionable mitigation steps and security guidance.\n- Provides role-based dashboards for monitoring, investigating, and managing reported incidents.\n- Encrypts submitted files and data with secure access controls and audit trails.",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
    {
        title: "Movie Recommendation Engine",
        shortTitle: "FLIXRECOMMEND",
        category: "MACHINE LEARNING / NLP",
        description: "This system provides personalized movie recommendations, with smart search that corrects typos and suggests matches. It helps you explore top-rated films by genre and dive into detailed cast and crew information for any movie.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787560286/movie_recom_record.mp4",
        website: "https://movierecommender-navy.vercel.app/",
        code: "https://github.com/ParasRana123/Movie_Recommender",
        long_desc: "A machine learning-powered movie recommendation platform that analyzes movie metadata and user reviews to deliver personalized content recommendations. Uses cosine similarity for content-based recommendations and NLP sentiment analysis to classify audience reviews with confidence scores. Features real-time movie search, trailers, streaming links, genre-based discovery, and a persistent watchlist for an interactive movie discovery experience.",
        technologies: "React.js , PostgreSQL , Python , Flask , scikit-learn , TF-IDF , Cosine Similarity , TMDb API , YouTube API , TailwindCSS",
        key_features: "- ML-powered cosine similarity engine generates 10 personalized movie recommendations.\n- Classifies audience reviews as Positive or Critical with confidence scores.\n- Global autocomplete instantly suggests matching movie titles with highlighted search terms.\n- Provides YouTube trailers and direct links to available streaming platforms.\n- Supports 11 movie genres through a reusable and optimized React component.\n- Allows users to save and persist favorite movies across sessions using localStorage.",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
    {
        title: "Virtual Voice Assistant (NOVA)",
        shortTitle: "NOVA",
        category: "AI / VOICE ASSISTANT",
        description: "NOVA is your all-in-one digital sidekick that takes control, handles your hustle, and gets things done your way.",
        video: "https://res.cloudinary.com/d3ukbssg/video/upload/v1787560321/nova_record.mp4",
        website: "https://nova-inky-iota.vercel.app/",
        code: "https://github.com/ParasRana123/NOVA",
        long_desc: "An AI-powered personal assistant with voice control, app management, system controls, Google Calendar integration, image analysis, real-time translation, chatbot, search capabilities, music control, and productivity automation. Experience hands-free digital interaction with natural language understanding and personalized assistance.",
        technologies: "Python, Google API, Google Calendar API, SpeechRecognition, pyttsx3, pywhatkit, pyjokes, pyautogui, webbrowser, datetime, os",
        key_features: "- Voice-controlled interface with natural language processing\n- Smart calendar management with Google Calendar integration\n- Real-time translation between multiple languages\n- Image analysis and object recognition\n - System controls for automation and productivity\n- Music and media playback control\n- Web search and information retrieval\n- Personalized responses using machine learning",
        linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    },
];