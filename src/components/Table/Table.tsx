import { Repo } from "../../types";
import { convertDate } from "../../utils"
import ErrorBox from "../ErrorBox/ErrorBox";
import styles from "./Table.module.css"

interface TableProps {
  data: Repo[];
  error: string | null;
}

const DataTable = ({data, error}: TableProps) => {
    return (
        <table className={styles.tableContainer} data-testid="repository-table">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3">Repository Id</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Repo Description</th>
              <th scope="col" className="px-6 py-3">Stars</th>
              <th scope="col" className="px-6 py-3">Forks</th>
              <th scope="col" className="px-6 py-3">Last Updated Time</th>
            </tr>
          </thead>
          <tbody data-testid="table-body">
            {data.length === 0 ? (
              <tr data-testid="empty-table">
                <td colSpan={6} className="text-center py-4">
                  <span>No repositories found</span>
                  {error ? <ErrorBox message={error}/> : null}
                </td>
                
              </tr>
            ): data?.map((repo: Repo) => (
                <tr key={`table-item-${repo.id}`} data-testkey={`table-item-${repo.id}`}>
                  <td className="px-6 py-4">{repo.id}</td>
                  <td className="px-6 py-4">{repo.owner.login}</td>
                  <td className={`px-6 py-4 ${styles.longRow}`}>{repo.description}</td>
                  <td className="px-6 py-4">{repo.stargazers_count}</td>
                  <td className="px-6 py-4">{repo.forks}</td>
                  <td className={`px-6 py-4 ${styles.longRow}`}>{convertDate(repo.updated_at)}</td>
                </tr>
            ))}
          </tbody>
        </table>
    )
}

export default DataTable