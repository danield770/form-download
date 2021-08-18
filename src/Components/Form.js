import React from 'react';
import ValidationMessage from './ValidationMessage';

// function validateInputs() {

// }

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    // validateInputs();
    setValidation({
      ...validation,
      name: nameRef.current.value.length > 0,
      company: companyRef.current.value.length > 0,
      phone: phoneRef.current.value.length > 0,
      email:
        mailRef.current.value.length > 0 &&
        /^\S+@\S+\.\S+$/.test(mailRef.current.value),
      privacy: validation.privacy === 'off' ? 'error' : 'on',
    });
  }
  function handlePrivacy() {
    setValidation({
      ...validation,
      privacy: validation.privacy === 'off' ? 'on' : 'off',
    });
  }
  const [validation, setValidation] = React.useState({
    name: 'false',
    company: 'false',
    phone: 'false',
    email: 'false',
    privacy: 'off',
  });
  const nameRef = React.useRef(null);
  const companyRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const mailRef = React.useRef(null);
  const privacyRef = React.useRef(null);
  return (
    <section className='form'>
      <h3>Want to get the full version?</h3>
      <div>Fill in the form below</div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Full name' ref={nameRef} />
        {!validation.name && <ValidationMessage />}
        <input
          type='text'
          name=''
          placeholder='Company name'
          ref={companyRef}
        />
        {!validation.company && <ValidationMessage />}
        <input type='tel' name='phone' placeholder='Phone' ref={phoneRef} />
        {!validation.phone && <ValidationMessage />}
        <input type='email' placeholder='Work email' ref={mailRef} />
        <button>Download now &gt;&gt;</button>

        <div className='privacy'>
          <input
            className='cb'
            type='checkbox'
            id='privacy'
            ref={privacyRef}
            onChange={handlePrivacy}
          />
          <label
            htmlFor='privacy'
            className={`${validation.privacy === 'error' ? 'error' : ''}`}
          >
            I agree to the privacy policy including for Joonko to use my contact
            details to contact me for marketing purposes.
          </label>
        </div>
      </form>
    </section>
  );
}

export default Form;
