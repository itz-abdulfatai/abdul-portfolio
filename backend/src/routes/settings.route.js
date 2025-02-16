import express from 'express'
import { getSettings, patchSettings } from '../controllers/settings.controller.js'
import { addProjects, addSocials, addTestimonials, addTools, deleteProjects, deleteSocials, deleteTestimonials, deleteTools, getProjects, getSocials, getTestimonials, getTools, updateProjects, updateSocials, updateTestimonials, updateTools } from '../controllers/otherSettings.controller.js'
import { validateAddProject, validateAddSocial, validateAddTestimonial, validateAddTool } from '../utils/validation/addValidation.js'
import { validateUpdateProject, validateUpdateSocial, validateUpdateTestimonial, validateUpdateTool } from '../utils/validation/updateValidation.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'


const router = express.Router()

// global settings modifications
router.get('/', getSettings)
router.patch('/:id', patchSettings) // should be protected - not done yet

// other setting get 
router.get('/socials',authMiddleware, getSocials)
router.get('/projects',authMiddleware, getProjects)
router.get('/testimonials',authMiddleware, getTestimonials)
router.get('/tools',authMiddleware, getTools)

// other seettings add
router.post('/socials',authMiddleware,validateAddSocial, addSocials)
router.post('/projects',authMiddleware,validateAddProject, addProjects)
router.post('/testimonials',authMiddleware,validateAddTestimonial, addTestimonials)
router.post('/tools',authMiddleware,validateAddTool, addTools)


// other seetings update
router.patch('/socials/:id',authMiddleware, validateUpdateSocial, updateSocials)
router.patch('/projects/:id',authMiddleware, validateUpdateProject, updateProjects)
router.patch('/testimonials/:id',authMiddleware, validateUpdateTestimonial, updateTestimonials)
router.patch('/tools/:id',authMiddleware, validateUpdateTool, updateTools)

// other seetings delete
router.delete('/socials/:id',authMiddleware, deleteSocials)
router.delete('/projects/:id',authMiddleware, deleteProjects)
router.delete('/testimonials/:id',authMiddleware, deleteTestimonials)
router.delete('/tools/:id',authMiddleware, deleteTools)

export default router