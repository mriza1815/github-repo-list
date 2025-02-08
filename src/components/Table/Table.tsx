import { Repo } from "../../types";
import { convertDate } from "../../utils"
import styles from "./Table.module.css"

interface TableProps {
  data: Repo[];
}

const DataTable = ({data}: TableProps) => {
    return (
        <table className={styles.tableContainer}>
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
          <tbody>
            {data?.map((repo: Repo, index: number) => (
                <tr key={`table-item-${index}`}>
                  <td className="px-6 py-4">{repo.id}</td>
                  <td className="px-6 py-4">{repo.owner.login}</td>
                  <td className={`px-6 py-4 ${styles.description}`}>{repo.description}</td>
                  <td className="px-6 py-4">{repo.stargazers_count}</td>
                  <td className="px-6 py-4">{repo.forks}</td>
                  <td className="px-6 py-4">{convertDate(repo.updated_at)}</td>
                </tr>
              ))}
          </tbody>
        </table>
    )
}

export default DataTable