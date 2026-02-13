// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select an image ❌");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("image", image);

//     // 🔍 debug (optional)
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       setLoading(true);
//       await axios.post(
//         "http://localhost:8080/api/products",
//         formData
//       );
//       alert("Product added successfully ✅");

//       // reset form
//       setName("");
//       setPrice("");
//       setCategory("");
//       setImage(null);
//       e.target.reset();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Add Product</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Product name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "40px auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     background: "#fafafa",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
// };
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            style={styles.input}
          />

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: 0 }}
            />
            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <select
            name="role"
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">User</option>
            <option value="superadmin">Super Admin</option>
          </select>

          <button type="submit" style={styles.button}>
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  passwordWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  eye: {
    position: "absolute",
    right: "10px",
    top: "8px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
