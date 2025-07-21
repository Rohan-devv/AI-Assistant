import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [products, setProducts] = useState([]);

  const handleAsk = async () => {
    if (!prompt) return;
    try {
      const res = await axios.post("http://localhost:3000/ask", { prompt });
      console.log("Full Response:", res.data);
      setAnswer(res.data.geminiText);
      setProducts(res.data.suggestions);
    } catch (err) {
      console.error("Error from backend:", err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🧠 AI Product Assistant</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything like 'Suggest phones under 15000'"
            style={styles.input}
          />
          <button onClick={handleAsk} style={styles.button}>
            Ask
          </button>
        </div>

        {answer && (
          <div style={styles.responseCard}>
            <h3 style={styles.subHeading}>Gemini says:</h3>
            <p>{answer}</p>
          </div>
        )}

        {products.length > 0 && (
          <div style={styles.responseCard}>
            <h3 style={styles.subHeading}>Product Suggestions:</h3>
            {products.map((p) => (
              <div key={p.id} style={styles.productItem}>
                <span style={styles.productName}>{p.name}</span>
                <span style={styles.productPrice}>₹{p.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  container: {
    maxWidth: "700px",
    width: "100%",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.08)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#222",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  responseCard: {
    background: "#f9f9f9",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
    marginTop: "20px",
  },
  subHeading: {
    marginBottom: "10px",
    color: "#333",
  },
  productItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  productName: {
    fontWeight: "500",
  },
  productPrice: {
    color: "#16a34a",
    fontWeight: "bold",
  },
};

export default App;
