import React from "react";
import { useForm } from "react-hook-form";
import "./DynamicForm.css";

const DynamicForm = ({
  schema,
  onSubmit,
  submitText = "Submit",
  layout = "single-column",
  className = "",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  const renderField = (field) => {
    const {
      name,
      type,
      label,
      placeholder,
      options,
      validation = {},
      grid = {},
      className: fieldClassName = "",
    } = field;

    const fieldStyle = {
      gridColumn: grid.column || "auto",
      gridRow: grid.row || "auto",
      width: grid.width || "100%",
    };

    const baseFieldProps = {
      ...register(name, validation),
      id: name,
      className: `form-field ${fieldClassName}`,
      placeholder: placeholder || label,
    };

    const renderInput = () => {
      switch (type) {
        case "text":
        case "email":
        case "password":
        case "number":
        case "tel":
        case "url":
          return <input type={type} {...baseFieldProps} />;

        case "textarea":
          return <textarea {...baseFieldProps} rows={field.rows || 4} />;

        case "select":
          return (
            <select {...baseFieldProps}>
              <option value="">Select {label}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case "radio":
          return (
            <div className="radio-group">
              {options?.map((option) => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    {...register(name, validation)}
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          );

        case "checkbox":
          return (
            <div className="checkbox-group">
              {options?.map((option) => (
                <label key={option.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    {...register(name, validation)}
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          );

        case "date":
          return <input type="date" {...baseFieldProps} />;

        case "file":
          return (
            <input
              type="file"
              {...baseFieldProps}
              accept={field.accept}
              multiple={field.multiple}
            />
          );

        default:
          return <input type="text" {...baseFieldProps} />;
      }
    };

    return (
      <div
        key={name}
        className={`form-group ${fieldClassName}`}
        style={fieldStyle}
      >
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
            {validation.required && <span className="required">*</span>}
          </label>
        )}
        {renderInput()}
        {errors[name] && (
          <span className="error-message">{errors[name].message}</span>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`dynamic-form ${layout} ${className}`}
    >
      <div className="form-fields">{schema.map(renderField)}</div>
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? "Submitting..." : submitText}
        </button>
        <button type="button" onClick={() => reset()} className="reset-btn">
          Reset
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
