import React, { useState } from 'react';

const Form = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({}); // Reset form data after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          {field.type === 'dropdown' ? (
            <select name={field.name} onChange={handleChange} value={formData[field.name] || ''}>
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              value={formData[field.name] || ''}
            />
          )}
          {errors[field.name] && <span className="error">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
