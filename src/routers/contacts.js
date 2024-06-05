import { Router } from "express";

import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

router.post('/contacts',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController)
)

router.patch('/contacts/:id',
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController))

router.delete('/contacts/:id', ctrlWrapper(deleteContactController)
)

export default router;
