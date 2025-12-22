export async function validateUpdateSocial(req, res, next) {
  let { data } = req.body;
  if (!data) return res.status(400).send({message: "no or invalid data"});
  // console.log(data);

  const errors = [];
  const validFields = ["name", "icon", "link"];
  const filtered = {};

  for (const key in data) {
    if (validFields.includes(key)) {
      filtered[key] = data[key];
    }
  }

  data = filtered;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return res.status(400).send({ message: errors.join(", ") });
  }

  if (data.name && (typeof data.name !== "string" || data.name.trim() === "")) {
    errors.push("Name must be a string");
  }

  if (data.icon && (typeof data.icon !== "string" || data.icon.trim() === "")) {
    errors.push("icon must be a valid boxicons font class");
  }

  if (data.link && (typeof data.link !== "string" || data.link.trim() === "")) {
    errors.push("link must be a string");
  }

  if (errors.length > 0)
    return res.status(400).send({
      message: errors.join(", "),
    });

  req.body.data = data;

  next();
}

export async function validateUpdateProject(req, res, next) {
  let { data } = req.body;
  if (!data) return res.status(400).send({message: "no or invalid data"});
  // console.log(data);

  const errors = [];
  const validFields = [
    "name",
    "services",
    "images",
    "description",
    "type",
    "public"
  ];

  const filtered = {};

  for (const key in data) {
    if (validFields.includes(key)) {
      filtered[key] = data[key];
    }
  }

  data = filtered;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return res.status(400).send({
      message: errors.join(", "),
    });
  }

  if (data.name && typeof data.name !== "string") {
    errors.push("Name must be a string");
  }

  if (("services" in data && !Array.isArray(data.services)) || data.services.length === 0) {
    errors.push("Services must be a non-empty array of strings");
  }

  if ( "images" in data && (!Array.isArray(data.images) || data.images.length === 0)) {
    errors.push("Images must be a non-empty array of strings");
  }

  if (data.description && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  if (data.type && typeof data.type !== "string") {
    errors.push("Type must be a string");
  }

  if ("public" in data && typeof data.public !== "boolean") {
    errors.push("Public must be a boolean");
  }

  if ("clientInfoId" in data && typeof data.clientInfoId !== "string") {
    errors.push("ClientInfoId must be a string");
  }

  if (errors.length > 0)
    return res.status(400).send({
      message: errors.join(", "),
    });

  req.body.data = data;

  next();
}

export async function validateUpdateCertification(req, res, next) {
  let { data } = req.body;
  if (!data) return res.status(400).send({ message: "no or invalid data" });

  const errors = [];
  const validFields = [
    "name",
    "imageLink",
    "certLink",
    "dateIssued",
    "expiryDate",
    "issuingOrganization",
    "description",
    "priority",
    "public",
  ];

  const filtered = {};

  for (const key in data) {
    if (validFields.includes(key)) {
      filtered[key] = data[key];
    }
  }

  data = filtered;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return res.status(400).send({ message: errors.join(", ") });
  }

  if (data.name && typeof data.name !== "string") {
    errors.push("Name must be a string");
  }

  if (data.imageLink && typeof data.imageLink !== "string") {
    errors.push("ImageLink must be a string");
  }

  if (
    "certLink" in data &&
    data.certLink !== null &&
    typeof data.certLink !== "string"
  ) {
    errors.push("CertLink must be a string or null");
  }

  if ("dateIssued" in data) {
    const date = new Date(data.dateIssued);
    if (isNaN(date.getTime())) {
      errors.push("DateIssued must be a valid date");
    } else {
      data.dateIssued = date;
    }
  }

  if ("expiryDate" in data) {
    const date = new Date(data.expiryDate);
    if (isNaN(date.getTime())) {
      errors.push("ExpiryDate must be a valid date");
    } else {
      data.expiryDate = date;
    }
  }

  if (
    "issuingOrganization" in data &&
    data.issuingOrganization !== null &&
    typeof data.issuingOrganization !== "string"
  ) {
    errors.push("IssuingOrganization must be a string or null");
  }

  if (
    "description" in data &&
    data.description !== null &&
    typeof data.description !== "string"
  ) {
    errors.push("Description must be a string or null");
  }

  if ("priority" in data && typeof data.priority !== "number") {
    errors.push("Priority must be a number");
  }

  if ("public" in data && typeof data.public !== "boolean") {
    errors.push("Public must be a boolean");
  }

  if (errors.length > 0) {
    return res.status(400).send({ message: errors.join(", ") });
  }

  req.body.data = data;
  next();
}


export async function validateUpdateTool(req, res, next) {
  let { data } = req.body;
  if (!data) return res.status(400).send({message: "no or invalid data"});
  // console.log(data);

  const errors = [];
  const validFields = ["name", "icon", "use"];
  const filtered = {};

  for (const key in data) {
    if (validFields.includes(key)) {
      filtered[key] = data[key];
    }
  }

  data = filtered;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return res.status(400).send({
      message: errors.join(", "),
    });
  }

  if (data.name && (typeof data.name !== "string" || data.name.trim() === "")) {
    errors.push("Name must be a string");
  }

  if (data.icon && (typeof data.icon !== "string" || data.icon.trim() === "")) {
    errors.push("icon must be a valid boxicons font class");
  }

  if (data.use && (typeof data.use !== "string" || data.use.trim() === "")) {
    errors.push("use must be a string");
  }

  if (errors.length > 0)
    return res.status(400).send({
      message: errors.join(", "),
    });

  req.body.data = data;

  next();
}

export async function validateUpdateTestimonial(req, res, next) {
  let { data } = req.body;
  if (!data) return res.status(400).send({message: "no or invalid data"});
  // console.log(data);

  const errors = [];
  const validFields = ["rating", "comment", "clientInfo", "clientInfoId"];

  const filtered = {};

  for (const key in data) {
    if (validFields.includes(key)) {
      filtered[key] = data[key];
    }
  }

  data = filtered;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return res.status(400).send({
      message: errors.join(", "),
    });
  }

  if (
    data.rating &&
    (typeof data.rating !== "number" || data.rating < 1 || data.rating > 5)
  ) {
    errors.push("Rating must be a number between 1 and 5");
  }

  if (
    data.comment &&
    (typeof data.comment !== "string" || data.comment.trim() === "")
  ) {
    errors.push("Comment must be a non-empty string");
  }

  if (errors.length > 0)
    return res.status(400).send({
      message: errors.join(", "),
    });

  req.body.data = data;
  next();
}
