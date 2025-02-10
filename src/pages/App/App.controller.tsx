import { SortProps } from '../../types'
import AppView from './App.view'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { tableActions } from '@/redux/actions/tableActions'
import { useGithubRepos } from '@/hooks/useGithubRepos'
import { useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'

type SortType = {
  value: SortProps;
  name: string;
}

const SORT_TYPES: SortType[] = [
  { value: "stars", name: "Stars" },
  { value: "forks", name: "Forks" },
  { value: "updated", name: "Updated" }
] as const;

function App() {
  const currentPage = useAppSelector((state) => state.table.currentPage)
  const sortBy = useAppSelector((state) => state.table.sortBy)
  const searchKeyword = useAppSelector((state) => state.table.searchKeyword)
  const selectedLang = useAppSelector((state) => state.table.selectedLang)
  const dispatch = useAppDispatch()
  const { logout } = useAuth()
  
  const { error, repos, totalCount, isWaiting } = useGithubRepos({
    currentPage,
    selectedLang,
    sortBy,
    searchKeyword
  });

  const handlers = useMemo(() => ({
    onSelectedLang: (e: React.ChangeEvent<HTMLInputElement>) =>  dispatch(tableActions.setLang(e.target.value)),
    onChangeSortFilter: (sort: SortProps) => dispatch(tableActions.setSortBy(sort)),
    onChangeSearchKeyword: (keyword: string) => dispatch(tableActions.setSearch(keyword)),
    onClickPrev: () => dispatch(tableActions.setPage(currentPage - 1)),
    onClickNext: () => dispatch(tableActions.setPage(currentPage + 1)),
    onChangePage: (page: number) => dispatch(tableActions.setPage(page))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedLang, sortBy, searchKeyword, currentPage]);

  const onClickLogout = () => {
    logout()
  }

  return (
    <AppView
      tableData={repos ?? []}
      isLoading={isWaiting}
      selectedLang={selectedLang}        
      sortTypes={SORT_TYPES}
      sortBy={sortBy}
      totalCount={totalCount}
      page={currentPage}
      error={error ? error.message : null}
      searchKeyword={searchKeyword}
      onClickLogout={onClickLogout}
      {...handlers}
    />
  )
}

export default App
