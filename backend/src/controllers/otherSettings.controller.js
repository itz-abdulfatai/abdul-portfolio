import db from "../utils/config/prisma.js"


// get
export async function getSocials(req, res) {
    try {
        const socials = await db.social.findMany({
            where: {
                settingId: process.env.SETTINGS_DB_ID
            }
        })
        if (!socials) return res.status(404).send('socials not found')
    // console.log(socials)
            res.send(socials)
    } catch (error) {
        console.error(error)
console.error(error.stack)
        res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    

    
}

export async function getProjects(req, res) {
    try {
        const projects = await db.project.findMany({
            where: {
                settingId: process.env.SETTINGS_DB_ID
            }
        })
        if (!projects) return res.status(404).send('projects not found')
            res.send(projects)
    } catch (error) {
        console.error(error)
console.error(error.stack)
        res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    
}

export async function getTestimonials(req, res) {
    try {
        const testimonials = await db.testimonial.findMany({
            where: {
                settingId: process.env.SETTINGS_DB_ID
            }
        })
        if (!testimonials) return res.status(404).send('testimonials not found')
            res.send(testimonials)
    } catch (error) {
        console.error(error)
console.error(error.stack)
        res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    
}

export async function getTools(req, res) {
    try {
        const tools = await db.tool.findMany({
            where: {
                settingId: process.env.SETTINGS_DB_ID
            }
        })
        if (!tools) return res.status(404).send('tools not found')
            res.send(tools)
    } catch (error) {
        console.error(error)
console.error(error.stack)
        res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    
}







// add
export async function addSocials(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send('no or invalid data')
        console.log('in controller')
    console.log(data)

    try {
        const newSocial = await db.social.create({
            data: {
               ...data,
                settingId: process.env.SETTINGS_DB_ID
            }
        })
        console.log(newSocial)
        res.status(201).send({message: 'social added succesfully'})
    } catch (error) {
        console.error(error)
console.error(error.stack)
        return res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    
}

export async function addProjects(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send('no or invalid data')
        console.log('in controller')
    console.log(data)

    try {
        let clientInfoId = null;

        if (data.clientInfoId) {

            clientInfoId = data.clientInfoId;
        } else if (data.clientInfo && typeof data.clientInfo === 'object' && data.clientInfo.id) {
            // Check if client exists
            const existingClient = await db.clientInfo.findUnique({
                where: { id: data.clientInfo.id }, // Example field to identify clients
            });

            if (existingClient) {
                clientInfoId = existingClient.id;
            } else {
                // Create new client if not found
                const newClient = await db.clientInfo.create({
                    data: data.clientInfo,
                });
                clientInfoId = newClient.id;
            }
        }

        // Create the project
        const newProject = await db.project.create({
            data: {
                name: data.name,
                services: data.services,
                images: data.images,
                description: data.description,
                type: data.type,
                public: data.public ?? true, 
                slug: data.slug ?? data.name.replace(/\s+/g, '-').toLowerCase(),
                settingId: process.env.SETTINGS_DB_ID,
                clientInfoId,
            },
        });

        console.log(newProject);
        res.status(201).send({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        console.error(error)
console.error(error.stack)
        return res.status(500).send({ message: `an error occured: ${error.message}` })
        
    }
    
}

export async function addTestimonials(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send('no or invalid data')
        console.log('in controller')
        console.log(data)



        try {
            const newTestimonial = await db.testimonial.create({
                data: {
                   ...data,
                    settingId: process.env.SETTINGS_DB_ID
                }
            })

            console.log(newTestimonial)
            res.status(201).send({message: 'testimonial added successfully'})
        } catch (error) {
            console.error(error)
console.error(error.stack)
            return res.status(500).send({ message: `an error occured: ${error.message}` })
            
        }
    
}

export async function addTools(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send('no or invalid data')
        console.log('in controller')
    console.log(data)

    
        try {
            const newTool = await db.tool.create({
                data: {
                    ...data,
                    settingId: process.env.SETTINGS_DB_ID
                }
            })
            console.log(newTool)
            res.status(201).send({message: 'tool added successfully'})
        } catch (error) {
            console.error(error)
console.error(error.stack)
            return res.status(500).send({ message: `an error occured: ${error.message}` })
            
        }
    
}

// update
export async function updateSocials(req, res) {
    const {id} = req.params
    if (!id) return res.status(400).send('no or invalid input')
    console.log(id)
    
}

export async function updateProjects(req, res) {
    
}

export async function updateTestimonials(req, res) {
    
}

export async function updateTools(req, res) {
    
}

// delete
export async function deleteSocials(req, res) {
    
}

export async function deleteProjects(req, res) {
    
}

export async function deleteTestimonials(req, res) {
    
}

export async function deleteTools(req, res) {
    
}

