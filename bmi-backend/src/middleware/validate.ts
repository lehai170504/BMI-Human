// import { Request, Response, NextFunction } from 'express';
// import { validateLogin, validateRegister } from '../utils/validators';
// export const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = validateLogin(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   next();
// };  

// export const validateRegisterMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = validateRegister(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   next();
// };  


