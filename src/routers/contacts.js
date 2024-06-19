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


const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactByIdController));

router.post('',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController)
)

router.patch('/:id',
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController))

router.delete('/:id', ctrlWrapper(deleteContactController)
)

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

export default router;
