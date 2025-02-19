"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const response = await fetch("/ministerio/login/api/verifyuser", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await user.getIdToken()}`, // Agrega esta línea si el endpoint requiere un token
        },
        body: JSON.stringify({ uid: user.uid }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server error:", errorData);
        setError("Error en el servidor. Inténtalo de nuevo más tarde.");
        return;
      }
  
      const data = await response.json();
      if (data.message === "Usuario verificado") {
        router.push("/ministerio/admin");
      } else {
        setError("Usuario no autorizado");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "0.5rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "1rem",
    textAlign: "center" as const,
  },
};