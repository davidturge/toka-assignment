import React from 'react'
import Input from '../Input'
import { useSearchOptions } from '../../store/navigationStore'
import { buildProjectsSearchQuery, buildTasksSearchQuery } from '../../utils/util'
import { useShowSnackbar } from '../../store/snackbarStore'
import styles from './Search.module.scss'
import { EntityType, SEARCH_ERROR_MSG } from '../../constants'
import { SnackbarType } from '../snackbar/constants'
import { useCurrentProject } from '../../store/projectsStore'

const Search = () => {
  const searchOptions = useSearchOptions();
  const showSnackbar = useShowSnackbar();
  const { _id } = useCurrentProject() || {};

  const onSearch = async (evt) => {
    const query = (searchOptions.type === EntityType.PROJECT) ?
      buildProjectsSearchQuery(evt.target.value) :
      buildTasksSearchQuery(evt.target.value, _id);
    const { api, handler} =  searchOptions;

    try{
      const rest = await api(query);
      handler(rest);
    } catch (error) {
      showSnackbar({message: SEARCH_ERROR_MSG, type: SnackbarType.ERROR});
    }
  }

  return (
    <div className={styles['search-wrapper']}>
      <Input id='search' name='search' placeholder='Search' onChange={(evt) => onSearch(evt)}/>
    </div>
  )
}

export default Search;
