import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";
import homeStyles from "styles/Home.module.css";

const Dialog = ({
  title,
  isOpen,
  onClose,
  showCloseButton,
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // We want to use the dialog as a modal. It's not possible to use both the open attribute and the showModal() method to open a <dialog> element, because the open attribute controls the visibility of the dialog, and when it's true, the showModal() method can't be invoked. So we need to set the open attribute to false before calling showModal(). Learn more: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
      dialogRef.current.open = false;
      dialogRef.current.showModal();
      document.body.classList.add("overflow-hidden"); // prevent bg scroll
    } else {
      dialogRef.current.close();
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      // onCancel={handleClose}
      onClick={showCloseButton ? handleClose : null}
      className={styles.dialog}
    >
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
