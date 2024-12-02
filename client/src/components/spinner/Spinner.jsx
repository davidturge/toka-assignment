import React from 'react'
import { SpinnerSize } from './constants'
import PropTypes from 'prop-types'
import './Spinner.module.scss'
import styles from './Spinner.module.scss'

const Spinner = ({
    size = SpinnerSize.LARGE,
    loadingLabel = '',
    isFullScreen = true
}) => {
    if (isFullScreen) {
        return (
          <div className={styles['spinner-fullscreen']}>
              <div className={styles[`spinner-${size}`]}>{loadingLabel}</div>
          </div>
        );
    }

    return <div className={styles[`spinner-${size}`]}>{loadingLabel}</div>
};

Spinner.propTypes = {
    size: PropTypes.oneOf(Object.values(SpinnerSize)),
    loadingLabel: PropTypes.string,
    isFullScreen: PropTypes.bool
};

export default Spinner;

