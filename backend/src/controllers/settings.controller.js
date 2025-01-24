import db from "../utils/config/prisma.js"
export async function getSettings(req, res) {
      try {
        const settings = await db.setting.findUnique({
                where: {
                    id: "44d5594c-a4ef-41a8-9543-b3e17fd10ac0",
                },
                include: {
                        projects: {
                                include: {
                                        clientInfo: true,
                                },
                        },
                        socials: true,
                        testimonials: {
                                include: {
                                        clientInfo: true,
                                },
                        },
                        tools: true,
                
                }
    
        })
        console.log(settings)
        if (settings) res.send(settings)

        else res.status(404).send({message: "site Settings not found, try again"})
      } catch (error) {
        console.error(error)
        res.status(500).send({message: `an error occured: ${ error.message}`})
        
      }


}