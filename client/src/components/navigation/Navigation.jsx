import React from 'react'
import styles from './Navigation.module.scss';
import { NavLink, useNavigate } from 'react-router-dom'
import { useShowBackButton } from '../../store/navigationStore'

const Navigation = () => {
  const navigate = useNavigate();
  const showBackButton = useShowBackButton();

  return (
    <div>
      <header className={styles['navbar']}>
        <nav className={styles['nav-wrapper']}>
          <ul>
            {showBackButton ? (
              <li>
                <a
                  className={styles['back-button']}
                  onClick={() => navigate(-1)}>
                  Back
                </a>
              </li>
            ) : (
              <li>
                <NavLink to="/">Projects</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navigation;
