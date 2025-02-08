import './Test.css'

function Test() {

  return (
    <div className="table-container">
  <div className="table-controls">
    <div className="search-container">
      <input 
        type="search" 
        id="repo-search" 
        placeholder="Search repositories..."
        aria-label="Search repositories"
      />
    </div>

    <div className="filter-controls">
      <div className="language-filter">
        <label className="radio-label">
          <input type="radio" name="language" value="javascript" checked/>
          JavaScript
        </label>
        <label className="radio-label">
          <input type="radio" name="language" value="scala"/>
          Scala
        </label>
        <label className="radio-label">
          <input type="radio" name="language" value="python"/>
          Python
        </label>
      </div>

      <div className="sort-filter">
        <select id="sort-select" aria-label="Sort repositories by">
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Last Updated</option>
        </select>
      </div>
    </div>
  </div>

  <div className="table-wrapper">
    <table className="repo-table">
      <thead>
        <tr>
          <th>Repository ID</th>
          <th>Username</th>
          <th>Repo Description</th>
          <th>Stars</th>
          <th>Forks</th>
          <th>Last Update Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12345</td>
          <td>johndoe</td>
          <td>Sample repository description</td>
          <td>1.2k</td>
          <td>234</td>
          <td>2024-03-20</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="pagination">
    <button className="page-btn" aria-label="Previous page">&lt;</button>
    <button className="page-btn active">1</button>
    <button className="page-btn">2</button>
    <button className="page-btn">3</button>
    <button className="page-btn" aria-label="Next page">&gt;</button>
  </div>
</div>
  )
}

export default Test
