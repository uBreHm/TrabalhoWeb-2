// src/components/Message.js
import styles from '../styles/message.module.css';
import PropTypes from 'prop-types';

const Message = ({ type, message }) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {message}
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  message: PropTypes.string.isRequired
};

export default Message;
