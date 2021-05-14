const { withRouter } = ReactRouterDOM;

class _BugModal extends React.Component {
  state = {
    _id: null,
    title: null,
    description: null,
    severity: null,
    createdAt: Date.now(),
  };

  closeModal = () => {
    this.props.history.push(`/`);
  };
  onOutSideClick = (ev) => {
    if (ev.target.classList.contains("modal-container")) {
      this.props.history.push(`/`);
      // node.classList.add("animate__animated animate__fadeOut")
    }
  };
  onSubmit = (ev) => {
    ev.preventDefault();
    let bug = this.state;
    const id = this.props.match.params.id;
    bug._id = id;
    bug.creator = {fullname:this.props.creator}
    this.props.onSaveBug(bug);
    this.props.history.push(`/`);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "radio" ? +target.value : target.value;
    this.setState((prevState) => ({
      ...prevState.note,
      [field]: value,
    }));
  };

  onSetInputType = (type) => {
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        type,
      },
    }));
  };

  render() {
    // const { id } = this.props.match.params;
    const { title, description, severity, _id} = this.props;
    console.log(_id);
    return (
      <div
        onClick={this.onOutSideClick}
        ref={this.myRef}
        className={`modal-container`}
      >
        <div className="modal note-modal">
          <span onClick={this.closeModal} className="close-modal">
            x
          </span>
          <h1>Add Bug</h1>
          <div>
            <form className="bug-create-container" onSubmit={this.onSubmit}>
              <input
                type="text"
                name="title" //just some way to make the inputstate function be dynamic
                onChange={this.handleChange}
                className="bug-input"
                placeholder="Insert Title"
              />
              <input
                type="text"
                name="description" //just some way to make the inputstate function be dynamic
                onChange={this.handleChange}
                className="bug-input"
                placeholder="Description"
              />
              <select name="severity" onChange={this.handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button className="btn btn-submit">
                {_id ? "Edit" : "Submit"} Bug
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export const BugModal = withRouter(_BugModal);
