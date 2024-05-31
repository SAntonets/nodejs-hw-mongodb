import { Router } from "express";

import { createContactController, deleteContactController, getContactByIdController, getContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController)
)

router.delete('/contacts/:id', ctrlWrapper(deleteContactController)
)

export default router;
