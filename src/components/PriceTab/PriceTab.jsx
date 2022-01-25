import React from 'react';

const PriceTab = function ({
  type, format, duration, list, price, note, orderCallClick,
}) {
  return (
    <div className="pricetab">
      <div className="pricetab-type">{type}</div>
      <div className="pricetab-info">
        <div className="pricetab-format">{format}</div>
        {duration && <div className="pricetab-duration">{duration}</div>}
        <ul className="pricetab-items">
          {list.map((item) => (
            <li key={item} className="pricetab-item">{item}</li>
          ))}
        </ul>
        <div className="pricetab-price">{`${price} `}<span className="rub">Р</span></div>
        {note && <div className="pricetab-note">{`${note} `}<span className="rub-small">Р</span></div> }
      </div>
      <button type="button" onClick={orderCallClick} className="pricetab-btn">Записаться</button>
    </div>
  );
};

export default PriceTab;
