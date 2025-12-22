import express from 'express'
import { getSettings, patchSettings } from '../controllers/settings.controller.js'
import {
  addCertification,
  addProjects,
  addSocials,
  addTestimonials,
  addTools,
  deleteCertification,
  deleteProjects,
  deleteSocials,
  deleteTestimonials,
  deleteTools,
  getCertifications,
  getProjects,
  getSocials,
  getTestimonials,
  getTools,
  updateCertification,
  updateProjects,
  updateSocials,
  updateTestimonials,
  updateTools,
} from "../controllers/otherSettings.controller.js";
import {
  validateAddCertification,
  validateAddProject,
  validateAddSocial,
  validateAddTestimonial,
  validateAddTool,
} from "../utils/validation/addValidation.js";
import {
  validateUpdateCertification,
  validateUpdateProject,
  validateUpdateSocial,
  validateUpdateTestimonial,
  validateUpdateTool,
} from "../utils/validation/updateValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// global settings modifications
router.get("/", getSettings);

// other setting get
router.get("/socials", authMiddleware, getSocials);
router.get("/projects", authMiddleware, getProjects);
router.get("/certifications", authMiddleware, getCertifications);
router.get("/testimonials", authMiddleware, getTestimonials);
router.get("/tools", authMiddleware, getTools);

// other seettings add
router.post("/socials", authMiddleware, validateAddSocial, addSocials);
router.post("/projects", authMiddleware, validateAddProject, addProjects);
router.post(
  "/certifications",
  authMiddleware,
  validateAddCertification,
  addCertification
);
router.post(
  "/testimonials",
  authMiddleware,
  validateAddTestimonial,
  addTestimonials
);
router.post("/tools", authMiddleware, validateAddTool, addTools);

// other seetings update
router.patch(
  "/socials/:id",
  authMiddleware,
  validateUpdateSocial,
  updateSocials
);
router.patch(
  "/projects/:id",
  authMiddleware,
  validateUpdateProject,
  updateProjects
);
router.patch(
  "/certifications/:id",
  authMiddleware,
  validateUpdateCertification,
  updateCertification
);
router.patch(
  "/testimonials/:id",
  authMiddleware,
  validateUpdateTestimonial,
  updateTestimonials
);
router.patch("/tools/:id", authMiddleware, validateUpdateTool, updateTools);

// other seetings delete
router.delete("/socials/:id", authMiddleware, deleteSocials);
router.delete("/projects/:id", authMiddleware, deleteProjects);
router.delete("/certifications/:id", authMiddleware, deleteCertification);
router.delete('/testimonials/:id',authMiddleware, deleteTestimonials)
router.delete('/tools/:id',authMiddleware, deleteTools)

// global settings update
router.patch("/:id", authMiddleware, patchSettings); // should be protected - not done yet

export default router