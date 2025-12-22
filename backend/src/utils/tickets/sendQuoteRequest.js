const freshdeskUrl = 'https://abduldev.freshdesk.com'
import axios from 'axios'

const REQUIRED_FIELDS = {
  name: {
    type: "string",
    min: 2,
    max: 80,
  },
  mail: {
    type: "email",
    max: 120,
  },
  service: {
    type: "string",
    min: 2,
    max: 60,
  },
};

function sanitizeText(value, max = 2000) {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, max);
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRequiredFields(data) {
  const errors = [];

  for (const [key, rules] of Object.entries(REQUIRED_FIELDS)) {
    const value = data[key];

    if (!value) {
      errors.push(`${key} is required`);
      continue;
    }

    if (rules.type === "string") {
      if (typeof value !== "string") errors.push(`${key} must be a string`);
      else {
        if (rules.min && value.length < rules.min)
          errors.push(`${key} too short`);
        if (rules.max && value.length > rules.max)
          errors.push(`${key} too long`);
      }
    }
    if (rules.type === "email" && !isValidEmail(value)) {
      errors.push(`invalid email format`);
    }

    if (rules.type === "email" && rules.max && value.length > rules.max) {
      errors.push(`${key} too long`);
    }
  }

  return errors;
}

function extractExtraFields(data) {
  const extras = {};

  for (const [key, value] of Object.entries(data)) {
    if (key in REQUIRED_FIELDS) continue;

    const sanitized = sanitizeText(value, 1000);
    if (sanitized) {
      extras[key] = sanitized;
    }
  }

  return extras;
}

function buildFreshdeskMessage(required, extra) {
  let message = `<h1> New Quote Request </h1> <br> <br>`;
  message += `<strong> Name: </strong> ${required.name} <br>`;
  message += `<strong> Email: </strong> ${required.mail} <br>`;
  message += `<strong> Service: </strong> ${required.service} <br> <br>`;
  message += `<strong> Additional Details: </strong> <br>`;

  for (const [key, value] of Object.entries(extra)) {
    // Skip empty values
    if (!value) continue;
    if (key === "token") continue;

    // Make key readable, e.g., virtualAssistant -> Virtual Assistant
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());

    message += `<strong> ${label}: </strong> ${value} <br>`;
  }

  return message.trim();
}

export async function sendQuoteRequest(req, res) {
  const { data } = req.body;
  if (!data || typeof data !== "object") {
    return res.status(400).send({ message: "invalid request data" });
  }

  const validationErrors = validateRequiredFields(data);
  if (validationErrors.length) {
    return res.status(422).send({
      message: "validation failed",
      errors: validationErrors,
    });
  }

  const { name, mail, service } = data;
  const extraFields = extractExtraFields(data);

  const description = buildFreshdeskMessage(
    { name, mail, service },
    extraFields
  );

  try {
    const response = await axios.post(
      `${freshdeskUrl}/api/v2/tickets`,
      {
        subject: `New ${service} Quote Request from ${name}`,
        description,
        email: mail,
        priority: 1,
        status: 2,
        source: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(process.env.FRESHDESK_API_KEY).toString("base64"),
          // Buffer.from(`${process.env.FRESHDESK_API_KEY}:X`).toString("base64"),
        },
      }
    );

    return res
      .status(201)
      .send({ message: "Quote request created successfully" });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).send({
        message: "Ticket creation failed",
        error: error.response.data,
      });
    }
    // return res.status(500).send({ message: error.message });
    return res.status(500).send({ message: "An unexpected error occurred" });
  }
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