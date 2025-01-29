import express from 'express'
import { getSettings, patchSettings } from '../controllers/settings.controller.js'
import { addProjects, addSocials, addTestimonials, addTools, deleteProjects, deleteSocials, deleteTestimonials, deleteTools, getProjects, getSocials, getTestimonials, getTools, updateProjects, updateSocials, updateTestimonials, updateTools } from '../controllers/otherSettings.controller.js'
import { validateAddProject, validateAddSocial, validateAddTestimonial, validateAddTool } from '../utils/validation/addValidation.js'
import { validateUpdateProject, validateUpdateSocial, validateUpdateTestimonial, validateUpdateTool } from '../utils/validation/updateValidation.js'


const router = express.Router()

// global settings modifications
router.get('/', getSettings)
router.patch('/:id', patchSettings) // should be protected - not done yet

// other setting get 
router.get('/socials', getSocials)
router.get('/projects', getProjects)
router.get('/testimonials', getTestimonials)
router.get('/tools', getTools)

// other seettings add
router.post('/socials',validateAddSocial, addSocials)
router.post('/projects',validateAddProject, addProjects)
router.post('/testimonials',validateAddTestimonial, addTestimonials)
router.post('/tools',validateAddTool, addTools)


// other seetings update
router.patch('/socials/:id', validateUpdateSocial, updateSocials)
router.patch('/projects/:id', validateUpdateProject, updateProjects)
router.patch('/testimonials/:id', validateUpdateTestimonial, updateTestimonials)
router.patch('/tools/:id', validateUpdateTool, updateTools)

// other seetings delete
router.delete('/socials/:id', deleteSocials)
router.delete('/projects/:id', deleteProjects)
router.delete('/testimonials/:id', deleteTestimonials)
router.delete('/tools/:id', deleteTools)

export default router