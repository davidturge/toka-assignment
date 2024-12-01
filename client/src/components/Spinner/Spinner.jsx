import React, { useEffect, useState } from 'react';
import { SPINNER_DELAY, SpinnerSize } from './constants';
import PropTypes from 'prop-types';
import './Spinner.module.scss';
import styles from '../Spinner/Spinner.module.scss'

const Spinner = ({
    size = SpinnerSize.SMALL,
    loadingLabel = '',
    isFullScreen = true
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Create a timer to show the spinner after delay, to prevent page blinking.
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, SPINNER_DELAY); // 200ms delay

        // Clean up the timer when the component is unmounted or the spinner props change
        return () => {
            clearTimeout(timer);
            setIsVisible(false);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    if (isFullScreen) {
        return (
          <div className={styles.spinnerFullscreen}>
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

