import { useState } from "react";
import { supabase } from "./lib/supabase";
import logo from "./assets/EliteMed_flat 3.svg";
import resetImage from "./assets/reset_password.svg";
import "./App.css";

type Page = "login" | "signup" | "forgot";

function App() {
  const [page, setPage] = useState<Page>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function changePage(newPage: Page) {
    setPage(newPage);
    setMessage("");
    setError("");
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
    }
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Connexion réussie !");
    }

    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.session) {
      setMessage("Votre compte a été créé avec succès !");
    } else {
      setMessage(
        "Compte créé. Vérifiez votre e-mail pour confirmer votre inscription.",
      );
    }

    setLoading(false);
  }

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Un lien de réinitialisation a été envoyé à votre e-mail.");
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setMessage("Vous êtes déconnecté.");
  }

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-card">
          <img className="auth-logo" src={logo} alt="EliteMed" />

          {page === "login" && (
            <>
              <h1>Connexion à votre espace académique</h1>
              <p className="subtitle">
                Accédez à vos modules, annales d’épreuves et ressources
                pédagogiques validées.
              </p>

              <form onSubmit={handleLogin}>
                <label>Adresse e-mail *</label>
                <input
                  type="email"
                  placeholder="etudiant@etud.univ.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Mot de passe *</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>
                </div>

                <div className="form-options">
                  <label className="remember">
                    <input type="checkbox" />
                    Reste connecté
                  </label>

                  <button
                    type="button"
                    className="text-button"
                    onClick={() => changePage("forgot")}
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <button className="primary-button" disabled={loading}>
                  {loading ? "Connexion..." : "Se connecter"}
                </button>
              </form>

              <div className="separator">OU CONTINUER AVEC</div>

              <button
                className="google-button"
                type="button"
                onClick={handleGoogleLogin}
              >
                <span className="google-letter">G</span>
                Continuer avec Google
              </button>

              <p className="bottom-text">
                Vous n'avez pas encore de compte ?{" "}
                <button
                  className="text-button"
                  onClick={() => changePage("signup")}
                >
                  Créer un compte étudiant →
                </button>
              </p>
            </>
          )}

          {page === "signup" && (
            <>
              <h1>Créez votre espace académique</h1>
              <p className="subtitle">
                Rejoignez la plateforme et accédez à vos modules, annales
                d’épreuves et ressources pédagogiques validées.
              </p>

              <form onSubmit={handleSignup}>
                <label>Nom complet *</label>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <label>Adresse e-mail académique ou personnelle *</label>
                <input
                  type="email"
                  placeholder="etudiant@etud.univ.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Numéro de téléphone *</label>
                <input
                  type="tel"
                  placeholder="+213"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label>Mot de passe *</label>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />

                <label>Confirmer le mot de passe *</label>
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />

                <button className="primary-button" disabled={loading}>
                  {loading ? "Création..." : "Créer un compte"}
                </button>
              </form>

              <p className="bottom-text">
                Vous avez déjà un compte ?{" "}
                <button
                  className="text-button"
                  onClick={() => changePage("login")}
                >
                  Connectez-vous
                </button>
              </p>
            </>
          )}

          {page === "forgot" && (
            <>
              <img
                className="reset-image"
                src={resetImage}
                alt="Réinitialisation du mot de passe"
              />

              <h1>Réinitialisation du mot de passe</h1>
              <p className="subtitle">
                Entrez votre adresse e-mail pour recevoir un lien de
                réinitialisation.
              </p>

              <form onSubmit={handleForgotPassword}>
                <label>Adresse e-mail *</label>
                <input
                  type="email"
                  placeholder="etudiant@etud.univ.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button className="primary-button" disabled={loading}>
                  {loading
                    ? "Envoi..."
                    : "Envoyer le lien de réinitialisation →"}
                </button>
              </form>

              <p className="bottom-text">
                <button
                  className="text-button"
                  onClick={() => changePage("login")}
                >
                  ← Retour à la page de connexion
                </button>
              </p>
            </>
          )}

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {message === "Connexion réussie !" && (
            <button className="logout-button" onClick={handleLogout}>
              Se déconnecter
            </button>
          )}
        </div>
      </div>

      <div className="auth-blue-panel" />
    </div>
  );
}

export default App;
