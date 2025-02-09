import { SortProps } from "@/types";
import { setCurrentPage, setSearchKeyword, setSelectedLang, setSortBy } from "../slices/tableSlice";
 
// Group related actions
export const tableActions = {
    setPage: (page: number) => setCurrentPage(page),
    setSortBy: (sort: SortProps) => setSortBy(sort),
    setSearch: (keyword: string) => setSearchKeyword(keyword),
    setLang: (lang: string) => setSelectedLang(lang)
  };