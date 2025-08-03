import Modal from 'react-modal';
import styles from './QuoteModal.module.scss';
import { TfiClose } from 'react-icons/tfi';

Modal.setAppElement('#root');

function QuoteModal({ isOpen, quote, onClose }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        closeTimeoutMS={300}
        className={{
          base: styles.modal,
          afterOpen: styles.modalAfterOpen,
          beforeClose: styles.modalBeforeClose,
        }}
        overlayClassName={{
          base: styles.overlay,
          afterOpen: styles.overlayAfterOpen,
          beforeClose: styles.overlayBeforeClose,
        }}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {quote && (
          <>
            <h3>{quote.author}</h3>
            <blockquote>"{quote.quote}"</blockquote>
            <p>Source: {quote.source}</p>
            <TfiClose onClick={onClose} className={styles["button-modal"]}/>
          </>
        )}
      </Modal>
    </>
  );
}

export default QuoteModal;
