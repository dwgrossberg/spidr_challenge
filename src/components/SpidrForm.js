import React, { useState } from "react";

function SpidrForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    airFryerGuess: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, "");
    return /^(1)?\d{10}$/.test(cleaned);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-format PIN as ####-####-####-####
    if (name === "pin") {
      formattedValue = value
        .replace(/[^0-9]/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1-")
        .slice(0, 19);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid U.S. phone number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "40vw",
          margin: "30vh auto 0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <label className="form-field">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        <label className="form-field">
          <input
            type="text"
            name="lastName"
            className="form-field"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        <label className="form-field">
          <input
            type="tel"
            name="phone"
            className="form-field"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        {errors.phone && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.phone}
          </span>
        )}
        <label className="form-field">
          <input
            type="email"
            name="email"
            className="form-field"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        <label className="form-field">
          <input
            type="number"
            name="airFryerGuess"
            className="form-field"
            placeholder="Guess the Air Fryer’s Cost ($)"
            value={formData.airFryerGuess}
            onChange={handleChange}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        <label className="form-field">
          <input
            type="text"
            name="pin"
            className="form-field"
            placeholder="16-digit Spidr PIN"
            value={formData.pin}
            onChange={handleChange}
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            background: "rgba(69, 147, 162)",
            border: "none",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
            transition: "transform 0.15s ease, background-color 0.15s ease",
            borderRadius: "5px",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SpidrForm;
