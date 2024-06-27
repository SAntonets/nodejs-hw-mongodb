import { Router } from "express";

import { createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema,
    updateContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";
import { upload } from "../middlewares/multer.js";


const router = Router();

router.use('/', authenticate);

router.get('/', checkRoles(ROLES.CONTACTOWNER), ctrlWrapper(getContactsController));

router.get('/:id', checkRoles(ROLES.CONTACTOWNER), ctrlWrapper(getContactByIdController));

router.post('', checkRoles(ROLES.CONTACTOWNER),
   // validateBody(createContactSchema),
    upload.single('photo'),
    ctrlWrapper(createContactController)
)

router.patch('/:id',
    checkRoles(ROLES.CONTACTOWNER),
    validateBody(updateContactSchema),
    upload.single('photo'),
    ctrlWrapper(patchContactController))

router.delete('/:id',
    checkRoles(ROLES.CONTACTOWNER),
     ctrlWrapper(deleteContactController)
)

router.get('/', ctrlWrapper(getContactsController));

export default router;
