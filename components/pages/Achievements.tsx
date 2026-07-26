export default function Achievements() {
  const achievements = [
    {
      number: "01",
      title: "Competitive Programming",
      description:
        "Ranked 125th globally among 41,000+ participants in CodeChef Starters 227 and achieved Global Rank 283 and All India Rank 67 among 35,000+ participants in LeetCode Biweekly Contest 180.",
      highlight: "Top Global Ranks",
    },
    {
      number: "02",
      title: "Coding Profiles",
      description:
        "Reached Guardian tier on LeetCode with a 2100+ rating and 3-Star on CodeChef with a 1700+ rating. Earned 3-Star C++ and 4-Star DSA badges on HackerRank, with 1200+ problems solved across competitive programming platforms.",
      highlight: "1200+ Problems Solved",
    },
    {
      number: "03",
      title: "National Hackathon Finalist",
      description:
        "Selected as a National Hackathon Finalist at a competition hosted by IIT Guwahati, competing against teams from top engineering institutions across India.",
      highlight: "IIT Guwahati",
    },
  ];

  return (
    <section className="w-full px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-400">
            Milestones
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Achievements
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-400">
            A few milestones from my journey in competitive programming,
            problem solving, and hackathons.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.number}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Background Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />

              {/* Number */}
              <div className="relative mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-widest text-gray-500">
                  {achievement.number}
                </span>

                <div className="h-px w-16 bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-purple-300">
                  {achievement.title}
                </h3>

                <div className="mt-4 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                  {achievement.highlight}
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-400">
                  {achievement.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}