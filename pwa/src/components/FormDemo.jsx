import React, { useState } from "react";
import DynamicForm from "./DynamicForm";
import "./FormDemo.css";

const FormDemo = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [activeDemo, setActiveDemo] = useState("contact");

  const handleFormSubmit = (data, reset) => {
    console.log("Form submitted:", data);
    setSubmittedData(data);
    setTimeout(() => {
      reset();
      setSubmittedData(null);
    }, 3000);
  };

  const contactFormSchema = [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      validation: {
        required: "First name is required",
        minLength: { value: 2, message: "Minimum 2 characters" },
      },
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      validation: {
        required: "Last name is required",
        minLength: { value: 2, message: "Minimum 2 characters" },
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Tell us about your project...",
      rows: 5,
      validation: {
        required: "Message is required",
        minLength: {
          value: 10,
          message: "Message must be at least 10 characters",
        },
      },
    },
  ];

  const movieFormSchema = [
    {
      name: "title",
      type: "text",
      label: "Movie Title",
      placeholder: "Enter movie title",
      validation: { required: "Title is required" },
      grid: { column: "1 / 3" },
    },
    {
      name: "releaseDate",
      type: "date",
      label: "Release Date",
      validation: { required: "Release date is required" },
    },
    {
      name: "rating",
      type: "select",
      label: "Rating",
      options: [
        { value: "G", label: "G - General Audiences" },
        { value: "PG", label: "PG - Parental Guidance" },
        { value: "PG-13", label: "PG-13 - Parents Strongly Cautioned" },
        { value: "R", label: "R - Restricted" },
        { value: "NC-17", label: "NC-17 - Adults Only" },
      ],
      validation: { required: "Rating is required" },
    },
    {
      name: "genres",
      type: "checkbox",
      label: "Genres",
      options: [
        { value: "action", label: "Action" },
        { value: "comedy", label: "Comedy" },
        { value: "drama", label: "Drama" },
        { value: "horror", label: "Horror" },
        { value: "romance", label: "Romance" },
        { value: "sci-fi", label: "Sci-Fi" },
      ],
      grid: { column: "1 / 3" },
    },
    {
      name: "director",
      type: "text",
      label: "Director",
      placeholder: "Director name",
    },
    {
      name: "duration",
      type: "number",
      label: "Duration (minutes)",
      placeholder: "120",
    },
    {
      name: "synopsis",
      type: "textarea",
      label: "Synopsis",
      placeholder: "Movie synopsis...",
      rows: 4,
      grid: { column: "1 / 3" },
    },
    {
      name: "poster",
      type: "file",
      label: "Movie Poster",
      accept: "image/*",
      grid: { column: "1 / 3" },
    },
  ];

  const surveyFormSchema = [
    {
      name: "age",
      type: "radio",
      label: "Age Group",
      options: [
        { value: "18-25", label: "18-25" },
        { value: "26-35", label: "26-35" },
        { value: "36-45", label: "36-45" },
        { value: "46-55", label: "46-55" },
        { value: "55+", label: "55+" },
      ],
      validation: { required: "Age group is required" },
    },
    {
      name: "experience",
      type: "select",
      label: "Experience Level",
      options: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "expert", label: "Expert" },
      ],
    },
    {
      name: "interests",
      type: "checkbox",
      label: "Areas of Interest",
      options: [
        { value: "frontend", label: "Frontend Development" },
        { value: "backend", label: "Backend Development" },
        { value: "mobile", label: "Mobile Development" },
        { value: "devops", label: "DevOps" },
        { value: "design", label: "UI/UX Design" },
        { value: "data", label: "Data Science" },
      ],
    },
    {
      name: "feedback",
      type: "textarea",
      label: "Additional Feedback",
      placeholder: "Any additional comments...",
      rows: 3,
    },
  ];

  const getFormConfig = () => {
    switch (activeDemo) {
      case "contact":
        return {
          schema: contactFormSchema,
          layout: "two-column",
          title: "Contact Form",
          description: "A responsive contact form with validation",
        };
      case "movie":
        return {
          schema: movieFormSchema,
          layout: "two-column",
          title: "Movie Registration",
          description: "Complex form with custom grid positioning",
        };
      case "survey":
        return {
          schema: surveyFormSchema,
          layout: "single-column",
          title: "Developer Survey",
          description: "Survey form with radio buttons and checkboxes",
        };
      default:
        return {
          schema: contactFormSchema,
          layout: "two-column",
          title: "Contact Form",
          description: "A responsive contact form with validation",
        };
    }
  };

  const formConfig = getFormConfig();

  return (
    <div className="form-demo">
      <div className="demo-header">
        <h2>Dynamic Form Component Demo</h2>
        <p>
          Showcase of a flexible React form component built with react-hook-form
        </p>
      </div>

      <div className="demo-tabs">
        <button
          className={activeDemo === "contact" ? "active" : ""}
          onClick={() => setActiveDemo("contact")}
        >
          Contact Form
        </button>
        <button
          className={activeDemo === "movie" ? "active" : ""}
          onClick={() => setActiveDemo("movie")}
        >
          Movie Form
        </button>
        <button
          className={activeDemo === "survey" ? "active" : ""}
          onClick={() => setActiveDemo("survey")}
        >
          Survey Form
        </button>
      </div>

      <div className="demo-content">
        <div className="form-section">
          <h3>{formConfig.title}</h3>
          <p>{formConfig.description}</p>

          <DynamicForm
            schema={formConfig.schema}
            onSubmit={handleFormSubmit}
            layout={formConfig.layout}
            submitText={`Submit ${formConfig.title}`}
          />
        </div>

        {submittedData && (
          <div className="submission-result">
            <h4>Form Submitted Successfully!</h4>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="demo-features">
        <h3>Features Demonstrated</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Field Types</h4>
            <ul>
              <li>Text, Email, Password, Number</li>
              <li>Textarea, Select, Date, File</li>
              <li>Radio buttons, Checkboxes</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>Layout Control</h4>
            <ul>
              <li>Single, Two, Three column layouts</li>
              <li>Custom grid positioning</li>
              <li>Responsive design</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>Validation</h4>
            <ul>
              <li>Required field validation</li>
              <li>Pattern matching (email, etc.)</li>
              <li>Custom validation rules</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>User Experience</h4>
            <ul>
              <li>Real-time error messages</li>
              <li>Loading states</li>
              <li>Form reset functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDemo;
