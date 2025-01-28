import db from "../utils/config/prisma.js";

export const mocksettings = {
    name: 'Abdulfatai Aliyu', 
    avatar: null,
    isAvaliableForFreelancing: true,
    heading:
      "Transform your creative ideas into reality with expert design solutions",
    about: `Welcome! I'm Yaroslav, a professional web designer and developer with a knack for crafting visually stunning and highly functional websites. Combining creativity and technical expertise, I transform your vision into a digital masterpiece that excels in both appearance and performance.`,
    projectsDone: 46,
    yearsOfExperience: 3,
    clientSatisfaction: 100,
    tools: [
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
    ],
    projects: [
        {
            name: "Lysta - Fintech Landing Page",
            services: ["Landing", "Dashboard"],
            images: [null, null, null],
            description: "The Finance landing page project showcases a stunning website design tailored for a cutting-edge crypto dashboard. Our goal was to create a user-friendly interface that seamlessly combines aesthetic appeal with robust functionality. The design features a sleek, modern layout that highlights key financial data, real-time market trends, and user account information. With intuitive navigation and visually engaging graphics, users can effortlessly track their crypto investments and stay informed about market movements. This project exemplifies our commitment to blending creativity with technical expertise, delivering a digital experience that not only looks exceptional but also provides practical, real-time financial insights.",
            type: "personal",
            clientInfo: { name: "Global Ventures", sector: "Finance" },
            slug: "lysta-fintech-landing-page"
        },
        {
            name: "Nova - E-Commerce Platform",
            services: ["E-Commerce", "Product Listings"],
            images: [null, null, null, null],
            description: "Nova is a fully-functional e-commerce platform designed to provide seamless online shopping experiences. The platform includes features like product filtering, secure payments, and user-friendly navigation, all tailored to meet modern e-commerce needs.",
            type: "job",
            clientInfo: { name: "Shopify Boosters", sector: "Retail" },
            slug: "nova-e-commerce-platform"
        },
        {
            name: "Craftory - Artisan Portfolio",
            services: ["Portfolio", "Blogging"],
            images: [null, null, null],
            description: "Craftory highlights the artistic skills of individual creators with a minimalistic design and portfolio showcase. The project emphasizes clean layouts and bold visuals to make their work stand out.",
            type: "personal",
            clientInfo: { name: "Independent", sector: "Arts & Crafts" },
            slug: "craftory-artisan-portfolio"
        },
        {
            name: "QuickServe - Food Delivery App",
            services: ["Landing", "Mobile Design"],
            images: [null, null, null, null, null],
            description: "QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly. QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly. QuickServe is a modern food delivery app design that prioritizes speed and convenience. The interface allows users to browse menus, track deliveries, and manage orders effortlessly.",
            type: "suggest",
            clientInfo: { name: "FastPlate Inc.", sector: "Food Delivery" },
            slug: "quickserve-food-delivery-app"
        },
        {
            name: "Brixel - Real Estate Listings",
            services: ["Listing", "Admin Dashboard"],
            images: [null, null, null],
            description: "Brixel is a real estate website designed to simplify the property search process. The site includes advanced filtering options, dynamic property maps, and a sleek admin dashboard.",
            type: "job",
            clientInfo: { name: "EstatePros", sector: "Real Estate" },
            slug: "brixel-real-estate-listings"
        },
        {
            name: "ZenDeskify - Customer Support Portal",
            services: ["Support", "Dashboard"],
            images: [null, null, null, null],
            description: "ZenDeskify is a customer support portal designed for handling tickets and improving user engagement. It includes a dashboard for agents and a self-service FAQ section for users.",
            type: "personal",
            clientInfo: { name: "TechConnect", sector: "Customer Support" },
            slug: "zendeskify-customer-support-portal"
        },
        {
            name: "GlowUp - Beauty Salon App",
            services: ["Appointment Booking", "User Management"],
            images: [null, null, null, null],
            description: "GlowUp is a vibrant beauty salon app that allows users to book appointments, view services, and get personalized style suggestions. The app is optimized for mobile use with a sleek interface.",
            type: "for sale",
            clientInfo: { name: "Radiance Co.", sector: "Beauty & Wellness" },
            slug: "glowup-beauty-salon-app"
        },
        {
            name: "CodeGenix - Developer Hub",
            services: ["Blogging", "Resources"],
            images: [null, null, null],
            description: "CodeGenix is a resource hub for developers featuring coding tutorials, industry insights, and a collaborative forum. The design focuses on usability and community building.",
            type: "personal",
            clientInfo: { name: "OpenSource Collective", sector: "Tech" },
            slug: "codegenix-developer-hub"
        },
        {
            name: "EventFlow - Event Management App",
            services: ["Event Management", "Ticketing"],
            images: [null, null, null, null, null],
            description: "EventFlow simplifies event management with features like ticket sales, real-time updates, and attendee tracking. Designed to make organizing events stress-free and efficient.",
            type: "suggest",
            clientInfo: { name: "EventPro", sector: "Event Planning" },
            slug: "eventflow-event-management-app"
        },
        {
            name: "EcoCart - Sustainable E-Commerce",
            services: ["Shopping", "Analytics"],
            images: [null, null, null, null, null, null],
            description: "EcoCart is an e-commerce platform focused on sustainable shopping. The project integrates eco-friendly product tagging and a carbon footprint calculator to help users shop responsibly.",
            type: "for sale",
            clientInfo: { name: "EcoShop Ltd.", sector: "Sustainability" },
            slug: "ecocart-sustainable-e-commerce"
        }
    ],
    
    
    testimonials: [
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
    ], 

    socials: [
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

   
// get or create client if not existing
export async function getOrCreate(clientInfo) {
    try {
          const client = await db.clientInfo.findUnique({
              where: { name: clientInfo.name },
          });
    
          if (client) {
              // clientInfoId = client.id;
              return client.id;
              
          } else {
              const newClient = await db.clientInfo.create({
                  data: clientInfo,
              });
              return newClient.id;
          }
    } catch (error) {
        console.error(error)
        console.error(error.stack)
        // return '87cdc68a-4c6d-4d63-9743-c5e2d6f9f887'
        
    }
      
  }