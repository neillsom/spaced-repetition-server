
## Name That Plant

Name That Plant is a Node & React application that showcases spaced repetition learning through the use of linked list data structure. The site features authentication and JWTs through the Passport and Bcyrpt libraries. A user can create an account, practice learning latin plant names, sign out, and return to their previous progress after signing back in.

## Motivation
Spaced repetition is a method for efficient learning that has you practice concepts or skills over increasing periods of time. As a student of Western Herbalism and botany, I've had to memorize the common and scientific names of many, many plants. This app is a great solution to the problem and can easily be expanded or changed simply by updating the database. 

## Project Links
- [Live application](https://name-that-plant.herokuapp.com/)
- [Server code repository](https://github.com/neillsom/spaced-repetition-server) 
- [Client code repository](https://github.com/neillsom/spaced-repetition-client)

## Screenshots
Landing page:
![Landing page](https://neillsomerville.s3.us-west-2.amazonaws.com/name-that-plant/landingpage.png "Landing page")

Sample question:
![Sample question](https://neillsomerville.s3.us-west-2.amazonaws.com/name-that-plant/samplequestion.png "Sample question")

Feedback:
![Feedback](https://neillsomerville.s3.us-west-2.amazonaws.com/name-that-plant/feedback.png "Feedback")

Study guide:
![Study guide](https://neillsomerville.s3.us-west-2.amazonaws.com/name-that-plant/studyguide.png "Study guide")

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
	onSubmit = event => {
		event.preventDefault();

		let userAnswer = event.target.userInput.value.toLowerCase();
		this.props.dispatch(
			postAnswer({
				answer: userAnswer,
			})
		);
		event.target.userInput.value = '';
	};

	render() {
		const feedbackData =
			this.props.feedback === undefined ||
			this.props.answered === false ? null : (
				<div className="feedback-board">
					<p>
						{this.props.feedback.feedback} The answer is:{' '}
						<span className="feedback-answer-name">
							{this.props.feedback.answer}
						</span>
					</p>
					<p>
						You answered correctly {this.props.feedback.score} out of{' '}
						{this.props.feedback.total} total times
					</p>
					<p>
						You answered correctly {this.props.sessionCorrectScore} out of{' '}
						{this.props.sessionTotalScore} times this session
					</p>
				</div>
			);

		return (
			<div className="question-board">
				<form
					onSubmit={event => {
						this.onSubmit(event), this.props.dispatch(toggleAnswered());
					}}
				>
					<div className="question-img-container">
						<img
							key={this.props.id}
							src={this.props.question}
							alt={
								'A photo of the medicinal plant called ' + this.props.colloquial
							}
						/>
					</div>

					{this.props.answered === true ? null : (
						<div className="conditional-input-submit">
							<input
								className="userInput"
								type="text"
								name="userInput"
								validate={[required, nonEmpty]}
								required
							/>
							<button className="button-submit">Submit</button>
						</div>
					)}
				</form>
				<div className="feedback">{feedbackData}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	questions: state.questions,
	answered: state.protectedData.answered,
	question: state.protectedData.data.image,
	id: state.protectedData.id,
	feedback: state.protectedData.feedback,
	sessionTotalScore: state.protectedData.sessionTotalScore,
	sessionCorrectScore: state.protectedData.sessionCorrectScore,
	colloquial: state.protectedData.data.colloquial,
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
    - From `YOUR_SERVER_PROJECT_NAME` directory: `npm run seed`

## License
MIT License
Copyright (c) 2018 Neill Somerville

#### http://neillsomerville.com