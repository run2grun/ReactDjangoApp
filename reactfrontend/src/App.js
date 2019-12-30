import React from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';
import PostView from'./Components/PostView';
//frontend View
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';




//함수형 컴포넌트 props
//클래스형 컴포넌트 state
//lifecycle = 클래스 컴포넌트에 쓰이는 개념

//class App extends React.Component {

  //컴포넌트가 호출될 때, 가장 먼저 생성되는 것: 생성자
  //constructor(props){
    //super(props)
    //this.state = date; new Date()}
  //}

  //componentDidMount(){
    //setInterval(
      //()=>thistick(),1000
    //)

  //tick(){
    //this.ListeningStateChangedEvent(
      //{date: new Date()}
    //)
  //}
class App extends React.Component {
  //생성자 추가
  constructor(props){
    super(props)
    this.state = {
      title:"",
      content:"",
      results:[],
    }
  }
  componentDidMount(){
    this.getPost()

  }
  async getPost(){
    const _results = await api.getAllPost()
    this.setState({results:_results.data})
  }
  //lifecycle : 컴포넌트 호출 - > 생성자 만들어지고 -> render()
  // -> componentDidMount()->state가 변경되면 render가 다시 됨->ComponentDidMount ...(반복)

  handlingChange = (event)=>{
    this.setState(
      { [event.target.name]:event.target.value}
    )
    console.log(event.target)
  }

  handlingSubmit = async(event)=>{
    //onSubmit의 디폴트 액션은 새로고침이다. 
    event.preventDefault()
    let result = await api.createPost({title: this.state.title, content: this.state.content})
      console.log("완료됨", result)
      this.setState({title:"", content:''})
      this.getPost()
  }

handlingDelete=async (event)=>{
  await api.deletePost(event.target.value)
  this.getPost()
}

  render() {
    return(
      <Container maxWidth="lg">

      <div className="App">
        <div className="PostingSection">

          <Paper classname = "PostingPaper">
          <h2>대나무 숲 글 작성하기</h2>
          <form onSubmit={this.handlingSubmit}>
          <div>
            <TextField
              id="outlined-basic"
              label="title"
              margin="normal"
              variant="outlined"
              name= "title"
              value = {this.state.title}
              onChange = {this.handlingChange}
            />
      </div>
          </form>
          <form>
            <TextField
            id="outlined-multiline-static"
            label="content"
            multiline
            rows="4"
            name = "content"
            margin="normal"
            variant="outlined"
            value = {this.state.content}
            onChange = {this.handlingChange}
          />
          <Button classname="PostingButton" type ="submit" variant="contained" > 제출하기</Button>
          </form>
          </Paper>

        </div>
        <div className="ViewSection">
          {this.state.results.map((post =>
              <Card classname="card">

              <CardContent>
                <Typography variant="h5" component="h2">
                <PostView id={post.id} title ={post.title} content={post.content} />
                </Typography>
                <button value={post.id} onClick={this.handlingDelete} size="small">삭제하기</button>
              </CardContent>
            </Card>
          
          ))
          }

        </div>
      </div>

      </Container>
    )
  }


  }
  //react에 쓰이는 JS=JS
  //ES6
  //var a =6;
  //let a =6;
  //const b =3

export default App;
