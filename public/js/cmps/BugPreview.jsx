import { BugModal } from "./BugModal.jsx";
import { userService } from "../services/user.service.js";
const { Link, Route,Switch } = ReactRouterDOM;
export class BugPreview extends React.Component {
  state = { creator: null };
  componentDidMount() {
    this.setState({ creator: userService.getLoggedinUser() });
  }

  render() {
    const {
      onRemoveBug,
      title,
      description,
      severity,
      creator,
      _id,
      onSaveBug,
      isOwner,
    } = this.props;
  
    return (
      <tr>
        <td>{title}</td>
        <td>{description}</td>
        <td>{severity}</td>
        <td>{creator}</td>
        <td>
          {isOwner && (
            <button
              className="btn btn-remove"
              onClick={() => {
                onRemoveBug(_id);
              }}
            >
              Remove
            </button>
          )}
        
          <Route
            component={() => (
              <BugModal
                onSaveBug={onSaveBug}
                title={title}
                description={description}
                severity={severity}
                creator={creator}
                _id={_id}
              />
            )}
            path={`/api/bug/:id`}
          />
     
  
          {isOwner && (
            <Link
              className="btn btn-update decoration-none"
              to={`/api/bug/${_id}`}>
              Update
            </Link>
          )}
         
           <Link
              className="btn btn-read decoration-none"
              to={`/api/bug/${_id}/read`}>
              Read
            </Link>
        </td>
      </tr>
    );
  }
}
// {
//     "_id": "ADASV3",
//     "title": "Cannot save a Car",
//     "description": "problem when clicking Save",
//     "severity": 3,
//     "createdAt": 1542107359454,
//     "creator": {
//       "nickname": "Dror"
//     }
//   }
