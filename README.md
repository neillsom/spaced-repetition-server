
## Spaced Repetition: North American Medicinal Herbs

Spaced Repetition is a Node / Express and React application that showcases data structures and algorithms. The site uses authentication and JWTs through the passport and bcyrpt libraries. A user can create an account, practice learning plant Latin names, sign out, and return to their previous progress.

## Motivation
Spaced repetition is a method for efficient learning that has you practice concepts or skills over increasing periods of time. As a student of Western Herbalism and botany, I've had to memorize the common and scientific names of many, many plants. This app is a great solution to the problem and can easily be expanded or changed simply by updating the database. 

## Project Links
- [Live application](https://name-that-plant.herokuapp.com/)
- [Server code repository](https://github.com/neillsom/spaced-repetition-server) 
- [Client code repository](https://github.com/neillsom/spaced-repetition-client)

## Screenshots
Landing page:
![Landing page](https://s3-us-west-2.amazonaws.com/neillsomerville/name-that-plant/2018-08-13_16-32-39.jpg "Landing page")

Sample question:
![Sample question](https://s3-us-west-2.amazonaws.com/neillsomerville/name-that-plant/2018-08-13_16-33-49.jpg "Sample question")

Feedback:
![Feedback](https://s3-us-west-2.amazonaws.com/neillsomerville/name-that-plant/2018-08-13_16-35-40.jpg "Feedback")

Study guide:
![Study guide](https://s3-us-west-2.amazonaws.com/neillsomerville/name-that-plant/2018-08-13_16-37-30.jpg "Study guide")

## Tech / Frameworks used
<b>Built with</b>
- Javascript 
- Node
- Express
- HTML
- CSS
- React
- MongoDB
- Mongoose
- Passport
- Bcrypt

## Code Example
### API Server Side
#### Linked list logic for question order
```javascript
class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  /**Inserts a new node after a node containing the key */
  insertAfter(key, itemToInsert) {
    let tempNode = this.head;
    while (tempNode !== null && tempNode.value !== key) {
      tempNode = tempNode.next;
    }
    if (tempNode !== null) {
      tempNode.next = new _Node(itemToInsert, tempNode.next);
    }
  }
...
```

### Frontend Client Side
#### Question component
```javascript
class Question extends Component {
  onSubmit = (event) => {
    event.preventDefault();

    let userAnswer = event.target.userInput.value.toLowerCase();
    this.props.dispatch(postAnswer({
      answer: userAnswer
    }));
    event.target.userInput.value = "";
  }


  render() {

    const feedbackData = (this.props.feedback === undefined || this.props.answered === false) ? null : (
      <div className="feedbackboard">
        <p>{this.props.feedback.feedback}. The answer is: {this.props.feedback.answer}</p>
        <br />
        <p>You answered correctly {this.props.feedback.correctTries} out of {this.props.feedback.totalTries} guesses for this card</p>
        <br />
        <p>You answered correctly {this.props.correctScore} out of {this.props.totalScore} guesses for this session</p>
      </div>
    );

    return (

      <div className="questionboard">
        <form onSubmit={event => { this.onSubmit(event), this.props.dispatch(toggleAnswered()) }}>


          <div className="question-img-container" >
            <img key={this.props.id} src={this.props.question} alt="medicinal herbs" />
          </div>

          {(this.props.answered === true) ? null :
            <div className="conditional-input-submit">
              <input className="userInput"
                type="text"
                name="userInput"
                validate={[required, nonEmpty]}
                required
              />
              <button className="button-submit">Submit</button>
            </div>
          }
        </form>
        <div className="feedback">
          {feedbackData}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  answered: state.protectedData.answered,
  question: state.protectedData.data.image,
  id: state.protectedData.id,
  feedback: state.protectedData.feedback,
  totalScore: state.protectedData.totalScore,
  correctScore: state.protectedData.correctScore
});

export default requiresLogin()(connect(mapStateToProps)(Question));
```

## Installation
- Set up Server
  - Clone the server repository: `git clone https://github.com/neillsom/spaced-repetition-server.git YOUR_SERVER_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_SERVER_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the server: `npm start`
- Set up Client
  - Clone the client repository: `git clone https://github.com/neillsom/spaced-repetition-client.git YOUR_CLIENT_PROJECT_NAME`
  - Move into the project directory: `cd YOUR_CLIENT_PROJECT_NAME`
  - Install dependencies: `npm install`
  - Start the client: `npm start`
  - React should open a new browser window pointing to [localhost:3000](localhost:3000). If it does not, simply visit the address in the browser. 
- Set up local database
  - Start Mongo database: `mongod`
  - Seed database:
    - From `YOUR_SERVER_PROJECT_NAME` directory: `node db/seed/questions.json`

## License
MIT License
Copyright (c) 2018 Neill Somerville

#### http://neillsomerville.com