/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useContactsMap from '../../utils/hooks/useContactsMap';
// import GHALogo from '../../assets/svg/logo.svg';

function MapModal({ onClose }) {
    const mapRef = useRef();

    useLayoutEffect(() => {
        window.document.body.classList.add('_modal-active');
        return () => window.document.body.classList.remove('_modal-active');
    }, []);
    useContactsMap(mapRef);

    return (
        <div className="contacts-map-modal">
            {/*<GHALogo className="modal-gha-logo" />*/}
            <button type="button" className="modal-close-btn" onClick={onClose} />
            <div className="modal-map" ref={mapRef} />
        </div>
    );
}

MapModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default memo(MapModal);
