import React from 'react'
import { ArrowCircleLeft, House } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useShowBackButton } from '../../store/navigationStore'
import styles from './Navigation.module.scss'

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
                <a><ArrowCircleLeft size={40} onClick={() => navigate(-1)}/></a>
              </li>
            ) : (
              <li>
                <House size={32} />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navigation;
