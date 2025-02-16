const freshdeskUrl = 'https://abduldev.freshdesk.com'
import axios from 'axios'

export async function  createTicket(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send({message: 'invalid or no request data'})   
    const {name, mail, message, subject} = data

    if (!name || !mail || !message) return res.status(400).send({message: 'invalid request data'})
            // console.log('data')
    try {
        const response = await axios.post(freshdeskUrl+'/api/v2/tickets', {
            description: message,
            subject: subject ?? `New Ticket from ${name}`,
            email: mail,
            priority: 1,
            status: 2,
            source: 2,
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + Buffer.from(process.env.FRESHDESK_API_KEY).toString("base64"),
            }
        }
   )

//    console.log('response')
// console.log(response.data)


    if (response.status === 201) {
         return res.status(201).send({message: 'Ticket created successfully'})
    } else {
        // console.log(response.data)
        return res.status(500).send( response.data)


    }

        
    }catch (error) {
        if (error.response) {
            // Axios-specific error with a response
            console.log(error.response.data);
            return res.status(error.response.status).send({
                message: 'Ticket creation failed: ' + (error.response.data || error.message),
            });
        }
        // Normal error
        console.log(error.message);
        return res.status(500).send({message: 'Ticket creation failed: ' + error.message});
    }

// res.status(201).send({message: 'dummy Ticket created successfully'})
}


export async function replyAsClient(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send({message: 'invalid or no request data'})
    const {ticketId, message} = data
    if (!ticketId || !message) return res.status(400).send({message: 'invalid request data'})

        try {
            const response = await axios.post(freshdeskUrl + '/api/v2/tickets/' + ticketId + '/reply', 
                {
                    body: message,

                },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + Buffer.from(process.env.FRESHDESK_API_KEY).toString("base64"),
                
                }
            })

            // console.log(response.data)
            if (response.status === 201) {
                return res.status(201).send({message: 'Reply sent successfully'})
            } else {
                return res.status(500).send(response.data)
            }
        } catch (error) {
            console.log(error.message)
            console.log(error.response.data)
            return res.status(500).send({message: 'Reply failed: ' + error.message})
            
        }


    
}