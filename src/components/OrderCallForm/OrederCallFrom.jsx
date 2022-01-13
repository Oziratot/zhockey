import React, {
  memo, useCallback, useRef, useState,
} from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import PropTypes from 'prop-types';
import axios from 'axios';
import { stringify } from 'qs';
import useYMetrika from '../../utils/hooks/useYMetrika';
import useGTag from '../../utils/hooks/useGTag';
import useFbPixel from '../../utils/hooks/useFbPixel';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле обязательно'),
  phone: Yup.string().min(8, 'Телефон состоит минимум из 8 символов').matches(/^[\s\d-+()]*$/g, 'Телефон должен состоять только из цифр').required('Поле обязательно'),
  comment: Yup.string(),
});

const PhoneInputComponent = function ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  const handleChange = useCallback((value) => {
    field.onChange({
      target: {
        name: field.name,
        value,
      },
    });
  }, []);

  return (
    <PhoneInput
      {...field}
      {...props}
      preferredCountries={['ru', 'by', 'kz']}
      country="ru"
      localization={ru}
            // type="tel"
            // mask="+{7} (000) 000-00-00"
      onChange={handleChange}
    />
  );
};

const OnlyTextInputComponent = function ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {
  const handleChange = useCallback((e) => {
    const { name, onChange } = field;
    const value = e.target.value.replace(/[^A-Za-zА-Яа-я\s-.]/ig, '');
    onChange({ target: { name, value } });
  }, []);

  return (
    <input type="text" {...field} onChange={handleChange} {...props} />
  );
};

const OrderCallFrom = function ({ clientWindowWidth, handleModalClose }) {
  const [successfullySent, setSuccessfullySent] = useState(false);
  const formRef = useRef(null);
  const firstNameRef = useRef('');
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const topic = 'Закажите бесплатную консультацию';
  const handleSubmit = useCallback((values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting || successfullySent) return;

    const safeValues = { ...values, topic };

    if (formRef.current['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'].checked) {
      safeValues['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] = 1;
    }

    firstNameRef.current = values.firstName;

    axios.post('/feedback-form.php', stringify(safeValues), { 'Content-Type': 'application/x-www-form-urlencoded', headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(() => {
        ym('reachGoal', 'FORM_FIRST_STEP_SUBMITTED');
        gtag('event', 'FORM_FIRST_STEP_SUBMITTED');
        fbq('track', 'FORM_FIRST_STEP_SUBMITTED');
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
    handleModalClose();
  }, [successfullySent]);

  return (
    <div className="order-call-form">
      {!successfullySent && (
        <Formik
          initialValues={{ firstName: '', phone: '', comment: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({
            handleSubmit, handleReset, handleChange, handleBlur, values, errors, touched, isValid, isSubmitting,
          }) => (
            <form className="feedback-form" onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
              <div className="form-row">
                <div className="field-wrap width-50">
                  <Field name="firstName" component={OnlyTextInputComponent} placeholder="Ваше имя" className={classnames({ invalid: errors.firstName && touched.firstName })} />
                  <ErrorMessage name="firstName" component="div" className="field-error" />
                </div>
                <div className="field-wrap width-50">
                  <Field name="phone" component={PhoneInputComponent} placeholder="Телефон" className={classnames({ invalid: errors.phone && touched.phone })} />
                  <ErrorMessage name="phone" component="div" className="field-error" />
                </div>
              </div>

              <div className="form-row">
                <div className="field-wrap">
                  <textarea
                    rows="1"
                    name="comment"
                    onChange={(e) => {
                                handleChange(e);
                              }}
                    onBlur={handleBlur}
                    placeholder="Комментарий"
                    value={values.comment}
                  />
                  <ErrorMessage name="comment" component="div" className="field-error" />
                </div>
              </div>

              <input type="checkbox" name="gha-a-n-t-i-s-p-a-m-f-i-e-l-d" value="1" style={{ display: 'none' }} tabIndex="-1" autoComplete="none" />

              <div className="form-row consent-and-submit">
                {clientWindowWidth < 900 && (
                <button
                  className="form-button button-orange"
                  disabled={!isValid || successfullySent}
                  type="submit"
                >
                  Записаться
                </button>
                    )}
                <div className="consent-personal-data-processing">
                  <span>Нажимая на кнопку, вы даете согласие на обработку </span>
                  <Link href="/legal/agreement">
                    <a onClick={handleModalClose} className="blue-link">персональных&nbsp;данных</a>
                  </Link>
                </div>
                {clientWindowWidth >= 900 && (
                <button
                  className="form-button button-orange"
                  disabled={!isValid || successfullySent}
                  type="submit"
                >
                  Записаться
                </button>
                    )}
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

OrderCallFrom.propTypes = {
  topic: PropTypes.string,
  firstSubmitLabel: PropTypes.string,
  secondSubmitLabel: PropTypes.string,
};

OrderCallFrom.defaultProps = {
  topic: 'Закажите бесплатную консультацию',
  firstSubmitLabel: 'Заказать',
  secondSubmitLabel: 'Отправить',
};

export default memo(OrderCallFrom);
