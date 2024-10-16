import { z } from 'zod'

const updateUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First Name is required!' }),
    lastName: z.string().optional(),
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z
      .string({
        required_error: 'Password is required!',
      })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      ),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    avatar: z.string().optional(),
  }),
})
