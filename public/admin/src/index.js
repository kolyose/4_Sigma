class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-2">
        <form action="/settings" method="post">
          <fieldset>
            <legend>Puzzle game settings</legend>
            <div className="form-group">
              <label for="file" className="col-form-label">Load image:</label>
              <input
                type="file"
                id="file"
                name="file"
                className="form-control-file"
                accept="image/*"
                required
              />
            </div>
            <br />

            <label>Game area dimensions:</label>
            <div className="form-group row">
              <div className="col-sm-5">
                <input
                  type="number"
                  name="width"
                  className="form-control"
                  placeholder="Width"
                  min="1000"
                  max="2000"
                  required
                />
              </div>
              <span className="col-sm-2 form-control-static">x</span>
              <div className="col-sm-5">
                <input
                  type="number"
                  name="height"
                  className="form-control"
                  placeholder="Height"
                  min="1000"
                  max="2000"
                  required
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label for="time" className="col-form-label col-sm-5">
                {" "}Time limit (seconds):{" "}
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  id="time"
                  name="time"
                  className="form-control"
                  min="1"
                  required
                />
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label for="fragments" className="col-form-label col-sm-5">
                Fragments number:
              </label>
              <div className="col-sm-5">
                <select
                  name="fragments"
                  id="fragments"
                  className="form-control"
                >
                  {this.props.fragmentsOptions.map(fragments => (
                    <option key={fragments} value={fragments}>
                      {fragments}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />

            <input type="submit" value="Submit" className="btn btn-primary" />
          </fieldset>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <AdminPanel fragmentsOptions={[12, 20, 30]} />,
  document.getElementById("content")
);
