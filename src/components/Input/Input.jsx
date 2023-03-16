import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Input = ({ label, type, name, register, errors, validations, className  }) => {
    
    const validationRules = validations.reduce((rules, validation) => {
    const { type, rule } = validation;
    rules[type] = rule;
    return rules;
  }, {});

  return (
    <div className={`form-floating m-1 ${className}` }>
      <input 
        id={name}
        className='form-control fs-1 fw-semiBold'
        type={type} 
        placeholder={label}
        {...register(name, validationRules)}
      />
      {validations.map((validation) => {
          const { type, errorMessege } = validation;
          return (
              errors[name]?.type === type && 
              <ErrorMessage key={type}  message={errorMessege} />
              )
            })}
        <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default Input;

{/* WHEN CALLING INPUT FORMAT
<Input
        label="CONTAINER NUMBER"
        type="text"
        name="jobContainerNumber"
        register={register}
        errors={errors}
        validations={[
          {
            type: 'required',
            rule: true,
            errorMessege: 'is required',
          },
          {
            type: 'pattern',
            rule: /^[A-Z]{4}[0-9]{7}$/,
            errorMessege: 'Please enter a valid container number "ABCD1234567"',
          },
        ]}
      />
 */}
