import React, { useRef, useState } from 'react';
import './modal.css';

const Modal = ({ title, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef(null);

    const closeModal = (e) => {
        if (ref.current === e.target) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>{title}</button>
            <div
                className={`modal-bg`}
                style={{
                    backgroundColor: "rgba(0,0,0,0.75)",
                    display: `${isModalOpen ? "block" : "none"}`
                }}
                onClick={closeModal}
            >
                <div className={"modal-body-container"} ref={ref}>
                    <div className={"modal-content"}>
                        <button
                            className={"modal-close-btn"}
                            onClick={() => setIsModalOpen(false)}
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
