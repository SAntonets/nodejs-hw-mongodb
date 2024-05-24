import { setupServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { contactsCollection } from "./services.js/contacts.js";
;


const bootstrap = async () => {
    await initMongoDB();
    const contacts = await contactsCollection.find();
    console.log(contacts);
    setupServer();
};

bootstrap();
