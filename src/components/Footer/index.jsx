const sections = [
  {
    title: "Platform",
    links: [
      { name: "About", href: "/about" },
      { name: "Therapists", href: "/therapists" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Quizzes", href: "/quizzes" },
      { name: "Blogs", href: "/blogs" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="w-full border-t-2 py-12 px-12 bg-[#F6F4F0]">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <span className="mb-4 text-4xl text-black font-semibold">
                Harmony Hub
              </span>
              <p className="font-bold">Counseling made easy.</p>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© 2025 Harmony Hub. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <a href="#"> Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
