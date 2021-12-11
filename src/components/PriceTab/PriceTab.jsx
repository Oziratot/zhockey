import React from 'react';

function PriceTab({ type, format, duration, list, price, note }) {
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
                <div className="pricetab-price">{price}</div>
                {note && <div className="pricetab-note">{note}</div> }
            </div>
            <button className="pricetab-btn">Записаться</button>
        </div>
    )
}

export default PriceTab;
