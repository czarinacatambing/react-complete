import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'
// import person from './Person/Person.js';
// import Radium, { StyleRoot } from 'radium'

class App extends Component {
  state = {
    persons: [
      {id:'asdt', name: 'Max', age:28 },
      {id: 'hello' , name: 'Manu', age: 29 },
      {id: 'hi' , name: 'Stephanie', age:20}
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    // allows a complete copy of the persons array, and not a pointer to the array
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p=> {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // alternative
    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name =event.target.value;

    // this is still current state array
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'

    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div >
          {this.state.persons.map((person, index) => {
              return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                key= {person.id} 
                changed={(event) => this.nameChangedHandler(event, person.id) } />
            })
          }
        </div>
        
      );
      style.backgroundColor = 'red';

    }
    let classes = []
    if (this.state.persons.length <=2) {
      classes.push('red');
    }
    if (this.state.persons.length <=1){
      classes.push('bold')
    }


    return (

      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}> This is really working! </p>
        <button style={style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
          
          
          

      </div>

    );
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hello!')  )
    // el. configuration, children or... what is nested inside div
  }
}

// higher order component 
export default App;
