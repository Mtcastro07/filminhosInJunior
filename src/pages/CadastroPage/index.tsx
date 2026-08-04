import { zodResolver } from "@hookform/resolvers/zod";
import "./cadastro.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCadastro } from "../../hooks/useCadastro";

const registerUserSchema = z.object({
  name: z.string().min(3, "O nome deve possuir no mínimo 3 caracteres"),

  email: z.string().email("E-mail inválido"),

  dataNascimento: z.string().min(1, "Informe sua data de nascimento"),

  telefone: z.string().min(9, "Número de telefone inválido"),

  password: z.string().min(9, "A senha deve possuir no mínimo 9 caracteres"),
});

type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export default function Cadastro() {
  const cadastroMutation = useCadastro();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const [mostrar, setMostrar] = useState(false);

  function registerUser(data: RegisterUserSchema) {
    cadastroMutation.mutate(
      {
        fullName: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.password,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/");
        },

        onError: (error) => {
          console.error("Erro ao realizar cadastro:", error);
        },
      },
    );
  }

  const titulo = "Film{IN}nhos";

  return (
    <>
      <div className="cadastro-infos">
        <h1 className="cadastro-title">{titulo}</h1>

        <div className="cadastro-container">
          <h3>Cadastro</h3>

          <div className="cadastro-link">
            <p>Já possui uma conta?</p>

            <Link to="/Login" className="login-link">
              Login
            </Link>
          </div>

          <form className="register-form" onSubmit={handleSubmit(registerUser)}>
            <div>
              <label>Nome Completo</label>
              <br />

              <input {...register("name")} />

              {errors.name && (
                <p className="cadastro-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label>Email</label>
              <br />

              <input type="email" {...register("email")} />

              {errors.email && (
                <p className="cadastro-error">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label>Data de Nascimento</label>
              <br />

              <input type="date" {...register("dataNascimento")} />

              {errors.dataNascimento && (
                <p className="cadastro-error">
                  {errors.dataNascimento.message}
                </p>
              )}
            </div>

            <div>
              <label>Número de telefone</label>
              <br />

              <input type="tel" {...register("telefone")} />

              {errors.telefone && (
                <p className="cadastro-error">{errors.telefone.message}</p>
              )}
            </div>
            <div>
              <label>Senha</label>

              <div className="register-password-input">
                <input
                  type={mostrar ? "text" : "password"}
                  {...register("password")}
                />

                <svg
                  onClick={() => setMostrar(!mostrar)}
                  className="icon-mostrar"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.05671 7.05794C6.8067 7.30804 6.66628 7.64721 6.66634 8.00085C6.6664 8.35448 6.80694 8.6936 7.05704 8.94361C7.30714 9.19362 7.64631 9.33404 7.99994 9.33398C8.35358 9.33392 8.6927 9.19338 8.94271 8.94328M11.1207 11.1154C10.1855 11.7005 9.1031 12.0073 8 12C5.6 12 3.6 10.6667 2 8.00002C2.848 6.58669 3.808 5.54802 4.88 4.88402M6.78667 4.12002C7.18603 4.03917 7.59254 3.99897 8 4.00002C10.4 4.00002 12.4 5.33335 14 8.00002C13.556 8.74002 13.0807 9.37802 12.5747 9.91335M2 2L14 14"
                    stroke="#ACB5BB"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {errors.password && (
                <p className="cadastro-error">{errors.password.message}</p>
              )}
            </div>

            {cadastroMutation.isError && (
              <p className="cadastro-error">
                Não foi possível realizar o cadastro.
              </p>
            )}

            <div>
              <button
                type="submit"
                className="cadastro-button"
                disabled={cadastroMutation.isPending}
              >
                {cadastroMutation.isPending ? "Cadastrando..." : "Cadastrar-se"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
