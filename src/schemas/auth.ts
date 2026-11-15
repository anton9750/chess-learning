// Validering af login/signup-formularerne med Zod. Bruges sammen med
// react-hook-form via zodResolver i LoginPage og SignupPage.
import { z } from "zod";

// Simpelt regex til at tjekke, at en email ligner en rigtig emailadresse.
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regler for oprettelse af konto: navn, email og password med krav om tal.
export const signupSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 bogstaver"),
  email: z
    .string()
    .min(1, "Email er påkrævet")
    .regex(emailRegex, "Indtast en gyldig emailadresse"),
  password: z
    .string()
    .min(6, "Password skal være mindst 6 tegn")
    .regex(/[0-9]/, "Password skal indeholde mindst ét tal"),
});

// Regler for login: her stilles der ikke samme krav til password-formatet,
// kun at felterne ikke er tomme (det rigtige password tjekkes et andet sted).
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email er påkrævet")
    .regex(emailRegex, "Indtast en gyldig emailadresse"),
  password: z.string().min(1, "Password er påkrævet"),
});

// TypeScript-typer udledt direkte fra Zod-skemaerne, så formularernes data
// altid matcher valideringsreglerne.
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
