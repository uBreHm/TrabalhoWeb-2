import PropTypes from 'prop-types';
import styles from '../styles/message.module.css';

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
