import db from "../utils/config/prisma.js";
import { validateUpdateData } from "../utils/validation/settingsValidation.js";
export async function getSettings(req, res) {
  try {
    const settings = await db.setting.findUnique({
      where: {
        id: "44d5594c-a4ef-41a8-9543-b3e17fd10ac0",
        
      },cacheStrategy: {swr: 100, ttl: 600, tags: ['my_global_settings']},
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
      },
    });
    console.log(settings);
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
  console.log(id)
  console.log(data)

  if (!id) return res.status(400).send({ message: "invalid id" });
  if (!data) return res.status(400).send({ message: "invalid request data" });

  const errors = await validateUpdateData(data)
  if (errors.length > 0) return res.status(400).send({ message: errors.map(error => {return error}).join(', ') });

  console.log(data)
  

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
console.log(updatedSetting)
res.send({message: 'updated successfully'})

  } catch (error) {
        console.error(error)
console.error(error.stack);
    res.status(500).send({ message: `an error occured: ${error.message}` });
  }
}

