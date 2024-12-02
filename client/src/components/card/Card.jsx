import React from 'react';
import styles from './Card.module.scss';
import PropTypes from 'prop-types'

const Card = ({
  header,
  content,
  footer,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {
        header && <div className={styles['card-header']}>
          {header}
        </div>
      }
      <div className={styles['card-content']}>
        {content}
      </div>
      {
        footer && <div className={styles['card-footer']}>
          {footer}
        </div>
      }
    </div>
  )
}

export default Card;

Card.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  content: PropTypes.node.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  onMouseEnter:  PropTypes.func,
  onMouseLeave:  PropTypes.func,
};
