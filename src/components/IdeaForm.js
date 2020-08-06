import React from 'react';

function IdeaForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="form-group">
        <label htmlFor="ideaInput">Idea</label>
        <div className="field">
          <input
            id="ideaInput"
            type="text"
            name="ideaInput"
            onChange={props.onChange}
            className="form-control"
            value={props.input.ideaInput}
            errors={props.errors.ideaInput}
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
            onChange={props.onChange}
            className="form-control"
            value={props.input.shortIdeaName}
            errors={props.errors.ideaInput}
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
            onChange={props.onChange}
            className="form-control"
            value={props.input.rating}
            errors={props.errors.ideaInput}
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
            onChange={props.onChange}
            className="form-control"
            value={props.input.ideaDescription}
            errors={props.errors.ideaInput}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <div className="field">
          <select
            id="category"
            name="category"
            onChange={props.onChange}
            value={props.input.category || ''}
            className="form-control"
            errors={props.errors.ideaInput}
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
  );
}

export default IdeaForm;
