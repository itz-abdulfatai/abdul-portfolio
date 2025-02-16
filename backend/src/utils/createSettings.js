import db from "./config/prisma.js";

async function seed() {
    try {
        const setting = await db.setting.create({
            data: {
                name: 'Abdulfatai Aliyu',
                avatar: '/api/images/my-avatar.jpg',
                about: `
                Hello, \n
                I'm Abdulfatai Aliyu a fully seasoned full stack web developer and digital marketer. I specialize in creating websites using techs like react js, next js, typescript, js, express, node, mongodb, postgreSQL, prisma, tailwind, bootstrap,firebase, helmet js, etc. \n 
                In addition to my coding expertise, I possess advanced skills in creating WordPress landing pages, blogs, e-commerce stores, etc. I am well-versed in utilizing popular WordPress plugins like Elementor, WooCommerce, Autoptimize, Jetpack, and so on to enhance website functionality and user experience. I ensure that each project I undertake is executed with precision and creativity. \n
                I also have a high level of digital marketing knowledge. i use tools like klaviyo, Facebook and Instagram ads, Google Analytics, SMS bump, etc to boost client conversion rates, sales and website traffic. \n
                Hire me for fast and effective delivery of your project at a competitive price. \n
                want to learn more, kindly hop into my inbox so we can discuss the perfect deal for you. \n
                Thank you.
                `,
                heading: 'Transform your creative ideas into reality with expert design solutions',
                projectsDone: 46,
                clientSatisfaction: 100,
                yearsOfExperience: 4,
                email: 'abdulfataialiyu4@gmail.com',
                tools: {
                    createMany: {
                        data: [
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
      { name: "Vercel", icon: 'https://picsum.photos/1440/800', use: "Hosting" },
      { name: "Framer", icon: 'https://picsum.photos/1440/800', use: "Prototyping" },
                        ]
                    }
                },
                socials: {
                    createMany: {
                        data: [
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
                    }
                },
                
                testimonials: {
                    createMany: {
                        data: [
                            {
                                rating: 5,
                                comment: "We are very pleased with the work of Yaroslav Grabovsky, who turned our website into a stunning showcase for our brand.",
                               clientInfoId: 'fe1a8933-8d80-4a64-a70c-f581eb660e37'
                            },
                            {
                                rating: 2.5,
                                comment: "The team exceeded our expectations by delivering a sleek and functional e-commerce platform within a tight deadline.",
                               clientInfoId: 'fe1a8933-8d80-4a64-a70c-f581eb660e37'
                            },
                            {
                                rating: 5,
                                comment: "Their expertise in crafting a user-friendly dashboard helped our business streamline operations effortlessly.",
                                clientInfoId: 'eb9b927b-47a0-4d99-841a-1e2330e8aa3c'
                            },
                            {
                                rating: 4.8,
                                comment: "From start to finish, their professionalism and attention to detail made this project a breeze.",
                               clientInfoId: 'eb9b927b-47a0-4d99-841a-1e2330e8aa3c'
                            },
                            {
                                rating: 5,
                                comment: "The design and functionality they implemented transformed our website into an industry-leading platform.",
                               clientInfoId: '8b0e58b4-dd65-479d-a439-fecc0a05786b'
                            },
                            {
                                rating: 4.7,
                                comment: "Their dedication to creating a visually engaging and technically sound application impressed our entire team.",
                               clientInfoId: '8b0e58b4-dd65-479d-a439-fecc0a05786b'
                            },
                            {
                                rating: 5,
                                comment: "Exceptional work! They delivered a product that met our needs and exceeded our expectations.",
                                clientInfoId: '3d731a63-f748-488c-b523-1f859bb74374'
                            },
                            {
                                rating: 4.9,
                                comment: "Their approach to solving problems and providing innovative solutions is truly commendable.",
                                clientInfoId: 'f48e0afd-a272-4027-9ae5-f04bf26901d6' 
                            },
                            {
                                rating: 5,
                                comment: "The mobile app they developed is intuitive and has received great feedback from our users.",
                                clientInfoId: 'f48e0afd-a272-4027-9ae5-f04bf26901d6'
                            },
                            {
                                rating: 4.6,
                                comment: "Working with this team was a delight. They made the entire process seamless and delivered high-quality results.",
                                clientInfoId: 'f48e0afd-a272-4027-9ae5-f04bf26901d6'
                            }
                           
                        ],
                        skipDuplicates: true
                    }
                },
                projects: {
                    createMany: {
                        data: [
                            {
                                name: "Lysta - Fintech Landing Page",
                                services: ["Landing", "Dashboard"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "The Finance landing page project showcases a stunning website design tailored for a cutting-edge crypto dashboard. Our goal was to create a user-friendly interface that seamlessly combines aesthetic appeal with robust functionality. The design features a sleek, modern layout that highlights key financial data, real-time market trends, and user account information. With intuitive navigation and visually engaging graphics, users can effortlessly track their crypto investments and stay informed about market movements. This project exemplifies our commitment to blending creativity with technical expertise, delivering a digital experience that not only looks exceptional but also provides practical, real-time financial insights.",
                                type: "personal",
                                clientInfoId: '3d731a63-f748-488c-b523-1f859bb74374',
                                slug: "lysta-fintech-landing-page"
                            },
                            {
                                name: "Nova - E-Commerce Platform",
                                services: ["E-Commerce", "Product Listings"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "Nova is a fully-functional e-commerce platform designed to provide seamless online shopping experiences. The platform includes features like product filtering, secure payments, and user-friendly navigation, all tailored to meet modern e-commerce needs.",
                                type: "job",
                                clientInfoId: '3d731a63-f748-488c-b523-1f859bb74374',
                                slug: "nova-e-commerce-platform"
                            },
                            {
                                name: "Craftory - Artisan Portfolio",
                                services: ["Portfolio", "Blogging"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "Craftory highlights the artistic skills of individual creators with a minimalistic design and portfolio showcase. The project emphasizes clean layouts and bold visuals to make their work stand out.",
                                type: "personal",
                               clientInfoId:'3d731a63-f748-488c-b523-1f859bb74374',
                                slug: "craftory-artisan-portfolio"
                            },
                            {
                                name: "QuickServe - Food Delivery App",
                                services: ["Landing", "Mobile Design"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly. QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly. QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly.",
                                type: "suggest",
                               clientInfoId: '3c71fe27-e484-49c4-8af2-cdf99f3cf3cc',
                                slug: "quickserve-food-delivery-app"
                            },
                            {
                                name: "Brixel - Real Estate Listings",
                                services: ["Listing", "Admin Dashboard"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "Brixel is a real estate website designed to simplify the property search process. The site includes advanced filtering options, dynamic property maps, and a sleek admin dashboard.",
                                type: "job",
                                clientInfoId: '3c71fe27-e484-49c4-8af2-cdf99f3cf3cc',
                                slug: "brixel-real-estate-listings"
                            },
                            {
                                name: "ZenDeskify - Customer Support Portal",
                                services: ["Support", "Dashboard"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "ZenDeskify is a customer support portal designed for handling tickets and improving user engagement. It includes a dashboard for agents and a self-service FAQ section for users.",
                                type: "personal",
                                clientInfoId: '8b0e58b4-dd65-479d-a439-fecc0a05786b',
                                slug: "zendeskify-customer-support-portal"
                            },
                            {
                                name: "GlowUp - Beauty Salon App",
                                services: ["Appointment Booking", "User Management"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "GlowUp is a vibrant beauty salon app that allows users to book appointments, view services, and get personalized style suggestions. The app is optimized for mobile use with a sleek interface.",
                                type: "for sale",
                                clientInfoId: '8b0e58b4-dd65-479d-a439-fecc0a05786b',
                                slug: "glowup-beauty-salon-app"
                            },
                            {
                                name: "CodeGenix - Developer Hub",
                                services: ["Blogging", "Resources"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "CodeGenix is a resource hub for developers featuring coding tutorials, industry insights, and a collaborative forum. The design focuses on usability and community building.",
                                type: "personal",
                                clientInfoId: 'fe1a8933-8d80-4a64-a70c-f581eb660e37',
                                slug: "codegenix-developer-hub"
                            },
                            {
                                name: "EventFlow - Event Management App",
                                services: ["Event Management", "Ticketing"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "EventFlow simplifies event management with features like ticket sales, real-time updates, and attendee tracking. Designed to make organizing events stress-free and efficient.",
                                type: "suggest",
                                clientInfoId: 'fe1a8933-8d80-4a64-a70c-f581eb660e37',
                                slug: "eventflow-event-management-app"
                            },
                            {
                                name: "EcoCart - Sustainable E-Commerce",
                                services: ["Shopping", "Analytics"],
                                images: ['https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800', 'https://picsum.photos/1440/800'],
                                description: "EcoCart is an e-commerce platform focused on sustainable shopping. The project integrates eco-friendly product tagging and a carbon footprint calculator to help users shop responsibly.",
                                type: "for sale",
                                clientInfoId: 'eb9b927b-47a0-4d99-841a-1e2330e8aa3c',
                                slug: "ecocart-sustainable-e-commerce"
                            }
                        ],
                        skipDuplicates: true
                    }
                }
                
                
            }
           
        });
        console.log("settings inserted successfully!");
        console.log(setting);
    } catch (error) {
        console.error("Error inserting data:", error.message);
    }
}

async function seedClient() {
    await db.clientInfo.createMany(
        {
            data: [
                {name: "Global Ventures", sector: "Finance"},
                {name: "TechSphere", sector: "Tech"},
                {name: "TrendyDesigns", sector: "Design"},
                {name: "Healthify", sector: "Health"},
                {name: "QuickServe", sector: "Food"},
                {name: "BrightIdeas", sector: "Marketing"},
            ],
            skipDuplicates: true
        }
    )
    
    console.log("Client data inserted successfully!");

    const clients = await db.clientInfo.findMany();
    console.log("All clients:", clients);

}

async function seedPersonalClient() {
    try {
        const personal = await db.clientInfo.createMany(
            {
                data: [
                    {name: "personal", sector: "personal/ for sale"},
                ],
                skipDuplicates: true
            }
        )
        console.log("personal Client data inserted successfully!");

        console.log(personal)
    } catch (error) {
         console.error("Error inserting data:", error.message);

         return

        
    }
    


}

// seed();
// seedClient();
// seedPersonalClient();
// personal project client id: not needed for now
// salam was here 
// yes i know what // is 
// yes dont worry e nogo affect your code 
//why your code skip from 3 to 268????
// thats weird
// when we dey go department???
// fatai answer me o
// you go dey make call 
// why you dey comment this is cleam??
// okay im done
// byeeeeeee
// read line 323 again!!!!