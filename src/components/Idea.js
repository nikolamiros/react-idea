import React, { useState } from 'react';
import db from '../firebase';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import firebase from 'firebase';

function Idea(props) {
  const [activateModal, setActivateModal] = useState({ visible: false });
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    ideaInput: '',
    shortIdeaName: '',
    rating: '',
    ideaDescription: '',
    category: null,
  });

  const showModal = () => {
    setActivateModal({
      visible: true,
    });
  };

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

  const updateIdea = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    db.collection('ideas').doc(props.idea.id).set(
      {
        ideaInput: input.ideaInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        shortIdeaName: input.shortIdeaName,
        rating: input.rating,
        ideaDescription: input.ideaDescription,
        category: input.category,
      },
      { merge: true }
    );
    setInput({
      ideaInput: '',
      shortIdeaName: '',
      rating: '',
      ideaDescription: '',
      category: null,
    });
    setActivateModal({
      visible: false,
    });
  };

  return (
    <div>
      <Modal
        title="Detail"
        centered
        visible={activateModal.visible}
        onCancel={() => setActivateModal(false)}
        footer={null}
        width={1000}
      >
        <form onSubmit={updateIdea}>
          <div className="form-group">
            <label htmlFor="ideaInput">Idea</label>
            <div className="field">
              <input
                id="ideaInput"
                type="text"
                name="ideaInput"
                onChange={handleChange}
                className="form-control"
                value={input.ideaInput}
                errors={errors.ideaInput}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="shortIdeaName">Short Idea Name</label>
            <div className="field">
              <input
                id="shortIdeaName"
                type="text"
                name="shortIdeaName"
                onChange={handleChange}
                className="form-control"
                value={input.shortIdeaName}
                errors={errors.shortIdeaName}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating (only number)</label>
            <div className="field">
              <input
                id="rating"
                min="1"
                max="10"
                type="number"
                name="rating"
                onChange={handleChange}
                className="form-control"
                value={input.rating}
                errors={errors.rating}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ideaDescription">
              Description of Expectation from Idea
            </label>
            <div className="field">
              <textarea
                id="ideaDescription"
                type="text"
                name="ideaDescription"
                onChange={handleChange}
                className="form-control"
                value={input.ideaDescription}
                errors={errors.ideaDescription}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="field">
              <select
                id="category"
                name="category"
                onChange={handleChange}
                value={input.category || ''}
                className="form-control"
                errors={errors.category}
              >
                <option value="" />
                <option value="Personal Life1">Personal Life</option>
                <option value="Work">Work</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </Modal>

      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{props.idea.ideaInput}</h5>
              <br />
              <h6 class="card-subtitle mb-2 text-muted">
                Rating: {props.idea.rating}
              </h6>
              <h6 class="card-subtitle mb-2 text-muted">
                Category: {props.idea.category}
              </h6>
              <br />
              Description:
              <p>{props.idea.ideaDescription}</p>
              <button
                type="button"
                className="btn btn-primary btn-xs float-right"
                style={{ margin: '5px' }}
                onClick={() => {
                  showModal();
                  db.collection('ideas')
                    .doc(props.idea.id)
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        setInput({
                          ideaInput: doc.data().ideaInput,
                          shortIdeaName: doc.data().shortIdeaName,
                          rating: doc.data().rating,
                          ideaDescription: doc.data().ideaDescription,
                          category: doc.data().category,
                        });
                      }
                    });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-xs float-right"
                style={{ margin: '5px' }}
                onClick={() =>
                  db.collection('ideas').doc(props.idea.id).delete()
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Idea;
