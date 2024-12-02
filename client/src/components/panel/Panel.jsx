import React from 'react';
import { PlusCircle } from '@phosphor-icons/react'
import PropTypes from 'prop-types'
import styles from './Panel.module.scss'

const Panel = ({title, createHandler, itemsCount}) => {
  return (
    <div className={styles['panel-wrapper']}>
      <div className={styles['panel-title']}>
        <h1>{title} <span>({itemsCount})</span></h1>
      </div>
      <div className={styles['panel-action']}>
        <PlusCircle size={40} onClick={createHandler}/>
      </div>
    </div>
  )
}

export default Panel;

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  createHandler: PropTypes.func.isRequired,
  itemsCount: PropTypes.string.isRequired,
};
