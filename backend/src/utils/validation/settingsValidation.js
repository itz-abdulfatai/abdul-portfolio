export async function validateUpdateData(data) {
  // console.log(data);
  const errors = [];
  

  const allowedKeys = ["name", "email", "avatar", "isAvaliableForFreelancing", "heading", "about", "projectsDone","clientSatisfaction", "yearsOfExperience"];
  const filteredData = {};
  for (const key in data) {
    if (allowedKeys.includes(key)) {
      filteredData[key] = data[key];
    }
  }

  data = filteredData;

  if (Object.keys(data).length === 0) {
    errors.push("No or invalid data provided");
    return errors;
  }



  // check for invalid fields 

  if ("tools" in data || "projects" in data || "testimonials" in data || "socials" in data) {
    errors.push("Invalid request: Restricted fields included");
    return errors; // Terminate validation immediately
  }

  if (data.name && typeof data.name !== "string") {
    errors.push("Name must be a string");
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.avatar && typeof data.avatar !== "string") {
    errors.push("Avatar must be a string");
  }

  if (
    "isAvaliableForFreelancing" in data &&
    typeof data.isAvaliableForFreelancing !== "boolean"
  ) {
    errors.push("isAvaliableForFreelancing must be a boolean");
  }

  if (data.heading && typeof data.heading !== "string") {
    errors.push("Heading must be a string");
  }

  if (data.about && typeof data.about !== "string") {
    errors.push("About must be a string");
  }

  if (
    "projectsDone" in data &&
    (typeof data.projectsDone !== "number" || data.projectsDone < 0)
  ) {
    errors.push("ProjectsDone must be a non-negative number");
  }

  if (
    "yearsOfExperience" in data &&
    (typeof data.yearsOfExperience !== "number" || data.yearsOfExperience < 0)
  ) {
    errors.push("YearsOfExperience must be a non-negative number");
  }

  if (
    "clientSatisfaction" in data &&
    (typeof data.clientSatisfaction !== "number" ||
      data.clientSatisfaction < 0 ||
      data.clientSatisfaction > 100)
  ) {
    errors.push("ClientSatisfaction must be a number between 0 and 100");
  }

  return errors;
}
