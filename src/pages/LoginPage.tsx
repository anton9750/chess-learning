// Login-siden: en almindelig email+password-formular, samt en rigtig
// "Log ind med Google"-knap.
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { loginSchema, type LoginInput } from "../schemas/auth";
import { loginUser, loginWithGoogle } from "../lib/auth";
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

export default function LoginPage() {
  const navigate = useNavigate();
  // Holder styr på DOM-elementet, Googles knap skal tegnes ind i. Bruges i
  // stedet for useRef, da den callback-ref-tilgang (ref={setGoogleButtonNode})
  // også udløser en re-render, når elementet bliver tilgængeligt.
  const [googleButtonNode, setGoogleButtonNode] = useState<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  // Indlæser Googles script og tegner deres officielle knap, så snart
  // container-elementet findes. Når brugeren logger ind hos Google, afkodes
  // tokenet, brugeren oprettes/logges ind, og vi sender videre til profilen.
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

  // Almindeligt login med email/password.
  function onSubmit(data: LoginInput) {
    const result = loginUser(data.email, data.password);
    if (!result.ok) {
      setError("password", { message: result.error });
      return;
    }
    navigate("/profile");
  }

  return (
    <Wrap>
      <h1>Log in</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          Log in
        </SubmitButton>
        {/* Googles rigtige knap bliver tegnet ind her af useEffect ovenfor. */}
        <GoogleButtonSlot ref={setGoogleButtonNode} />
      </Form>
      <p>
        No account yet? <Link to="/signup">Sign up</Link>
      </p>
    </Wrap>
  );
}
