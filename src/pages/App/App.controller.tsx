import { useMemo, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import octokit from '../../api'
import { Repo, SortProps } from '../../types'
import AppView from './App.view'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setCurrentPage, setSearchKeyword, setSelectedLang, setSortBy } from '../../redux/slices/tableSlice'

let sortTypes = [
  { value: "stars" as SortProps, name: "Stars" },
  { value: "forks" as SortProps, name: "Forks" },
  { value: "updated" as SortProps, name: "Updated" }
]

function App() {
  const currentPage = useAppSelector((state) => state.table.currentPage)
  const sortBy = useAppSelector((state) => state.table.sortBy)
  const searchKeyword = useAppSelector((state) => state.table.searchKeyword)
  const selectedLang = useAppSelector((state) => state.table.selectedLang)
  const dispatch = useAppDispatch()
  
  const [totalCount, setTotalCount] = useState(0)
  
  const { isPending, data, isLoading, isPlaceholderData } = useQuery<Repo[]>({
    queryKey: ['repoData', {currentPage, selectedLang, sortBy, searchKeyword}],
    queryFn: async () => {
      const response = await octokit.request('GET /search/repositories', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q: `${searchKeyword}+language:${selectedLang}`,
        per_page: 10,
        page: currentPage,
        sort: sortBy
      })
      setTotalCount(response.data.total_count)
      return response.data.items as Repo[]
    },
    placeholderData: keepPreviousData,
  })

  const onSelectedLang = (e: any) => {
    dispatch(setSelectedLang(e.target.value))
  }

  const onChangeSortFilter = (e: SortProps) => {
    dispatch(setSortBy(e))
  }
  
  const onChangeSearchKeyword = (e: string) => {
    dispatch(setSearchKeyword(e))
  }

  const onClickPrev = () => {
    dispatch(setCurrentPage(currentPage - 1))
  }

  const onClickNext = ():void => {
    dispatch(setCurrentPage(currentPage + 1))
  }

  const onChangePage = (e: number) => {
    dispatch(setCurrentPage(e))
  }

  const isWaiting = useMemo(() => isPending || isLoading || isPlaceholderData, [isPending, isLoading, isPlaceholderData])

  return (
    <AppView
        tableData={data ?? []}
        isLoading={isWaiting}
        selectedLang={selectedLang}        
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSortFilter={onChangeSortFilter}
        onSelectedLang={onSelectedLang}
        sortTypes={sortTypes}
        sortBy={sortBy}
        totalCount={totalCount}
        page={currentPage}
        searchKeyword={searchKeyword}
        onChangePage={onChangePage}
    />
  )
}

export default App
