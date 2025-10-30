import React, { useState, useEffect } from "react";
import successSound from "../assets/success.mp3";
import summitSound from "../assets/summit.wav"; // ✅ renamed for clarity

function AddressForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in animation when component loads
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // 🎵 Play submit sound immediately on button click
  const playSubmitSound = () => {
    const audio = new Audio(summitSound);
    audio.play().catch((error) => {
      console.error("Submit sound playback failed:", error);
    });
  };

  // 🎵 Play success sound after validation
  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play().catch((error) => {
      console.error("Success sound playback failed:", error);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    playSubmitSound(); // ✅ plays instantly when submit button is clicked

    // ✅ Validation checks
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("⚠️ Please fill out all fields!");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("📞 Phone number must be 10 digits!");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("📮 Pincode must be 6 digits!");
      return;
    }

    // ✅ Play success sound
    playSuccessSound();

    // ✅ Show success message
    setSubmitted(true);
  };

  return (
    <div style={styles.animatedBackground}>
      <div style={styles.overlay}>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              ...styles.form,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <h1 style={styles.heading}>🏠 Shipping Address</h1>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="street"
              placeholder="Street Address"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Submit Address
            </button>
          </form>
        ) : (
          <div style={styles.successBox}>
            <h2>✅ Address Saved Successfully!</h2>
            <p>Thank you, {formData.fullName}! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 🌈 Animated Background Styles
const styles = {
  animatedBackground: {
    background: "linear-gradient(-45deg, #87CEFA, #B0E0E6, #ADD8E6, #E0FFFF)",
    backgroundSize: "400% 400%",
    animation: "gradientAnimation 10s ease infinite",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#1e3a8a",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid gray",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  successBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
};

// 🌀 Keyframes for animated background
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
document.head.appendChild(styleSheet);

export default AddressForm;
