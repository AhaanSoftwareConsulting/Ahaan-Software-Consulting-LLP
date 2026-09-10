export interface TeamMember {
  id: string;

  uniqueId: string;

  name: string;

  designation: string;

  specialist: string[];

  image: string;

  fullImage?: string;

  description: string;

  parentId: string | null;

  department: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "founder",

    uniqueId: "vishal-jaiswal",

    name: "Vishal Jaiswal",

    designation: "MD & Founder",

    specialist: [
      "Business Strategy",

      "Technology Leadership",

      "MERN Stack",

      "Web Development",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Vishal.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/VJ.png",

    description:
      "Vishal Jaiswal, Managing Director and Founder of Ahaan Software Consulting, is a visionary leader with a strong passion for technology and digital innovation. He focuses on helping businesses leverage innovative and scalable technology solutions to achieve their goals. Under his leadership, Ahaan Software Consulting continues to serve clients across diverse industries and markets. He believes in fostering innovation, collaboration, and continuous learning within the organization. His commitment to quality, client satisfaction, and long-term growth continues to drive the company's vision and success.",

    parentId: null,

    department: "Leadership",
  },

  {
    id: "director",

    uniqueId: "neha-jaiswal",

    name: "Neha Jaiswal",

    designation: "Director",

    specialist: [
      "Business Strategy",

      "Technology Leadership",

      "MERN Stack",

      "Web Development",
    ],

    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    fullImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    description:
      "Vishal Jaiswal, Managing Director and Founder of Ahaan Software Consulting, is a visionary leader with a strong passion for technology and digital innovation. He focuses on helping businesses leverage innovative and scalable technology solutions to achieve their goals. Under his leadership, Ahaan Software Consulting continues to serve clients across diverse industries and markets. He believes in fostering innovation, collaboration, and continuous learning within the organization. His commitment to quality, client satisfaction, and long-term growth continues to drive the company's vision and success.",

    parentId: null,

    department: "Leadership",
  },

  {
    id: "hr-manager",

    uniqueId: "salomi-vanancio",

    name: "Salomi Vanancio",

    designation: "HR Manager",

    specialist: [
      "Recruitment",

      "Employee Relations",

      "Human Resources",

      "Team Management",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Salomi.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SV.png",

    description:
      "Salomi Valencio is the HR Manager at Ahaan Software Consulting, playing a key role in building and managing a productive workplace. She specializes in recruitment, employee relations, human resource management, and team management. With a people-focused approach, she helps attract the right talent and supports employees throughout their professional journey. She is committed to fostering positive workplace relationships, effective collaboration, and a healthy organizational culture. Her contribution helps strengthen both the team and the overall growth of the organization.",

    parentId: "founder",

    department: "Human Resources",
  },

  {
    id: "project-manager",

    uniqueId: "soumya-bhattacharjee",

    name: "Soumya Bhattacharjee",

    designation: "Project Manager",

    specialist: [
      "Project Management",

      "Operations",

      "Team Coordination",

      "Client Management",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Soumya.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SYB.png",

    description:
      "Soumya Bhattacharjee is a Project Manager at Ahaan Software Consulting, responsible for overseeing projects from planning to successful delivery. She specializes in project management, operations, team coordination, and client management. With a structured and collaborative approach, she ensures that projects stay aligned with business objectives, timelines, and quality expectations. She facilitates effective communication between clients and internal teams while coordinating resources and workflows. Her focus on efficient execution and client satisfaction contributes to the successful delivery of technology projects.",

    parentId: "founder",

    department: "Management",
  },

  {
    id: "data-analyst",

    uniqueId: "md-rahman",

    name: "MD. Rahman",

    designation: "Data Analyst",

    specialist: ["Data Analysis", "Data Visualization", "Machine Learning"],

    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    fullImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    description:
      "MD. Rahman is a Data Analyst at Ahaan Software Consulting, specializing in data analysis, data visualization, and machine learning. He focuses on transforming complex datasets into meaningful insights that support informed business decisions. With a detail-oriented and analytical approach, he identifies trends, patterns, and opportunities within data. He also creates clear and informative visualizations to make data easier to understand. His expertise helps teams leverage data effectively and drive smarter, insight-based strategies.",

    parentId: "founder",

    department: "Data Science",
  },

  {
    id: "sales-lead",

    uniqueId: "surojeet-chatterjee",

    name: "Surojeet Chatterjee",

    designation: "Sales Team Lead",

    specialist: [
      "Sales Strategy",

      "Business Development",

      "Client Communication",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Surojeet.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SC.png",

    description:
      "Surojeet Chatterjee is a Sales Lead at Ahaan Software Consulting, focused on driving business growth and developing strong client relationships. He specializes in sales strategy, business development, and client communication. With a customer-focused approach, he identifies new opportunities and works closely with clients to understand their business needs. He supports the sales team in building effective strategies and achieving business objectives. His expertise contributes to expanding the company's reach and fostering long-term client partnerships.",

    parentId: "founder",

    department: "Sales",
  },

  {
    id: "office-admin",

    uniqueId: "prosenjit-paik",

    name: "Prosenjit Paik",

    designation: "Office Administrator",

    specialist: [
      "Office Management",

      "Administrative Support",

      "Communication",

      "Organization",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Prosenjit.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/PP.png",

    description:
      "Prosenjit Paik serves as the Office Administrator at Ahaan Software Consulting, ensuring the smooth and efficient functioning of daily office operations. He specializes in office management, administrative support, communication, and organizational coordination. With a detail-oriented approach, he helps streamline administrative processes and supports effective collaboration across teams. His contribution plays an important role in maintaining an organized, productive, and well-managed work environment.",

    parentId: "founder",

    department: "Office Administration",
  },

  {
    id: "content-writer",
    uniqueId: "tania-ghosh",
    name: "Tania Ghosh",

    designation: "Content Writer",

    specialist: ["Content Strategy", "Copywriting", "SEO", "Digital Marketing"],

    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    fullImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",

    description:
      "Tania Ghosh is a Content Writer at Ahaan Software Consulting, specializing in content strategy, copywriting, SEO, and digital marketing. She focuses on creating clear, engaging, and purpose-driven content that connects businesses with their target audiences. Her expertise includes developing content strategies aligned with brand goals and digital marketing objectives. She combines creativity with SEO best practices to improve online visibility and audience engagement. Her work supports the company's digital presence through compelling and value-driven communication.",

    parentId: "project-manager",

    department: "Content Writing",
  },

  {
    id: "senior-associate",

    uniqueId: "soumitra-maity",

    name: "Soumitra Maity",

    designation: "Senior Associate",

    specialist: [
      "React.js",

      "TypeScript",

      "Tailwind CSS",

      "JavaScript",

      "Express.js",

      "Node.js",

      "Mongo DB",

      "MySQL",

      "Hydrogen",

      "Shopify",

      "Wordpress",

      "Spring boot",

      "Python",

      "HTML",

      "CSS",

      "REST API",

      "github",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Soumitra.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SM.png",

    description:
      "Soumitra Maity is a Senior Developer Associate at Ahaan Software Consulting, specializing in modern web and full-stack development. He works with React.js, TypeScript, JavaScript, Node.js, Redux, Shopify, WordPress, and Hydrogen to build scalable digital solutions. His technical expertise also includes Spring Boot, Python, Express.js, MySQL, and MongoDB. He is experienced in developing responsive interfaces using HTML, CSS, and Tailwind CSS. With a versatile technology skill set, he contributes to building reliable, high-performance applications tailored to diverse business requirements.",

    parentId: "project-manager",

    department: "Development",
  },

  {
    id: "full-stack-developer",

    uniqueId: "sugam-karmakar",

    name: "Sugam Karmakar",

    designation: "Full-Stack Developer",

    specialist: [
      "Node.js",

      "Express.js",

      "MongoDB",

      "REST API",

      "React.js",

      "TypeScript",

      "Tailwind CSS",

      "JavaScript",

      "MySQL",

      "Hydrogen",

      "Shopify",

      "Wordpress",

      "HTML",

      "CSS",

      "github",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Sugam.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SKK.png",

    description:
      "Sugam Karmakar is a Full-Stack Developer at Ahaan Software Consulting, specializing in building scalable and user-focused web solutions. He works with Node.js, Express.js, React.js, TypeScript, and JavaScript to develop modern full-stack applications. His expertise also includes MySQL and MongoDB for efficient data management and backend development. He has experience working with Hydrogen, Shopify, and WordPress using Elementor to create flexible digital experiences. With strong knowledge of HTML, CSS, and Tailwind CSS, he focuses on delivering responsive, reliable, and high-performance web solutions.",

    parentId: "senior-associate",

    department: "Development",
  },

  {
    id: "jr-web-developer",

    uniqueId: "subhadeep-dey",

    name: "Subhadeep Dey",

    designation: "Junior Web Developer",

    specialist: [
      "HTML",

      "CSS",

      "Tailwind CSS",

      "React.js",

      "JavaScript",

      "TypeScript",

      "Shopify",

      "Wordpress",

      "github",

      "Canva",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Subhadeep.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SD.png",

    description:
      "Subhadeep Dey is a Junior Web Developer at Ahaan Software Consulting, specializing in modern web development and CMS-based solutions. He works with HTML, CSS, Tailwind CSS, JavaScript, React.js, and TypeScript to create responsive and user-friendly interfaces. He has hands-on experience with Shopify theme customization, WordPress using Elementor, and Odoo CMS for developing and managing digital experiences. He also uses Canva for creating banners and social media content, along with basic video editing for digital marketing needs. With a versatile skill set and a continuous learning mindset, he contributes to building engaging and effective web solutions.",

    parentId: "senior-associate",

    department: "Development",
  },

  {
    id: "jr-web-developer",

    uniqueId: "soumi-kanungo",

    name: "Soumi Kanungo",

    designation: "Junior Web Developer",

    specialist: [
      "Node.js",

      "React.js",

      "Express.js",

      "MongoDB",

      "REST API",

      "Shopify",

      "Wordpress",

      "TypeScript",

      "JavaScript",

      "Tailwind CSS",

      "HTML",

      "CSS",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Soumi.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SK.png",
    
    description:
      "Soumi Kanungo is a Junior Web Developer at Ahaan Software Consulting, specializing in developing responsive and user-friendly web solutions. She works with React.js, Node.js, and Tailwind CSS to build modern and interactive web applications. She also has experience with WordPress, HTML, and CSS for creating and customizing digital experiences. With knowledge of GitHub, she supports efficient code management and collaborative development workflows. Her focus on learning and applying modern technologies contributes to delivering reliable and engaging web solutions.",

    parentId: "senior-associate",

    department: "Development",
  },

  {
    id: "senior-ui-ux-designer",

    uniqueId: "surajit-bera",

    name: "Surajit Bera",

    designation: "Senior UI/UX Designer",

    specialist: [
      "UI Design",

      "UX Research",

      "Figma",

      "Design Systems",

      "Framer",

      "Adobe creative suite",

      "Webflow",

      "Canva",

      "Wix",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Surajit.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/SB.png",

    description:
      "Surajit Bera is a Senior UI/UX Designer at Ahaan Software Consulting, specializing in creating intuitive, engaging, and visually consistent digital experiences. He has expertise in UI design, UX research, Figma, and design systems to develop user-centered solutions. His experience with Adobe Creative Suite, Framer, Wix, and Webflow supports the creation of modern and interactive interfaces. He also uses Canva and Jitter to create visual content and engaging design assets. With a strong focus on usability and aesthetics, he helps transform ideas into effective digital experiences that align with business and user needs.",

    parentId: "project-manager",

    department: "Design",
  },

  {
    id: "junior-ui-ux-designer",

    uniqueId: "rimpa-dutta",

    name: "Rimpa Dutta",

    designation: "Junior UI/UX Designer",

    specialist: [
      "UI Design",

      "UX Research",

      "Figma",

      "Design Systems",

      "Canva",

      "Webflow",

      "Framer",

      "Wordpress",

      "Shopify",

      "Photoshop",
    ],

    image: "https://ahaanmedia.com/ahaanwebsite/teams/Rimpa.png",

    fullImage: "https://ahaanmedia.com/ahaanwebsite/teams/RD.png",

    description:
      "Rimpa Dutta is a Junior UI/UX Designer at Ahaan Software Consulting, specializing in creating user-friendly and visually engaging digital experiences. She works with UI design, UX research, Figma, and design systems to develop intuitive interfaces. Her expertise also includes Canva, Webflow, and Framer for creating modern and interactive designs. She has hands-on experience with WordPress using Elementor and Shopify theme customization. With a user-focused approach and attention to detail, she contributes to creating functional and aesthetically appealing digital solutions.",

    parentId: "senior-ui-ux-designer",

    department: "Design",
  },

  {
    id: "sales-executive",

    uniqueId: "abhishek-mondal",

    name: "Abhishek Mondal",

    designation: "Sales Executive",

    specialist: ["Lead Generation", "Client Communication", "Sales"],

    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    fullImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    description:
      "Abhishek Mondal is a Sales Executive at Ahaan Software Consulting, focused on generating new business opportunities and building strong client relationships. He specializes in lead generation, client communication, and sales. He works closely with prospective clients to understand their requirements and identify suitable solutions. With a proactive and customer-focused approach, he supports the sales process from initial outreach to successful engagement. His efforts contribute to expanding the company's client base and supporting overall business growth.",

    parentId: "sales-lead",

    department: "Sales",
  },

  {
    id: "sales-executive",

    uniqueId: "soumydeep-roy",

    name: "Soumydeep Roy",

    designation: "Sales Executive",

    specialist: ["Lead Generation", "Client Communication", "Sales"],

    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    fullImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    description:
      "Soumydeep Roy is a Sales Executive at Ahaan Software Consulting, focused on developing new business opportunities and building meaningful client relationships. He specializes in lead generation, client communication, and sales. He engages with prospective clients to understand their requirements and identify suitable technology solutions. With a proactive and professional approach, he supports the sales process and maintains effective communication throughout client interactions. His efforts contribute to expanding the company's business opportunities and strengthening client engagement.",

    parentId: "sales-lead",

    department: "Sales",
  },
];
