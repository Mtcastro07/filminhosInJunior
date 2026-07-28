import { useForm } from "react-hook-form";
import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(9, "A senha deve possuir no mínimo 9 characters"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export default function Login() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const [mostrar, setMostrar] = useState(false);

  function createUser(data: CreateUserSchema) {
    console.log(data);
    reset();
  }

  const titulo = "Fil{IN}hos";
  return (
    <>
      <div className="login-infos">
        <div>
          <h1 className="login-title">{titulo}</h1>
        </div>
        <div className="login-container">
          <h3>Login</h3>
          <div className="login-register">
            <p className="p-register">Não possui uma conta?</p>
            <p>
              <Link to="/Cadastro" className="register">
                Cadastre-se
              </Link>
            </p>
          </div>

          <form className="form" onSubmit={handleSubmit(createUser)}>
            <div>
              <label className="input-label">Email</label>
              <br />
              <input
                type="email"
                placeholder="Insira seu e-mail"
                {...register("email")}
                className="form-input"
              ></input>
            </div>
            <div>
              <label className="input-label">Senha</label>
              <br />
              <div className="password-input">
                <input
                  type={mostrar ? "text" : "password"}
                  placeholder="Insira sua senha"
                  {...register("password")}
                  className="form-input"
                ></input>
                <svg
                  onClick={() => setMostrar(!mostrar)}
                  className="display-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.70673 5.70797C5.45672 5.95807 5.3163 6.29724 5.31637 6.65087C5.31643 7.0045 5.45697 7.34362 5.70707 7.59363C5.95717 7.84364 6.29634 7.98406 6.64997 7.984C7.0036 7.98394 7.34272 7.8434 7.59273 7.5933M9.77069 9.76538C8.83552 10.3505 7.75313 10.6573 6.65002 10.65C4.25002 10.65 2.25002 9.31671 0.650024 6.65004C1.49802 5.23671 2.45802 4.19804 3.53002 3.53404M5.43669 2.77004C5.83605 2.6892 6.24257 2.64899 6.65002 2.65004C9.05002 2.65004 11.05 3.98338 12.65 6.65004C12.206 7.39004 11.7307 8.02804 11.2247 8.56338M0.650024 0.650024L12.65 12.65"
                    stroke="#ACB5BB"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="stay-forget">
              <div className="stay-connected">
                <input className="checkbox-style" type="checkbox" />
                <p>Mantenha-me conectado</p>
              </div>
              <div className="forget-password">Esqueceu a senha?</div>
            </div>
            <div>
              <button type="submit" className="form-button">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
