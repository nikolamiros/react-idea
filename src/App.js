import React, { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import db from './firebase';
import firebase from 'firebase';
import Idea from './components/Idea';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    ideaInput: '',
    shortIdeaName: '',
    rating: '',
    ideaDescription: '',
    category: null,
  });

  useEffect(() => {
    db.collection('ideas')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setIdeas(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ideaInput: doc.data().ideaInput,
            shortIdeaName: doc.data().shortIdeaName,
            rating: doc.data().rating,
            ideaDescription: doc.data().ideaDescription,
            category: doc.data().category,
          }))
        );
      });
  }, []);

  function handleChange({ target }) {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!input.ideaInput) _errors.title = 'Idea is required';
    if (!input.shortIdeaName) _errors.authorId = 'Short Idea Name is required';
    if (!input.rating) _errors.category = 'Rating is required';
    if (!input.ideaDescription)
      _errors.category = 'Description of Expectation from Idea is required';
    if (!input.category) _errors.category = 'Category is required';

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  const addIdea = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    db.collection('ideas').add({
      ideaInput: input.ideaInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      shortIdeaName: input.shortIdeaName,
      rating: input.rating,
      ideaDescription: input.ideaDescription,
      category: input.category,
    });
    setInput({
      ideaInput: '',
      shortIdeaName: '',
      rating: '',
      ideaDescription: '',
      category: null,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="jumbotron text-center">
            <h1>Add Your Current Idea</h1>
            <IdeaForm
              onChange={handleChange}
              onSubmit={addIdea}
              input={input}
              errors={errors}
            />
          </div>
          <br />
          <br />
          <ul className="list-group">
            <h3>My Ideas:</h3>
            <br />
            {ideas.map((idea) => (
              <Idea idea={idea} key={idea.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
