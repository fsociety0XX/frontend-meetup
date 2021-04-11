import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../contextAPI/StateProvider";
import CloseIcon from "@material-ui/icons/Close";

function AddTopic(props) {
  const [{ user }, dispatch] = useContext(StateContext);
  const author = user?.email.split("@")[0];
  const firstLetterCapitalInAuthor =
    user && author.charAt(0).toUpperCase() + author.slice(1);

  const {
    showLinkValidation,
    editResourceData,
    handleSubmitOnEdit,
    closePopup,
  } = props;
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [resourceId, setResourceId] = useState("");

  const handlePopup = () => {
    closePopup();
  };

  useEffect(() => {
    if (editResourceData) {
      const { link, description, id } = editResourceData;
      setLink(link);
      setDescription(description);
      setResourceId(id);
    }
  }, [editResourceData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var obj = {
      description: description,
      link: link,
      author: firstLetterCapitalInAuthor,
      id: resourceId,
    };
    editResourceData ? handleSubmitOnEdit(obj) : props.handleSubmit(obj);
  };

  return (
    <div className="add-resource">
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
                  name="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  value={description}
                  placeholder="Enter description"
                />
                <span className="label">Description</span>
              </div>

              <div className="form-row">
                <input
                  name="link"
                  type="text"
                  onChange={(e) => setLink(e.target.value)}
                  required
                  value={link}
                  placeholder="Enter link"
                  className="resource-link"
                />
                <span className="label">Link</span>
                {showLinkValidation && <div className="validation">*enter a valid URL</div>}
              </div>

              <div className="form-row">
                <input
                  name="author"
                  type="text"
                  value={firstLetterCapitalInAuthor}
                  disabled={true}
                />
                <span className="label author">Author</span>
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
