import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class NotFoundPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: undefined
    //     };
    // }
    // componentDidMount() {
    //     if (this.props.message) {
	// 		try {
	// 			this.setState({ searchdataData: this.props.message });
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	}
	// }
    render() {
        return (
            <div>
                <h1> 404 ! Not Found! {this.props.message}</h1>
                <br/>
                <Link to="/">Go to Home </Link>
            </div>
        );
    }
}
export default NotFoundPage;