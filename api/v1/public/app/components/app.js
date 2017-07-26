import React from 'react';
import NavigationBar from './NavigationBar';
// let Checkbox = React.createClass({
//
//   getInitialState: function() {
//     return {checked: true}
//   },
//
//   handleChecked: function() {
//     this.setState({checked: !this.state.checked})
//   },
//
//   render: function() {
//     let msg;
//     if(this.state.checked) {
//       msg = 'checked'
//     }else{
//       msg = 'unchecked'
//     }
//     return (
//       <div>
//         <input type="checkbox" onChange={this.handleChecked} defaultChecked={this.state.checked}/>
//         <h3>Checkbox is {msg}</h3>
//       </div>
//     )
//   }
// });
//
// let Comment = React.createClass({
//   getInitialState: function() {
//     return {editing: false}
//   },
//   edit: function() {
//     this.setState({editing: true});
//   },
//   remove: function() {
//     this.props.deleteFromContainer(this.props.index);
//   },
//   save: function() {
//     this.props.updateCommentText(this.refs.newText.value, this.props.index);
//     this.setState({editing: false});
//   },
//   renderNormal: function() {
//     return (
//       <div className="commentContainer">
//         <div className="commentText">{this.props.children}</div>
//         <center><div>
//           <button onClick={this.edit} className="editButton">Edit</button>
//           <button onClick={this.remove} className="removeButton">Remove</button>
//         </div></center>
//       </div>
//     );
//   },
//   renderForm: function() {
//     return (
//       <div className="commentContainer">
//         <textarea ref="newText" className="textInput" defaultValue={this.props.children} />
//         <center><div>
//           <button onClick={this.save} className="saveButton">Save</button>
//         </div></center>
//       </div>
//     );
//   },
//   render: function() {
//     if(!this.state.editing) {
//       return this.renderNormal();
//     }else {
//       return this.renderForm();
//     }
//   }
// });
//
// let Container = React.createClass({
//   getInitialState: function() {
//     return {
//       comments: [
//         'This is my first comment.',
//         'This is my first comment.',
//         'This is my first comment.',
//         'This is my first comment.',
//         'This is my first comment.'
//       ],
//       adding: false
//     }
//   },
//   add: function() {
//     this.setState({adding: true});
//   },
//   addComment: function() {
//     let arr = this.state.comments;
//     arr.push(this.refs.addText.value);
//     this.setState({comments: arr, adding: false});
//   },
//   removeComment: function(i) {
//     console.log('Removing comment '+ i);
//     let arr = this.state.comments;
//     arr.splice(i, 1);
//     this.setState({comments: arr});
//   },
//   updateComment: function(newText, i) {
//     console.log('Updating comment '+ i);
//     let arr = this.state.comments;
//     arr[i] = newText;
//     this.setState({comments: arr});
//   },
//   eachComment: function(text, i) {
//     return (
//       <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromContainer={this.removeComment}>
//         {text}
//       </Comment>
//     );
//   },
//   renderWithAdd: function() {
//     return (
//       <div>
//         <button className="saveButton">Add</button>
//         <div className="commentContainer">
//           <textarea ref="addText" className="textInput" />
//           <center><div>
//             <button onClick={this.addComment} className="saveButton">Save</button>
//           </div></center>
//         </div>
//         <div className="container">
//           {
//             this.state.comments.map(this.eachComment)
//           }
//         </div>
//       </div>
//     );
//   },
//   renderNormal: function() {
//     return (
//       <div>
//         <button onClick={this.add} className="saveButton">Add</button>
//         <div className="container">
//           {
//             this.state.comments.map(this.eachComment)
//           }
//         </div>
//       </div>
//     );
//   },
//   render: function() {
//     if(this.state.adding) {
//       return this.renderWithAdd();
//     }else {
//       return this.renderNormal();
//     }
//   }
// });

let App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <NavigationBar />
      </div>
      <h1 className="commentText">Hello</h1>
    );
  }
});

export default App;
