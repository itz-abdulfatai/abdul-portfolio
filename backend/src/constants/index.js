import db from "../utils/config/prisma.js";



   
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