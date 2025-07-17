import { useState } from "react";

function SpidrForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    airFryerGuess: "",
    pin: "",
  });

  // Set all fields as invalid on page load
  const initialErrors = {
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    airFryerGuess: true,
    pin: true,
  };
  const initialTouched = {
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    airFryerGuess: true,
    pin: true,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, "");
    return /^(1)?\d{10}$/.test(cleaned);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePin = (pin) => {
    return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(pin);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() !== "";
      case "phone":
        return validatePhone(value);
      case "email":
        return validateEmail(value);
      case "airFryerGuess":
        return value.trim() !== "" && !isNaN(Number(value));
      case "pin":
        return validatePin(value);
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "pin") {
      formattedValue = value
        .replace(/[^0-9]/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1-")
        .slice(0, 19);
    }

    setFormData({ ...formData, [name]: formattedValue });

    setErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, formattedValue),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, formData[name]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      airFryerGuess: true,
      pin: true,
    });

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
    }
  };

  const renderValidationIcon = (name) =>
    errors[name] && touched[name] ? (
      <span
        className="form-field-invalid"
        aria-label="Invalid input"
        title="Invalid input"
      ></span>
    ) : (
      <span
        className="form-field-valid"
        aria-label="Valid input"
        title="Valid input"
      ></span>
    );

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
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
          {renderValidationIcon("firstName")}
        </label>
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            name="lastName"
            className="form-field"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
          {renderValidationIcon("lastName")}
        </label>
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="tel"
            name="phone"
            className="form-field"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
          {renderValidationIcon("phone")}
        </label>
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="email"
            name="email"
            className="form-field"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
          {renderValidationIcon("email")}
        </label>
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="number"
            name="airFryerGuess"
            className="form-field"
            placeholder="Guess the Air Fryer’s Cost ($)"
            value={formData.airFryerGuess}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            style={{
              height: "2rem",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "16px",
              width: "100%",
            }}
          />
          {renderValidationIcon("airFryerGuess")}
        </label>
        <label
          className="form-field"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            name="pin"
            className="form-field"
            placeholder="16-digit Spidr PIN"
            value={formData.pin}
            onChange={handleChange}
            onBlur={handleBlur}
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
          {renderValidationIcon("pin")}
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
