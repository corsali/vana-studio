import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";
import homeStyles from "styles/Home.module.css";

const Dialog = ({
  title,
  isOpen,
  onClose,
  showCloseButton,
  closeOnOutside = false,
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
      document.body.classList.add("overflow-hidden"); // prevent bg scroll
    } else {
      dialogRef.current.close();
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleClose = () => {
    dialogRef.current.close();
  };

  useEffect(() => {
    dialogRef.current.addEventListener("close", () => {
      onClose();
    });

    if (closeOnOutside) {
      dialogRef.current.addEventListener("click", (e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      });
    }
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialogInner}>
        <h3>{title}</h3>
        {children}

        {showCloseButton && (
          <div className={styles.closeButtonSpace}>
            <button onClick={handleClose} className={homeStyles.outlineButton}>
              Close
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export { Dialog };
