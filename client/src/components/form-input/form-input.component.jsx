import "./form-input.styles.scss";

export const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="input-group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? <label className={`form-input-label`}>{label}</label> : null}
    </div>
  );
};