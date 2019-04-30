import React from "react"

function SaveBtn(props) {
  return (
    <button className="save-btn" {...props} role="button" tabIndex="0" className="btn btn-success ml-1">Save</button>
  );
}

export default SaveBtn;
