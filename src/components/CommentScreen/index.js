import React, { Component } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CommentScreen extends Component {
  state = {
    commentsData: [],
    searchInput: '',
    currentPage: 1,
    itemsPerPage: 10,
    sortConfig: {
      field: null,
      direction: null,
    },
    apiStatus : apiStatusConstants.initial
  };

  componentDidMount() {
    const saved = localStorage.getItem('commentsTableChanges');
    if (saved) {
      this.setState(JSON.parse(saved), this.getCommentsData);
    } else {
      this.getCommentsData();
    }
  }

  getCommentsData = async () => {

    this.setState({ apiStatus: apiStatusConstants.inProgress })
    try {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (response.ok) {
        const fetchedData = await response.json();
        this.setState({ commentsData: fetchedData, apiStatus:apiStatusConstants.success }, this.applyFilters);
      }
      else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    }
    catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <BeatLoader color="#36d7b7" loading={true} size={20} />
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://res.cloudinary.com/diejm0elz/image/upload/v1749180642/Group_7519_izkpro.png"
      alt="failure View"
      
    />
  )



  saveStateToLocalStorage = () => {
    const { searchInput, currentPage, itemsPerPage, sortConfig } = this.state;
    const stateToSave = { searchInput, currentPage, itemsPerPage, sortConfig };
    localStorage.setItem('commentsTableChanges', JSON.stringify(stateToSave));
  };

  applyFilters = () => {
    const { commentsData, searchInput, sortConfig } = this.state;
    let filtered = [...commentsData];

    if (searchInput.trim() !== '') {
      const lower = searchInput.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(lower) ||
          item.email.toLowerCase().includes(lower) ||
          item.body.toLowerCase().includes(lower)
      );
    }

    if (sortConfig.field && sortConfig.direction) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.field]?.toString().toLowerCase();
        const bVal = b[sortConfig.field]?.toString().toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  handleSort = field => {
    this.setState(prevState => {
      let direction = 'asc';
      if (prevState.sortConfig.field === field) {
        if (prevState.sortConfig.direction === 'asc') direction = 'desc';
        else if (prevState.sortConfig.direction === 'desc') direction = null;
        else direction = 'asc';
      }
      const newSort = { field, direction };
      return { sortConfig: newSort, currentPage: 1 };
    }, this.saveStateToLocalStorage);
  };

  handleSearch = e => {
    this.setState({ searchInput: e.target.value, currentPage: 1 }, this.saveStateToLocalStorage);
  };

  handlePageChange = number => {
    this.setState({ currentPage: number }, this.saveStateToLocalStorage);
  };

  handlePageSizeChange = e => {
    this.setState({ itemsPerPage: Number(e.target.value), currentPage: 1 }, this.saveStateToLocalStorage);
  };

  range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

  getPagesCut = (totalPages, currentPage) => {
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
      end = Math.min(totalPages, start + visiblePages - 1);
    }

    return this.range(start, end + 1);
  };

  renderTabSection = () => {
    const { searchInput } = this.state;
    return (
      <div className="controls">
        <div className="controlsButtonCard">
          <button onClick={() => this.handleSort('postId')}>Sort Post ID <ChevronsUpDown size={17} /></button>
          <button onClick={() => this.handleSort('name')}>Sort Name <ChevronsUpDown size={17} /></button>
          <button onClick={() => this.handleSort('email')}>Sort Email <ChevronsUpDown size={17} /></button>
        </div>
        <div className="userSearchContainer">
          <input
            type="search"
            placeholder="Search name, email, comment"
            value={searchInput}
            onChange={this.handleSearch}
          />
        </div>
      </div>
    );
  };

  renderCommentsData = () => {
    const { currentPage, itemsPerPage } = this.state;
    const filteredData = this.applyFilters();

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = filteredData.slice(startIndex, endIndex);

    const pages = this.getPagesCut(totalPages, currentPage);

    if (totalItems === 0) return <h1>No Data Found</h1>;

    return (
      <>
        <div className="commentsContainer">
          <table>
            <thead>
              <tr>
                <th>Post ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.postId}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paginationContainer">
          <span>{startIndex + 1}-{endIndex} of {totalItems} items</span>
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>

          <div className="pageNumbers">
            {pages.map(page => (
              <button
                key={page}
                onClick={() => this.handlePageChange(page)}
                className={page === currentPage ? 'activePage' : ''}
              >
                {page}
              </button>
            ))}
          </div>

          <button onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>

          <select value={itemsPerPage} onChange={this.handlePageSizeChange}>
            <option value="10">10 / Page</option>
            <option value="50">50 / Page</option>
            <option value="100">100 / Page</option>
          </select>
        </div>
      </>
    );
  };

  renderSwitchCases() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
          {this.renderTabSection()}
        {this.renderCommentsData()}
          </>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }


  render() {
    return (
      <div className="body-container">
        {this.renderSwitchCases()}
      </div>
    );
  }
}

export default CommentScreen;
