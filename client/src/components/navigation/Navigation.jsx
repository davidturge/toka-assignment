import React from 'react'
import { ArrowCircleLeft, PlusSquare } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useCreateItemHandler, useShowBackButton } from '../../store/navigationStore'
import styles from './Navigation.module.scss'
import Search from '../search/Search'

const Navigation = () => {
  const navigate = useNavigate();
  const showBackButton = useShowBackButton();
  const createItemHandler = useCreateItemHandler();

  return (
    <header className={styles['header']}>
      <div className={styles['navbar-wrapper']}>
        <nav className={styles['navbar']}>
          <ul>
            {showBackButton ? (
              <li>
                <a><ArrowCircleLeft size={40} onClick={() => navigate(-1)}/></a>
              </li>
            ) : (
              <li>
                <span className={styles['logo']}>Toka</span>
              </li>
            )}
          </ul>
        </nav>
        <div className={styles['navbar-actions']}>
          <Search/>
          <div className={styles['navbar-create-action']}>
            <PlusSquare size={42} onClick={() => createItemHandler()}/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation;
