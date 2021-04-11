import React, { Component } from "react";
import { db } from "../Firebase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddResource from "./AddResource";
import { notify, userList } from "../utils";
import Loader from "./Loader";
import SearchIcon from "@material-ui/icons/Search";
import { StateContext } from "../contextAPI/StateProvider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import DefaultAvatar from "../assets/default-user.png";
import Pagination from "./Pagination";

const linkValidation = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
var resourcesData = [];

export default class Resource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceData: null,
      openAddResourcePopup: false,
      showLinkValidation: false,
      filterData: null,
      editResourceData: null,
    };
    this.openAddNewResourcePopup = this.openAddNewResourcePopup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitOnEdit = this.handleSubmitOnEdit.bind(this);
    this.handleChangeOnSearch = this.handleChangeOnSearch.bind(this);
    this.globalSearch = this.globalSearch.bind(this);
    this.editResource = this.editResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  static contextType = StateContext;

  componentDidMount() {
    const { history } = this.props;
    db.collection("discussions")
      .doc(`${history.location.state.topicId}`)
      .collection("resources")
      .orderBy("author", "asc")
      .onSnapshot((snapshot) => {
        this.setState({ resourceData: snapshot.docs });
      });
  }

  openAddNewResourcePopup() {
    this.setState({ openAddResourcePopup: true });
  }

  closePopup = () => {
    this.setState({
      openAddResourcePopup: false,
      editResourceData: null,
      showLinkValidation: false,
    });
  };

  handleSubmit(data) {
    const { history } = this.props;
    const { description, link, author } = data;
    var validLink = linkValidation.test(link);

    if (!validLink) {
      this.setState({ showLinkValidation: true });
    } else {
      db.collection("discussions")
        .doc(`${history.location.state.topicId}`)
        .collection("resources")
        .add({
          description: description,
          link: link,
          author: author,
        });
      notify("Resource added Successfully", "success");
      this.closePopup();
    }
  }

  handleSubmitOnEdit(data) {
    const { history } = this.props;
    const { description, link, author, id } = data;
    var validLink = linkValidation.test(link);

    if (!validLink) {
      this.setState({ showLinkValidation: true });
    } else {
      db.collection("discussions")
        .doc(`${history.location.state.topicId}`)
        .collection("resources")
        .doc(id)
        .update({
          description: description,
          link: link,
          author: author,
        });
      notify("Resource updated Successfully", "success");
      this.closePopup();
    }
  }

  /**
   * @author Kushagra
   * @param {*} event
   * global search in resource table
   */

  handleChangeOnSearch = (event) => {
    this.globalSearch(event.target.value);
  };

  globalSearch = (input) => {
    let filterData = resourcesData.filter((value) => {
      return (
        value.description.toLowerCase().includes(input.toLowerCase()) ||
        value.link.toString().toLowerCase().includes(input.toLowerCase()) ||
        value.author.toString().toLowerCase().includes(input.toLowerCase())
      );
    });
    this.setState({ filterData: filterData });
  };

  editResource(data) {
    this.setState({ openAddResourcePopup: true, editResourceData: data });
  }

  deleteResource(id) {
    const { history } = this.props;
    db.collection("discussions")
      .doc(`${history.location.state.topicId}`)
      .collection("resources")
      .doc(id)
      .delete();
    notify("Resource deleted Successfully", "success");
  }

  render() {
    const { history } = this.props;
    const { user } = this.context[0];
    const {
      resourceData,
      openAddResourcePopup,
      showLinkValidation,
      filterData,
      editResourceData,
    } = this.state;

    const author = user?.email.split("@")[0];
    const currentLoggedInUser =
      user && author.charAt(0).toUpperCase() + author.slice(1);

    resourcesData = resourceData?.map((data) => {
      return {
        id: data.id,
        description: data.data().description,
        link: data.data().link,
        author: data.data().author,
      };
    });

    const columns = [
      {
        Header: "Id",
        accessor: "id",
        show: false,
      },
      {
        Header: "Author",
        accessor: "author",
        Cell: (e) =>
          userList?.map((user) => {
            if (
              user.name.substr(0, user.name.indexOf(" ")) === e.original.author
            ) {
              return (
                <>
                  <div className="author-details">
                    <img
                      src={user.image}
                      onError={(e) => {
                        e.target.src = DefaultAvatar;
                      }}
                      className="author-img"
                    />
                    <span className="author-name">{e.original.author}</span>
                  </div>
                </>
              );
            }
          }),
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Link",
        accessor: "link",
        Cell: (e) => (
          <a href={e.value} target="_blank">
            {e.value}
          </a>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        filterable: false,
        sortable: false,
        Cell: (e) =>
          currentLoggedInUser == e.original.author ? (
            <div className="actions">
              <a
                className="btn edit"
                onClick={() => this.editResource(e.original)}
              >
                <EditIcon />
              </a>

              <a
                className="btn delete"
                onClick={() => this.deleteResource(e.original.id.toString())}
              >
                <DeleteIcon />
              </a>
            </div>
          ) : (
            ""
          ),
      },
    ];

    return (
      <>
        {resourceData ? (
          <>
            <div className="dashboard" id="dashboard">
              <div className="resource" id="resource">
                <div className="discussion-wrapper">
                  <div className="discussion-container">
                    <Link to="/discussions" className="back">
                      <ArrowBackIosIcon />
                    </Link>
                    <h2>Meetup Resources</h2>
                    <div className="align-right clearfix">
                      <a
                        className="button"
                        onClick={this.openAddNewResourcePopup}
                      >
                        Add New Resource
                      </a>
                      {openAddResourcePopup && (
                        <AddResource
                          handleSubmit={this.handleSubmit}
                          handleSubmitOnEdit={this.handleSubmitOnEdit}
                          showLinkValidation={showLinkValidation}
                          editResourceData={editResourceData}
                          closePopup={this.closePopup}
                        />
                      )}
                      <div className="search_container">
                        <input
                          size="large"
                          name="searchInput"
                          onChange={this.handleChangeOnSearch}
                          placeholder="Search"
                          className="search"
                        />
                        <SearchIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                  <ReactTable
                    data={
                      filterData && filterData.length != resourcesData.length
                        ? filterData
                        : resourcesData
                    }
                    columns={columns}
                    defaultPageSize={5}
                    PaginationComponent={Pagination}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
