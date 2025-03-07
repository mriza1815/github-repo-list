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
  error: string | null;
  page: number;
  totalCount: number;
  isLoading: boolean;
  tableData: Repo[];
  onClickLogout: () => void;
  onChangeSearchKeyword: (e: string) => void;
  onChangePage: (e: number) => void;
  onChangeSortFilter: (e: SortProps) => void;
  onSelectedLang: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortTypes: { value: SortProps, name: string }[];
}

function AppView({
  onClickNext, 
  onClickPrev, 
  onChangeSearchKeyword, 
  onChangeSortFilter, 
  onSelectedLang,
  onChangePage,
  onClickLogout,
  sortTypes,
  selectedLang,
  tableData,
  isLoading,
  sortBy,
  totalCount,
  page,
  error,
  searchKeyword
}: AppViewProps) {

  return (
    <section className={styles.container}>
      <div className={styles.tableContainer}>
        <header className={styles.header}>
          <h2 className={styles.tableHeader}>Repositories</h2>
          <button
            onClick={onClickLogout}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Logout
          </button>
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
            <DataTable 
              data={tableData || []}
              error={error}
              />
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
