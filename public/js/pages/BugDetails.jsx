const { Link} = ReactRouterDOM;
import {bugService} from '../services/bug.service.js'
export class BugDetails extends React.Component {
    state = {bug:null}
    componentDidMount() {
        const id = this.props.match.params.bugId;
        console.log(id)
        bugService.getBugById(id).then((bug) => {
            console.log(bug)
            this.setState({bug})
        })       
    }
    render() {
        console.log(this.state.bug)
        console.log(this.state)
        if(!this.state.bug) return <div>Loading...</div>
        const {title,description,severity,creator} = this.state.bug
        console.log(title,description,severity,creator)
        return(
            <section>
                <div className='bug-container'>
                   <h1>{title}</h1>
                   <h3>{description}</h3>
                   <h3>{severity}</h3>
                   <h5>{creator.fullname}</h5>
                </div>
                <Link className='btn decoration-none' to={'/'}>Go back</Link>
            </section>
        )
    }
    

}
// title={title}
// description={description}
// severity={severity}
// creator={creator}