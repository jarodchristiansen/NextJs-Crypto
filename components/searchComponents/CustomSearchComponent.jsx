const CustomSearchComponent = ({
  onTextChange,
  handleSubmit,
  onSelectionChange,
  searchSelection,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row g-0">
          <div className="col g-0">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                console.log("this is select change", e.target.value);
                onSelectionChange(e.target.value);
              }}
            >
              <option selected value={"Assets"}>
                Assets
              </option>
              <option value="Exchanges">Exchanges</option>
              {/*<option value="2">Two</option>*/}
              {/*<option value="3">Three</option>*/}
            </select>
          </div>
          <div className="col g-0 w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Asset Search"
              aria-label="Asset Search"
              onChange={onTextChange}
            />
          </div>
          <div className="col g-0">
            <button
              type={"submit"}
              className={"h-100 standardized-button"}
              // onClick={(e) => e.preventDefault()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomSearchComponent;
