import { Router } from "express";

import { getContactByIdController, getContactsController } from "../controllers/contacts.js";


const router = Router();

router.get('/contacts', getContactsController);

router.get('/contacts/:id', getContactByIdController);

export default router;
