import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

function AddTopic(props) {
  const { editTopicData, handleSubmitOnEdit, closePopup } = props;
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [topicId, setTopicId] = useState("");

  useEffect(() => {
    if (editTopicData) {
      const { topic, date, id } = editTopicData;
      setTopic(topic);
      setDate(date);
      setTopicId(id);
    }
  }, [editTopicData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var obj = {
      topic: topic,
      date: date,
      id: topicId,
    };
    editTopicData ? handleSubmitOnEdit(obj) : props.handleSubmit(obj);
  };

  const handlePopup = () => {
    closePopup();
  };

  return (
    <div className="add-topic">
      <div className="popup">
        <div className="popupOverlay" onClick={() => handlePopup()}></div>

        <div className="popup_inner">
          <div className="popup-header">
            Add Topic
            <span className="close-icon" onClick={() => handlePopup()}>
              <CloseIcon />
            </span>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="topic"
                  type="text"
                  onChange={(e) => setTopic(e.target.value)}
                  value={topic}
                  required
                />
                <span>Topic</span>
              </div>
              <div className="form-row">
                <input
                  name="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                  className="date"
                />
                <span>Date</span>
              </div>
              <div className="form-row">
                <button type="submit" className="button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTopic;
