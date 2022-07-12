import React from 'react';

const Input = ({
  text,
  name,
  type,
  onChange,
  value,
  validate,
  error,
  placeholder,
}) => {
  return (
    <div className='row mb-3'>
      <label htmlFor='inputEmail3' className='col-sm-2 col-form-label'>
        {text}
      </label>
      <div className='col-sm-10'>
        <input
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          className='form-control'
          
        />
        {validate && <p className='text-danger'>{error}</p>}
      </div>
    </div>
  );
};

export default Input;
