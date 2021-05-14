import {BugPreview} from './BugPreview.jsx'
export class BugsList extends React.Component {
  state = {};

  render() {
    const {bugs,onRemoveBug,onSaveBug,isOwner,loadBugs} = this.props;
    console.log(bugs)
    return (
      <section className="bugs-container">
        <table className="bugs-table">
            <thead>
              <tr>
              <td>Title</td>
                <td>Description</td>
                <td>Severity</td>
                <td>Creator</td>
                <td>Actions</td>
              </tr>
               
            </thead>
            <tbody>
            {bugs.map((bug) => {
               return <BugPreview key={bug._id} _id={bug._id} title={bug.title} description={bug.description} severity={bug.severity} creator={bug.creator.fullname} onRemoveBug={onRemoveBug} onSaveBug={onSaveBug} isOwner={isOwner(bug)} loadBugs={loadBugs}/>
            })}                       
            </tbody>
            </table>
      </section>
    );
  }
}
