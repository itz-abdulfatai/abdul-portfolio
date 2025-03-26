const freshdeskUrl = 'https://abduldev.freshdesk.com'
import axios from 'axios'

export async function sendQuoteRequest(req, res) {
    const {data} = req.body
    if (!data) return res.status(400).send({message: 'invalid or no request data'})   
    const {
        name, 
        mail, 
        websiteExamples,
        existingWebsite,
        branding,
        features,
        purpose,
        pages,
        location,
        hosting,
        maintenance,
        additional,
        seo,
        content,
        virtualAssistant,
        source
    } = data

    if (!name || !mail){
        console.log(`request from ${req?.ip} does not have name or mail`) 
         return res.status(400).send({message: 'invalid request data'})
        }

    // Format the message for Freshdesk
    const formattedMessage = `
New Website Quote Request from ${name}<br><br>

Contact Information:<br>
Name: ${name}<br>
Email: ${mail}<br>
Location: ${location || 'Not specified'}<br><br>

Project Details:<br>
Website Examples: ${websiteExamples || 'Not provided'}<br>
Existing Website: ${existingWebsite || 'Not provided'}<br>
Branding Preferences: ${branding || 'Not specified'}<br>
Required Features: ${features || 'Not specified'}<br>
Main Purpose: ${purpose || 'Not specified'}<br>
Required Pages: ${pages || 'Not specified'}<br>
Hosting Status: ${hosting || 'Not specified'}<br>
Maintenance: ${maintenance || 'Not specified'}<br><br>

Additional Services Interest:<br>
SEO Optimization: ${seo || 'Not specified'}<br>
Content Updates: ${content || 'Not specified'}<br>
Social Media Management: ${virtualAssistant || 'Not specified'}<br><br>

Additional Information:<br>
${additional || 'No additional information provided'}<br><br>

${source ? `Source: ${source}` : ''}
    `.trim()

    try {
        const response = await axios.post(freshdeskUrl+'/api/v2/tickets', {
            description: formattedMessage,
            subject: `New Website Quote Request from ${name}`,
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
         return res.status(201).send({message: 'Quote request created successfully'})
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

// res.status(201).send({message: 'dummy quote created successfully'})
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