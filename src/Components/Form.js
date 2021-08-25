import React, { useState, useEffect } from 'react';
import ValidationMessage from './ValidationMessage';
import useFetch from '../hooks/useFetch';

function Form() {
  const initialState = { url: '', method: '', headers: {}, body: {} };
  const [fetchObject, setFetchObject] = useState(initialState);
  const { data, statusCode } = useFetch(fetchObject);
  const [validation, setValidation] = React.useState({
    name: 'false',
    company: 'false',
    phone: 'false',
    email: 'false',
    privacy: 'false',
  });
  const nameRef = React.useRef(null);
  const companyRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const mailRef = React.useRef(null);
  const privacyRef = React.useRef(null);

  const BASEURL =
    'https://desolate-ridge-21792.herokuapp.com/https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/';

  useEffect(() => {
    validation.name &&
      validation.company &&
      validation.phone &&
      validation.email &&
      validation.privacy &&
      setFetchObject({
        url: `${BASEURL}data`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_X_API_KEY,
        },
        body: {
          name: nameRef.current.value,
          company_name: companyRef.current.value,
          email: mailRef.current.value,
          phone: phoneRef.current.value,
        },
      });
  }, [validation]);

  console.log('data: ', data);
  data?.id && fetchObject.method && requestLink();
  if (data?.link) {
    console.log('link: ', data.link);
    let a = Object.assign(document.createElement('a'), {
      href: data.link,
      style: 'display: none',
      download: 'joonkoDiversity.pdf',
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  if (statusCode === 404) {
    console.log('statusCode: 404');
    window.location = 'http://www.joonko.co';
  }
  function requestLink() {
    console.log('requestLink');
    setFetchObject({
      url: `${BASEURL}file?id=${data.id}`,
      headers: { 'x-api-key': process.env.REACT_APP_X_API_KEY },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setValidation({
      name: nameRef.current.value.length > 0,
      company: companyRef.current.value.length > 0,
      phone: phoneRef.current.value.length > 0,
      email:
        mailRef.current.value.length > 0 &&
        /^\S+@\S+\.\S+$/.test(mailRef.current.value),
      privacy: privacyRef.current.checked,
    });
  }

  return (
    <section className='form'>
      <h3>Want to get the full version?</h3>
      <div>Fill in the form below</div>
      <form onSubmit={handleSubmit} noValidate>
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
        {!validation.email && <ValidationMessage />}
        <button>Download now &gt;&gt;</button>

        <div className='privacy'>
          <input className='cb' type='checkbox' id='privacy' ref={privacyRef} />
          <label
            htmlFor='privacy'
            className={`${!validation.privacy ? 'error' : ''}`}
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
