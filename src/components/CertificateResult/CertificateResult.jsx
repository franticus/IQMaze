import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import s from './CertificateResult.module.scss';
import certificate from '../../img/certificate_empty.png';
import html2canvas from 'html2canvas';

const CertificateResult = ({
  userName,
  iqValue,
  date,
  handleUserNameChange,
  handleUserNameSubmit,
  tempUserName,
}) => {
  const certificateRef = useRef();
  const [fontSize, setFontSize] = useState({
    name: '1rem',
    iq: '2rem',
    iqText: '2rem',
    date: '1rem',
  });

  const updateFontSize = useCallback(() => {
    const certificateWidth = certificateRef?.current?.offsetWidth;
    console.log('certificateWidth:', certificateWidth); // Debugging line
    if (certificateWidth) {
      setFontSize({
        name: `${certificateWidth / 20}px`,
        iq: `${certificateWidth / 14}px`,
        iqText: `${certificateWidth / 30}px`,
        date: `${certificateWidth / 40}px`,
      });
    }
  }, []);

  useLayoutEffect(() => {
    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, [updateFontSize]);

  const downloadCertificate = () => {
    html2canvas(certificateRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificate.png';
      link.click();
    });
  };

  return (
    <div className={s.certificateContainer}>
      <div className={s.certificate} ref={certificateRef}>
        <img src={certificate} alt='certificate' className={s.heroImage} />
        <div className={s.certificate_name} style={{ fontSize: fontSize.name }}>
          {userName}
        </div>
        <div className={s.certificate_iq} style={{ fontSize: fontSize.iq }}>
          {iqValue}
        </div>
        <div
          className={s.certificate_iqText}
          style={{ fontSize: fontSize.iqText }}
        >
          IQ
        </div>
        <div className={s.certificate_date} style={{ fontSize: fontSize.date }}>
          {date}
        </div>
      </div>
      <div className={s.nameInputContainer}>
        <input
          type='text'
          value={tempUserName}
          onChange={handleUserNameChange}
          className={s.nameInput}
          placeholder='Name and Surname'
        />
        <button onClick={handleUserNameSubmit} className={s.submitButton}>
          Update Name
        </button>
      </div>
      <button onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default CertificateResult;
