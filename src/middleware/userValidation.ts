import { body } from 'express-validator';

export const signUpValidation = () => [
    body('name')
        .isString()
        .withMessage('O nome é obrigatório')
        .isLength({ min: 3 })
        .withMessage('O nome deve ter no mínimo 3 caracteres'),
    body('username')
        .isString()
        .withMessage('O username é obrigatório')
        .isLength({ min: 3 })
        .withMessage('O nome de usuário deve ter no mínimo 3 caracteres'),
    body('email').isEmail().withMessage('O email é obrigatório'),
    body('password')
        .isString()
        .isLength({ min: 6 })
        .withMessage('A senha é obrigatória e deve ter no mínimo 6 caracteres')
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('As senhas devem ser iguais');
            }
            return true;
        }),
];
