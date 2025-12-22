import { getOrCreate } from "../constants/index.js";
import db from "../utils/config/prisma.js";

// get
export async function getSocials(req, res) {
  try {
    const socials = await db.social.findMany({
      where: {
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    if (!socials) return res.status(404).send("socials not found");
    // console.log(socials)
    res.send(socials);
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await db.project.findMany({
      where: {
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    if (!projects) return res.status(404).send("projects not found");
    res.send(projects);
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

export async function getCertifications(req, res) {
  try {
    const certifications = await db.certification.findMany({
      where: {
        settingId: process.env.SETTINGS_DB_ID,
      },
      orderBy: {
        priority: "asc",
      },
    });

    if (!certifications)
      return res.status(404).send("certifications not found");

    res.send(certifications);
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

export async function getTestimonials(req, res) {
  try {
    const testimonials = await db.testimonial.findMany({
      where: {
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    if (!testimonials) return res.status(404).send("testimonials not found");
    res.send(testimonials);
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

export async function getTools(req, res) {
  try {
    const tools = await db.tool.findMany({
      where: {
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    if (!tools) return res.status(404).send("tools not found");
    res.send(tools);
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

// add
export async function addSocials(req, res) {
  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");
  // console.log(data);

  try {
    const newSocial = await db.social.create({
      data: {
        ...data,
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    // console.log(newSocial);
    res.status(201).send({ message: "social added succesfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ==
      "\nInvalid `prisma.social.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
    ) {
      return res
        .status(400)
        .send({ message: "A social with that name already exists" });
    }
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function addProjects(req, res) {
  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");
  // console.log(data);

  try {
    let clientInfoId = null;

    if (data.clientInfo) {
      clientInfoId = await getOrCreate(data.clientInfo);
      // console.log(clientInfoId);
    } else {
      clientInfoId = await getOrCreate({
        name: "personal",
        sector: "personal/ for sale",
      });
    }

    // if (data.clientInfoId) {

    //     clientInfoId = data.clientInfoId;
    // } else if (data.clientInfo && typeof data.clientInfo === 'object' && data.clientInfo.id) {
    //     // Check if client exists
    //     const existingClient = await db.clientInfo.findUnique({
    //         where: { id: data.clientInfo.id }, // Example field to identify clients
    //     });

    //     if (existingClient) {
    //         clientInfoId = existingClient.id;
    //     } else {
    //         // Create new client if not found
    //         const newClient = await db.clientInfo.create({
    //             data: data.clientInfo,
    //         });
    //         clientInfoId = newClient.id;
    //     }
    // }

    // Create the project
    const newProject = await db.project.create({
      data: {
        name: data.name,
        services: data.services,
        images: data.images,
        description: data.description,
        type: data.type,
        public: data.public ?? true,
        slug: data.slug ?? data.name.replace(/\s+/g, "-").toLowerCase(),
        settingId: process.env.SETTINGS_DB_ID,
        clientInfoId,
      },
    });

    // console.log(newProject);
    res
      .status(201)
      .send({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);

    if (
      error.message ==
      "\nInvalid `prisma.project.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
    ) {
      return res
        .status(400)
        .send({ message: "A project with that name already exists" });
    }
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function addCertification(req, res) {
  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const newCertification = await db.certification.create({
      data: {
        ...data,
        settingId: process.env.SETTINGS_DB_ID,
      },
    });

    res.status(201).send({
      message: "certification added successfully",
      certification: newCertification,
    });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ===
      "\nInvalid `prisma.certification.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
    ) {
      return res
        .status(400)
        .send({ message: "A certification with that name already exists" });
    }

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function addTestimonials(req, res) {
  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");
  // console.log(data);

  try {
    let clientInfoId = null;

    if (data.clientInfo) {
      clientInfoId = await getOrCreate(data.clientInfo);
      // console.log(clientInfoId)
    } else {
      clientInfoId = await getOrCreate({
        name: "personal",
        sector: "personal/ for sale",
      });
    }
    const newTestimonial = await db.testimonial.create({
      data: {
        //    ...data,
        comment: data.comment,
        rating: data.rating,
        settingId: process.env.SETTINGS_DB_ID,
        clientInfoId,
      },
    });

    // console.log(newTestimonial);
    res.status(201).send({ message: "testimonial added successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function addTools(req, res) {
  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");
  // console.log(data);

  try {
    const newTool = await db.tool.create({
      data: {
        ...data,
        settingId: process.env.SETTINGS_DB_ID,
      },
    });
    // console.log(newTool);
    res.status(201).send({ message: "tool added successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ==
      "\nInvalid `prisma.tool.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)"
    ) {
      return res
        .status(400)
        .send({ message: "A tool with that name already exists" });
    }
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

// update
export async function updateSocials(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");
  // console.log(id);

  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const updatedSocial = await db.social.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (!updatedSocial) return res.status(404).send("social not found");
    // console.log(updatedSocial);
    res.send({ message: "social updated successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function updateProjects(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");
  // console.log(id);

  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const updatedProject = await db.project.update({
      where: { id },
      data: {
        ...data,
      },
    });

    if (!updatedProject) return res.status(404).send("project not found");

    res.send({ message: "project updated successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function updateCertification(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");

  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const updatedCertification = await db.certification.update({
      where: { id },
      data: { ...data },
    });

    if (!updatedCertification)
      return res.status(404).send("certification not found");

    res.send({ message: "certification updated successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function updateTestimonials(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");
  // console.log(id);

  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const updatedTestimonial = await db.testimonial.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (!updatedTestimonial)
      return res.status(404).send("testimonial not found");

    res.send({ message: "testimonial updated successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function updateTools(req, res) {
  const { id } = req.params;
  // console.log("hit");
  if (!id) return res.status(400).send("no or invalid parameters");
  // console.log(id);

  const { data } = req.body;
  if (!data) return res.status(400).send("no or invalid data");

  try {
    const updatedTool = await db.tool.update({
      where: { id },
      data: { ...data },
    });

    if (!updatedTool) return res.status(404).send("tool not found");

    res.send({ message: "tool updated successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);
    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

// delete
export async function deleteSocials(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");

  try {
    const deleted = await db.social.delete({
      where: { id },
    });

    if (!deleted) return res.status(404).send("social not found");

    res.send({ message: "social deleted successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ===
      "\nInvalid `prisma.social.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist."
    ) {
      return res.status(404).send({ message: "social not found" });
    }

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function deleteProjects(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");

  try {
    const deleted = await db.project.delete({
      where: { id },
    });

    if (!deleted) return res.status(404).send("project not found");

    res.send({ message: "project deleted successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ===
      "\nInvalid `prisma.project.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist."
    ) {
      return res.status(404).send({ message: "project not found" });
    }

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function deleteCertification(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send("no or invalid parameters");

  try {
    const deleted = await db.certification.delete({
      where: { id },
    });

    if (!deleted) return res.status(404).send("certification not found");

    res.send({ message: "certification deleted successfully" });
  } catch (error) {
    console.error(error);
    console.error(error.stack);

    if (
      error.message ===
      "\nInvalid `prisma.certification.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist."
    ) {
      return res.status(404).send({ message: "certification not found" });
    }

    return res
      .status(500)
      .send({ message: `an error occured: ${error.message}` });
  }
}

export async function deleteTestimonials(req, res) {
    const {id} = req.params
    if (!id) return res.status(400).send("no or invalid parameters")

        try {
            const deleted = await db.testimonial.delete({
                where: {id}
            })

            if (!deleted) return res.status(404).send("testimonial not found")

            res.send({message: "testimonial deleted successfully"})
        } catch (error) {
            console.error(error)
            console.error(error.stack)

            if (error.message === '\nInvalid `prisma.testimonial.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.') {
                return res.status(404).send({message:"testimonial not found"})
            }

            return res.status(500).send({message: `an error occured: ${error.message}`})
            
        }
}

export async function deleteTools(req, res) {
    const {id} = req.params
    if (!id) return res.status(400).send("no or invalid parameters")

        try {
            const deleted = await db.tool.delete({
                where: {id}
            })

            if (!deleted) return res.status(404).send("tool not found")

            res.send({message: "tool deleted successfully"})
        } catch (error) {
            console.error(error)
            console.error(error.stack)

            if (error.message === '\nInvalid `prisma.tool.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.') {
                return res.status(404).send({message:"tool not found"})
            }

            return res.status(500).send({message: `an error occured: ${error.message}`})
            
        }
}

// soft delete
// will work on it later