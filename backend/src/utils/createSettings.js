import db from "./config/prisma.js";
async function seed() {

    try {
       const setting = await db.setting.create({
          data: {
            name: "Abdulfatai Aliyu",
            avatar: "api/images/my-avatar.jpg",
            about: `
                Hello, \n
                I'm Abdulfatai Aliyu a fully seasoned full stack web developer and digital marketer. I specialize in creating websites using techs like react js, next js, typescript, js, express, node, mongodb, postgreSQL, prisma, tailwind, bootstrap,firebase, helmet js, etc. \n 
                In addition to my coding expertise, I possess advanced skills in creating WordPress landing pages, blogs, e-commerce stores, etc. I am well-versed in utilizing popular WordPress plugins like Elementor, WooCommerce, Autoptimize, Jetpack, and so on to enhance website functionality and user experience. I ensure that each project I undertake is executed with precision and creativity. \n
                I also have a high level of digital marketing knowledge. i use tools like klaviyo, Facebook and Instagram ads, Google Analytics, SMS bump, etc to boost client conversion rates, sales and website traffic. \n
                Hire me for fast and effective delivery of your project at a competitive price. \n
                want to learn more, kindly hop into my inbox so we can discuss the perfect deal for you. \n
                Thank you.
                `,
                clientSatisfaction: 100,
                heading: 'Transform your creative ideas into reality with expert design solutions',
                projectsDone: 46,
                yearsOfExperience: 4,
                email: 'abdulfataialiyu4@gmail.com',
                tools:  {
                    create: [
                        { name: "HTML", icon: "bxl-html5", use: "Markup" },
                        { name: "CSS", icon: "bxl-css3", use: "Styling" },
                        { name: "JavaScript", icon: "bxl-javascript", use: "Programming" },
                        { name: "TypeScript", icon: "bxl-typescript", use: "Typed JS" },
                        { name: "MongoDB", icon: "bxl-mongodb", use: "Database" },
                        { name: "React", icon: "bxl-react", use: "Frontend" },
                        { name: "Express", icon: "bxl-nodejs", use: "Backend" },
                        { name: "Node.js", icon: "bxl-nodejs", use: "Server" },
                        { name: "Tailwind", icon: "bxl-tailwind-css", use: "CSS Framework" },
                        { name: "Prisma", icon: "bxs-data", use: "ORM" },
                        { name: "Firebase", icon: "bxl-firebase", use: "Backend" },
                        { name: "Firestore", icon: "bxs-cloud", use: "Database" },
                        { name: "Discord", icon: "bxl-discord-alt", use: "Communication" },
                        { name: "Figma", icon: "bxl-figma", use: "Design" },
                        { name: "WordPress", icon: "bxl-wordpress", use: "CMS" },
                        { name: "Elementor", icon: "bxl-wordpress", use: "Page Builder" },
                        { name: "Next.js", icon: "bxl-react", use: "Fullstack" },
                        { name: "Git", icon: "bxl-git", use: "Versioning" },
                        { name: "GitHub", icon: "bxl-github", use: "Code Hosting" },
                        { name: "VS Code", icon: "bxl-visual-studio", use: "Editor" },
                        { name: "Docker", icon: "bxl-docker", use: "API Testing" },
                        { name: "PostgreSQL", icon: "bxl-postgresql", use: "Database" },
                        { name: "AWS", icon: "bxl-amazon", use: "Cloud Services" },
                        { name: "Stripe", icon: "bxl-stripe", use: "Payments" },
                        { name: "WebSockets", icon: "bx-link", use: "Real-Time" },
                        { name: "Vercel", icon: null, use: "Hosting" },
                        { name: "Framer", icon: null, use: "Prototyping" },
                    ]
        
                },
                  projects: {
                    create: [
                        {
                            rating: 5,
                            comment: "We are very pleased with the work of Yaroslav Grabovsky, who turned our website into a stunning showcase for our brand.",
                            clientInfo: { name: "Jerome Bell", company: "Gresca" }
                        },
                        {
                            rating: 2.5,
                            comment: "The team exceeded our expectations by delivering a sleek and functional e-commerce platform within a tight deadline.",
                            clientInfo: { name: "Amara Smith", company: "ShopWise" }
                        },
                        {
                            rating: 5,
                            comment: "Their expertise in crafting a user-friendly dashboard helped our business streamline operations effortlessly.",
                            clientInfo: { name: "Michael Green", company: "FleetWorks" }
                        },
                        {
                            rating: 4.8,
                            comment: "From start to finish, their professionalism and attention to detail made this project a breeze.",
                            clientInfo: { name: "Sophia Brown", company: "EventHub" }
                        },
                        {
                            rating: 5,
                            comment: "The design and functionality they implemented transformed our website into an industry-leading platform.",
                            clientInfo: { name: "Daniel Johnson", company: "BuildSmart" }
                        },
                        {
                            rating: 4.7,
                            comment: "Their dedication to creating a visually engaging and technically sound application impressed our entire team.",
                            clientInfo: { name: "Ava Williams", company: "Healthify" }
                        },
                        {
                            rating: 5,
                            comment: "Exceptional work! They delivered a product that met our needs and exceeded our expectations.",
                            clientInfo: { name: "Ethan Martinez", company: "TechSphere" }
                        },
                        {
                            rating: 4.9,
                            comment: "Their approach to solving problems and providing innovative solutions is truly commendable.",
                            clientInfo: { name: "Olivia Davis", company: "TrendyDesigns" }
                        },
                        {
                            rating: 5,
                            comment: "The mobile app they developed is intuitive and has received great feedback from our users.",
                            clientInfo: { name: "James Taylor", company: "QuickServe" }
                        },
                        {
                            rating: 4.6,
                            comment: "Working with this team was a delight. They made the entire process seamless and delivered high-quality results.",
                            clientInfo: { name: "Emily Moore", company: "BrightIdeas" }
                        }
        
                    ]
        
                  },
                testimonials: {
                    create: 
                    [
                        {
                            rating: 5,
                            comment: "We are very pleased with the work of Yaroslav Grabovsky, who turned our website into a stunning showcase for our brand.",
                            clientInfo: { name: "Jerome Bell", company: "Gresca" }
                        },
                        {
                            rating: 2.5,
                            comment: "The team exceeded our expectations by delivering a sleek and functional e-commerce platform within a tight deadline.",
                            clientInfo: { name: "Amara Smith", company: "ShopWise" }
                        },
                        {
                            rating: 5,
                            comment: "Their expertise in crafting a user-friendly dashboard helped our business streamline operations effortlessly.",
                            clientInfo: { name: "Michael Green", company: "FleetWorks" }
                        },
                        {
                            rating: 4.8,
                            comment: "From start to finish, their professionalism and attention to detail made this project a breeze.",
                            clientInfo: { name: "Sophia Brown", company: "EventHub" }
                        },
                        {
                            rating: 5,
                            comment: "The design and functionality they implemented transformed our website into an industry-leading platform.",
                            clientInfo: { name: "Daniel Johnson", company: "BuildSmart" }
                        },
                        {
                            rating: 4.7,
                            comment: "Their dedication to creating a visually engaging and technically sound application impressed our entire team.",
                            clientInfo: { name: "Ava Williams", company: "Healthify" }
                        },
                        {
                            rating: 5,
                            comment: "Exceptional work! They delivered a product that met our needs and exceeded our expectations.",
                            clientInfo: { name: "Ethan Martinez", company: "TechSphere" }
                        },
                        {
                            rating: 4.9,
                            comment: "Their approach to solving problems and providing innovative solutions is truly commendable.",
                            clientInfo: { name: "Olivia Davis", company: "TrendyDesigns" }
                        },
                        {
                            rating: 5,
                            comment: "The mobile app they developed is intuitive and has received great feedback from our users.",
                            clientInfo: { name: "James Taylor", company: "QuickServe" }
                        },
                        {
                            rating: 4.6,
                            comment: "Working with this team was a delight. They made the entire process seamless and delivered high-quality results.",
                            clientInfo: { name: "Emily Moore", company: "BrightIdeas" }
                        }
                    ]
                        
                }, 
        
                socials: {
                    create: [
                        {
                            name: "Instagram",
                            icon: "bxl-instagram-alt",
                            link: "https://www.instagram.com/"
                        },
                        {
                            name: "Upwork",
                            icon: "bxl-upwork",
                            link: "https://www.upwork.com/"
                        },
                        {
                            name: "Facebook",
                            icon: "bxl-facebook",
                            link: "https://www.facebook.com/"
                        },
                            {
                                name: "Buy Me A Coffee",
                                icon: "bxs-coffee",
                                link: "https://www.buymeacoffee.com/"
                            },
                            {
                                name: "WhatsApp",
                                icon: "bxl-whatsapp",
                                link: "https://wa.me/"
                            },
                            {
                                name: "Fiverr",
                                icon: "bxl-facebook",
                                link: "https://www.fiverr.com/"
                            },
                            {
                                name: "Discord",
                                icon: "bxl-discord-alt",
                                link: "https://discord.com/"
                            },
                        {
                            name: "GitHub",
                            icon: "bxl-github",
                            link: "https://github.com/"
                        }
                    ]
                },
        
        
        
        
          },
        });
        console.log('data inserted successfully')
        console.log(setting)
    } catch (error) {
        console.log(error.message)
        console.error('Error inserting data:', error)
        
    }
}

seed()