export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  specialist: string[];
  image: string;
  description: string;
  parentId: string | null;
  department: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "ceo",
    name: "Vishal Jaiswal",
    designation: "Chief Executive Officer",
    specialist: [
      "Business Strategy",
      "Technology Leadership",
      "MERN Stack",
      "Web Development",
    ],
    image: "https://ahaanmedia.com/asc/teams/Vishal.png",
    description:
      "As the Chief Executive Officer, Sugam leads the overall vision, strategy and growth of the organization. With strong expertise in modern web technologies and business development, he focuses on building innovative digital solutions and creating long-term value for clients.",
    parentId: null,
    department: "Leadership",
  },

  {
    id: "hr-manager",
    name: "Salomi Vanancio",
    designation: "HR Manager",
    specialist: [
      "Recruitment",
      "Employee Relations",
      "Human Resources",
      "Team Management",
    ],
    image: "https://ahaanmedia.com/asc/teams/Salomi.jpg",
    description:
      "Responsible for managing recruitment, employee engagement, workplace culture and human resource operations throughout the organization.",
    parentId: "ceo",
    department: "Human Resources",
  },

  {
    id: "project-manager",
    name: "Soumya Bhattacharjee",
    designation: "Project Manager",
    specialist: [
      "Project Management",
      "Operations",
      "Team Coordination",
      "Client Management",
    ],
    image: "https://ahaanmedia.com/asc/teams/Soumya.jpg",
    description:
      "Oversees daily business operations and ensures smooth coordination between teams, projects and clients.",
    parentId: "ceo",
    department: "Management",
  },

  {
    id: "data-analyst",
    name: "MD. Rahman",
    designation: "Data Analyst",
    specialist: [
        "Data Analysis",
        "Data Visualization",
        "Machine Learning",
    ],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    description:
      "Responsible for managing recruitment, employee engagement, workplace culture and human resource operations throughout the organization.",
    parentId: "ceo",
    department: "Data Science",
  },

  {
    id: "sales-lead",
    name: "Surojeet Chatterjee",
    designation: "Sales Team Lead",
    specialist: [
      "Sales Strategy",
      "Business Development",
      "Client Communication",
    ],
    image: "https://ahaanmedia.com/asc/teams/Surojit.png",
    description:
      "Leads the sales department and develops strategies for business growth and client acquisition.",
    parentId: "ceo",
    department: "Sales",
  },

  {
    id: "content-writer",
    name: "Tania Ghosh",
    designation: "Content Writer",
    specialist: [
      "Content Strategy",
      "Copywriting",
      "SEO",
      "Digital Marketing",
    ],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    description:
      "Creates compelling and engaging content for various digital platforms and marketing materials.",
    parentId: "project-manager",
    department: "Content Writing",
  },

  {
    id: "senior-associate",
    name: "Soumitra Maity",
    designation: "Senior Associate",
    specialist: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
    ],
    image: "https://ahaanmedia.com/asc/teams/Soumitra.jpg",
    description:
      "Specializes in building modern, responsive and high-performance user interfaces using the latest frontend technologies.",
    parentId: "project-manager",
    department: "Development",
  },

  {
    id: "full-stack-developer",
    name: "Sugam Karmakar",
    designation: "Full-Stack Developer",
    specialist: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
    ],
    image: "https://ahaanmedia.com/asc/teams/Sugam.jpg",
    description:
      "Develops secure and scalable backend systems, APIs and database architectures.",
    parentId: "senior-associate",
    department: "Development",
  },

  {
    id: "jr-web-developer",
    name: "Subhadeep Dey",
    designation: "Junior Web Developer",
    specialist: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
    ],
    image: "https://ahaanmedia.com/asc/teams/Subhadeep.jpg",
    description:
      "Develops secure and scalable backend systems, APIs and database architectures.",
    parentId: "senior-associate",
    department: "Development",
  },

    {
    id: "jr-web-developer",
    name: "Soumi Kanungo",
    designation: "Junior Web Developer",
    specialist: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
    ],
    image: "https://ahaanmedia.com/asc/teams/Soumi.jpg",
    description:
      "Develops secure and scalable backend systems, APIs and database architectures.",
    parentId: "senior-associate",
    department: "Development",
  },

  {
    id: "senior-ui-ux-designer",
    name: "Surajit Bera",
    designation: "Senior UI/UX Designer",
    specialist: [
      "UI Design",
      "UX Research",
      "Figma",
      "Design Systems",
    ],
    image: "https://ahaanmedia.com/asc/teams/Surajit.jpg",
    description:
      "Creates visually appealing and user-friendly digital experiences with a strong focus on usability and design systems.",
    parentId: "project-manager",
    department: "Design",
  },

    {
    id: "junior-ui-ux-designer",
    name: "Rimpa Dutta",
    designation: "Junior UI/UX Designer",
    specialist: [
      "UI Design",
      "UX Research",
      "Figma",
      "Design Systems",
    ],
    image: "https://ahaanmedia.com/asc/teams/Rimpa.jpg",
    description:
      "Creates visually appealing and user-friendly digital experiences with a strong focus on usability and design systems.",
    parentId: "senior-ui-ux-designer",
    department: "Design",
  },

  {
    id: "sales-executive",
    name: "Abhishek Mondal",
    designation: "Sales Executive",
    specialist: [
      "Lead Generation",
      "Client Communication",
      "Sales",
    ],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    description:
      "Works closely with potential clients and helps the organization build strong business relationships.",
    parentId: "sales-lead",
    department: "Sales",
  },

  {
    id: "sales-executive",
    name: "Soumydeep Roy",
    designation: "Sales Executive",
    specialist: [
      "Lead Generation",
      "Client Communication",
      "Sales",
    ],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    description:
      "Works closely with potential clients and helps the organization build strong business relationships.",
    parentId: "sales-lead",
    department: "Sales",
  },
];