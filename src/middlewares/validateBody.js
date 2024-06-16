import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (validationError) {
        const error = createHttpError(400, 'Bad Request', {
            errors: validationError.details.map((error) => error.message),
        });
        next(error);
    }
}
