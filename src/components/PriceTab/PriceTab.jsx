import React from 'react';
import Button from '../Button/Button';

const PriceTab = function ({
  type, days, items, price, orderCallClick,
}) {
  return (
    <div className="pricetab">
      <div className="text-xl pricetab-title" dangerouslySetInnerHTML={{ __html: type }} />
      <div className="pricetab-body">
        <div className="body-wrap">
          <div className="text-m centered days" dangerouslySetInnerHTML={{ __html: days }} />
          <ul className="pricetab-items">
            {items.map((item) => (
              <li key={item} className="pricetab-item">
                <div className="text-m" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <p className="text-xl bold price">{`${price} ₽`}</p>
        </div>
        <Button className="pricetab-btn" onClick={orderCallClick}>Забронировать</Button>
      </div>
    </div>
  );
};

export default PriceTab;
