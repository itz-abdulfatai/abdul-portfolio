import db from "../utils/config/prisma.js";
import { validateUpdateData } from "../utils/validation/settingsValidation.js";
export async function getSettings(req, res) {
  try {
    const settings = await db.setting.findUnique({
      where: {
        id: process.env.SETTINGS_DB_ID,
        
      },cacheStrategy: {swr: 100, ttl: 600, tags: ['my_global_settings']},
      include: {
        projects: {
          include: {
            clientInfo: true,
          },
          where: {softDelete: false, public: true}
        },
        socials: {
          where: {softDelete:false}
        },
        testimonials: {
          include: {
            clientInfo: true,
          },
          where: {softDelete: false}
        },
        tools: {
          where: {softDelete: false}
        },
      },
    });
    // console.log(settings);
    if (settings) res.send(settings);
    else
      res.status(404).send({ message: "site Settings not found, try again" });
  } catch (error) {
    console.error(error)
console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

export async function patchSettings(req, res) {
  const { id } = req.params;
  const {data} = req.body
  // console.log(id)
  // console.log(data)

  if (!id) return res.status(400).send({ message: "invalid id" });
  if (!data) return res.status(400).send({ message: "invalid request data" });

  const errors = await validateUpdateData(data)
  if (errors.length > 0) return res.status(400).send({ message: errors.map(error => {return error}).join(', ') });

  // console.log(data)
  

  try {
    const setting = await db.setting.findUnique({
      where: { id },
      
    });
    if (!setting) return res.status(404).send({message: 'invalid referenced data'})
        // console.log(setting)
    const updatedSetting = await db.setting.update({
      where: { id },
      data: {
        ...data
      },
});
// console.log(updatedSetting)
res.send({message: 'updated successfully'})

  } catch (error) {
        console.error(error)
console.error(error.stack);
return res.status(500).send({message: `an error occurred: ${error.message}`});

  }
}

