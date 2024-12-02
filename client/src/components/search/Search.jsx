import React, { useMemo } from 'react'
import Input from '../Input'
import { useSearchOptions } from '../../store/navigationStore'
import { buildProjectsSearchQuery, buildTasksSearchQuery, debounce } from '../../utils/util'
import { useShowSnackbar } from '../../store/snackbarStore'
import styles from './Search.module.scss'
import { EntityType, SEARCH_ERROR_MSG } from '../../constants'
import { SnackbarType } from '../snackbar/constants'
import { useCurrentProject } from '../../store/projectsStore'

const DEBOUNCE_TIMEOUT = 500;

/**
 * Handles searching for tasks and projects.
 * The SearchOptions state determines which API to call and how to construct the search query.
 * @returns {Element} A React component.
 * @constructor
 */
const Search = () => {
  const searchOptions = useSearchOptions();
  const showSnackbar = useShowSnackbar();
  const { _id: projectId } = useCurrentProject() || {};

  const onSearch = async (value) => {
    const query = (searchOptions.type === EntityType.PROJECT) ?
      buildProjectsSearchQuery(value) :
      buildTasksSearchQuery(value, projectId);
    const { api, handler} =  searchOptions;

    try{
      const rest = await api(query);
      handler(rest);
    } catch (error) {
      showSnackbar({message: SEARCH_ERROR_MSG, type: SnackbarType.ERROR});
    }
  }

  const debouncedOnSearch = useMemo(() => {
    return debounce(onSearch, DEBOUNCE_TIMEOUT);
  }, [onSearch]);

  return (
    <div className={styles['search-wrapper']}>
      <Input
        id='search'
        name='search'
        placeholder='Search'
        onChange={(evt) => debouncedOnSearch(evt.target.value)}/>
    </div>
  )
}

export default Search;
