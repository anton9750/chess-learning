// Opret-konto-siden: formular til navn/email/password, samt en rigtig
// "Log ind med Google"-knap, der både kan bruges til login og oprettelse.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { signupSchema, type SignupInput } from "../schemas/auth";
import { registerUser, loginWithGoogle } from "../lib/auth";
import { loadGoogleScript, initGoogleSignIn, renderGoogleButton, decodeGoogleCredential } from "../lib/googleAuth";
import { pageContainer, card, accentButton } from "../styles/mixins";

const Wrap = styled.div`
  ${pageContainer}
  max-width: 420px;
`;

const Form = styled.form`
  ${({ theme }) => card(theme)}
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Input = styled.input`
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgAlt};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.bad};
  font-size: 0.82rem;
`;

const SubmitButton = styled.button`
  ${({ theme }) => accentButton(theme)}
`;

const GoogleButtonSlot = styled.div`
  display: flex;
  justify-content: center;
`;

const Note = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

export default function SignupPage() {
  const navigate = useNavigate();
  // Se LoginPage.tsx for forklaring af denne callback-ref-tilgang.
  const [googleButtonNode, setGoogleButtonNode] = useState<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  // Samme Google-opsætning som på login-siden.
  useEffect(() => {
    if (!googleButtonNode) return;
    let cancelled = false;
    loadGoogleScript()
      .then(() => {
        if (cancelled) return;
        initGoogleSignIn((idToken) => {
          const { email, name } = decodeGoogleCredential(idToken);
          loginWithGoogle(email, name);
          navigate("/profile");
        });
        renderGoogleButton(googleButtonNode);
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, [googleButtonNode, navigate]);

  // Opretter en ny konto med navn/email/password.
  function onSubmit(data: SignupInput) {
    const result = registerUser({ ...data, provider: "local" });
    if (!result.ok) {
      setError("email", { message: result.error });
      return;
    }
    navigate("/profile");
  }

  return (
    <Wrap>
      <h1>Create an account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register("name")} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </Field>
        <Field>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </Field>
        <Field>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </Field>
        <SubmitButton type="submit" disabled={isSubmitting}>
          Sign up
        </SubmitButton>
        <GoogleButtonSlot ref={setGoogleButtonNode} />
        <Note>
          School project note: there's no real backend here, so accounts are
          stored only in your browser's localStorage, unencrypted. Don't use a
          real password.
        </Note>
      </Form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </Wrap>
  );
}
