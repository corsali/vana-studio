import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

const Dialog = ({
  title,
  isOpen,
  onClose,
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

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={onClose}
      className={styles.dialog}
    >
      <div className={styles.dialogInner}>
        <h3>{title}</h3>
        {children}
      </div>
    </dialog>
  );
};

export { Dialog };
