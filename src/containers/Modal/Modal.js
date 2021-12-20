import React, { useRef, useEffect } from 'react';
import './modal.scss';

const Modal = ({ modalOpen, toggleOpen, title, children, footer }) => {
    const ref = useRef(null);

    const closeModal = (e) => {
        if (ref.current === e.target) {
            toggleOpen(false);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27) {
                toggleOpen(false);
            }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    },[]);

    return (
        <>
            <div
                className="modal-bg"
                style={{
                    backgroundColor: "rgba(0,0,0,0.75)",
                    display: `${modalOpen ? "block" : "none"}`
                }}
                onClick={closeModal}
            >
                <div className="modal-body-container" ref={ref}>
                    <div className="modal-content">
                        <div className="modal-title">
                            {title}
                            <button
                                className="modal-close-btn"
                                onClick={() => toggleOpen(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
