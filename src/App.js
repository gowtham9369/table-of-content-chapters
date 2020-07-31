import React, { Component } from "react";
import "./App.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import Api from "./util/api.json";


class App extends Component {
  state = {
            data:[],
            open: false,
            chapter:[],
          };

  onCloseModal = () => {
    this.setState({ open: false,chapter:[] });
  };

  componentDidMount()
  {
	this.getData();
  }

  getData = async () => {
	console.log(JSON.stringify(Api));
    let res = await axios.get('http://localhost:3000/root.json')
    console.log(res);
        if (res.status === 200) {
            let data = res.data;
            this.setState({ data: data.maths });
        }
        else if (res.status === 404) {
		    console.log("Not Found")
        }
		else{
			console.log(res)
		}
  };

  getDetails = async (id) => {
    console.log(id);
    this.setState({open:true});
    let res = await axios.get("http://localhost:3000/child.json")
    console.log(res);
        if (res.status === 200) {
            let data = res.data.maths[id];
            if(data === undefined){
              alert("No Data Found")
            }
            else if(data != null){
              this.setState({ chapter: data });
            }
        }
        else if (res.status === 404) {
		    console.log("Not Found")
        }
		else{
			console.log(res)
		}
  };

  render() {
    return (
      <div className="App">
        <div>
          {/* Navbar */}
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/" rel="noopener noreferrer">
                  Logo
                </a>
              </div>
            </div>
          </nav>
          <Modal open={this.state.open} onClose={this.onCloseModal}>
            <h2>Table of Content</h2>
                <div className="popup">
                <div className="row">
                  <div className="span4 well">
                  <div className="row">
                  <table className="responsive-table">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                  {this.state.chapter.map((data,index)=>(
                    <tr key={index}>
                    <td className="text-center">{data.sequenceNO}.</td>
                    <td className="text-center">{data.title}</td>
                    <td className="text-center">{data.type}</td>
                    <td className="text-center"><span className="badge badge-warning" id={data.status}>{data.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
					</div>
				  </div>
				</div>
			  </div>
          </Modal>
          {/* First Container */}
          <div className="container-fluid bg-1 text-center">
            <div className="container">
              <table id="example" className="responsive-table">
                <caption>Table of Content</caption>
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Type</th>
                    <th scope="col">Children Count</th>
                    <th scope="col">Completed Count</th>
                    <th scope="col">Activity Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map((data,index)=>(
                    <tr key={index}>
                    <td className="text-center">{data.sequenceNO}.</td>
                    <td className="text-center">{data.title}</td>
                    <td className="text-center">{data.type}</td>
                    <td className="text-center">{data.childrenCount}</td>
                    <td className="text-center">{data.completeCount}</td>
                    <td className="text-center"><button className="btn btn-dark" onClick={()=>this.getDetails(data.id)}> View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="container-fluid bg-4 text-center footer">
          <p>Awesome Web App</p>
        </footer>
      </div>
    );
  }
}

export default App;