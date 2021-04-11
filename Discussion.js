import React, { Component } from "react";
import { db } from "../Firebase";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddTopic from "./AddTopic";
import Loader from "./Loader";
import { notify } from "../utils";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { StateContext } from "../contextAPI/StateProvider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "./Pagination";

var topicsData = [];
const adminEmail = "kushagra@o2h.com";
export default class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: null,
      openAddTopicPopup: false,
      filterData: null,
      editTopicData: null,
    };
    this.openResourcePage = this.openResourcePage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openAddNewTopicPopup = this.openAddNewTopicPopup.bind(this);
    this.handleChangeOnSearch = this.handleChangeOnSearch.bind(this);
    this.globalSearch = this.globalSearch.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.editTopic = this.editTopic.bind(this);
    this.handleSubmitOnEdit = this.handleSubmitOnEdit.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  static contextType = StateContext;

  componentDidMount() {
    db.collection("discussions")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => this.setState({ topics: snapshot.docs }));
  }

  openResourcePage(topic) {
    const { topics } = this.state;
    const { history } = this.props;
    var checkId = topics?.map((data) => {
      if (data.data().topic === topic) {
        return data.id;
      }
    });
    var topicId = checkId.toString().replace(/,/g, "");

    history.push({
      pathname: "/resource",
      state: { topicId: topicId },
    });
  }

  handleSubmit(data) {
    const { topic, date } = data;
    db.collection("discussions").add({
      topic: topic,
      date: date,
    });
    this.setState({ openAddTopicPopup: false });
    notify("Topic added Successfully", "success");
  }

  handleSubmitOnEdit(data) {
    const { topic, date, id } = data;
    db.collection("discussions").doc(id).update({
      topic: topic,
      date: date,
    });
    notify("Topic updated Successfully", "success");
    this.setState({
      openAddTopicPopup: false,
      editTopicData: null,
    });
  }

  openAddNewTopicPopup() {
    this.setState({ openAddTopicPopup: true });
  }

  closePopup = () => {
    this.setState({ openAddTopicPopup: false, editTopicData: null });
  };

  /**
   * @author Kushagra
   * @param {*} event
   * global search in discussion table
   */

  handleChangeOnSearch = (event) => {
    this.globalSearch(event.target.value);
  };

  globalSearch = (input) => {
    let filterData = topicsData.filter((value) => {
      return (
        value.topic.toLowerCase().includes(input.toLowerCase()) ||
        value.date.toString().toLowerCase().includes(input.toLowerCase())
      );
    });
    this.setState({ filterData: filterData });
  };

  deleteTopic(id) {
    db.collection("discussions").doc(id).delete();
    notify("Topic deleted Successfully", "success");
  }

  editTopic(data) {
    this.setState({ openAddTopicPopup: true, editTopicData: data });
  }

  render() {
    const { topics, openAddTopicPopup, filterData, editTopicData } = this.state;
    const { user } = this.context[0];

    topicsData = topics?.map((data) => {
      return {
        id: data.id,
        topic: data.data().topic,
        date: data.data().date,
      };
    });

    const columns = [
      {
        Header: "Id",
        accessor: "id",
        show: false,
      },
      {
        Header: "Topic",
        accessor: "topic",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Action",
        accessor: "Action",
        filterable: false,
        sortable: false,
        Cell: (e) => (
          <div className="actions">
            <a
              className="btn view"
              onClick={() => this.openResourcePage(e.original.topic)}
            >
              <VisibilityIcon />
            </a>
            {user?.email == adminEmail ? (
              <>
                <a
                  className="btn edit"
                  onClick={() => this.editTopic(e.original)}
                >
                  <EditIcon />
                </a>
                <a
                  className="btn delete"
                  onClick={() => this.deleteTopic(e.original.id.toString())}
                >
                  <DeleteIcon />
                </a>
              </>
            ) : (
              ""
            )}
          </div>
        ),
      },
    ];
    return (
      <>
        {topicsData ? (
          <>
            <div className="dashboard" id="dashboard">
              <div className="discussion" id="discussion">
                <div className="discussion-wrapper">
                  <div className="discussion-container">
                    <h2>Meetup Discussions</h2>
                    <div className="align-right clearfix">
                      {user?.email === adminEmail ? (
                        <a
                          className="button"
                          onClick={this.openAddNewTopicPopup}
                        >
                          Add New Topic
                        </a>
                      ) : (
                        ""
                      )}
                      {openAddTopicPopup && (
                        <AddTopic
                          handleSubmit={this.handleSubmit}
                          editTopicData={editTopicData}
                          handleSubmitOnEdit={this.handleSubmitOnEdit}
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
                      filterData && filterData.length != topicsData.length
                        ? filterData
                        : topicsData
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
