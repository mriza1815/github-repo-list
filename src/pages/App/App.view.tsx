import { Dropdown, Pagination, RadioButton, DataTable, SearchInput } from '../../components'
import Loading from '../../components/OverlayLoading/Loading';
import { Repo, SortProps } from '../../types';
import styles from './App.module.css'

interface AppViewProps {
  onClickNext: () => void;
  onClickPrev: () => void;
  selectedLang: string;
  searchKeyword: string;
  sortBy: string;
  page: number;
  totalCount: number;
  isLoading: boolean;
  tableData: Repo[];
  onChangeSearchKeyword: (e: string) => void;
  onChangePage: (e: number) => void;
  onChangeSortFilter: (e: SortProps) => void;
  onSelectedLang: (e: any) => void;
  sortTypes: { value: SortProps, name: string }[];
}

function AppView({
  onClickNext, 
  onClickPrev, 
  onChangeSearchKeyword, 
  onChangeSortFilter, 
  onSelectedLang,
  onChangePage,
  sortTypes,
  selectedLang,
  tableData,
  isLoading,
  sortBy,
  totalCount,
  page,
  searchKeyword
}: AppViewProps) {

  return (
    <section className={styles.container}>
      <div className={styles.tableContainer}>
        <header className={styles.header}>
          <h2 className={styles.tableHeader}>Repositories</h2>
        </header> 
        <div className="p-3">
          { isLoading ? <Loading/> : null}
          <div className={`overflow-x-auto ${isLoading ? styles.tableDisabled : ''}`}>
            <div className={styles.tableHeader}>
              <SearchInput searchKeyword={searchKeyword} onChangeSearchKeyword={onChangeSearchKeyword} />
              <div className={styles.tableHeaderRight}>
                <Dropdown list={sortTypes} sortBy={sortBy} onSelectItem={onChangeSortFilter} />
                <div className={styles.headerRadioGroup}>
                  <RadioButton
                    name="language"
                    value="javascript" 
                    selectedLang={selectedLang} 
                    onSelectedLang={onSelectedLang} 
                  />
                  <RadioButton
                    name="language"
                    value="scala"
                    selectedLang={selectedLang}
                    onSelectedLang={onSelectedLang}
                  />
                  <RadioButton
                    name="language"
                    value="python"
                    selectedLang={selectedLang}
                    onSelectedLang={onSelectedLang}
                  />
                </div>
              </div>
            </div>
            <DataTable data={tableData || []} />
            <div className="mt-4">
              <Pagination 
                currentPage={page}
                totalCount={totalCount} 
                onClickPrev={onClickPrev} 
                onClickNext={onClickNext} 
                handleChangePage={onChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppView
