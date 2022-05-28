const CustomSearchComponent = ({
  onTextChange,
  handleSubmit,
  onSelectionChange,
  searchSelection,
  onFilterChange,
  filterSelection,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-0">
        <div className="col g-0">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              onSelectionChange(e.target.value);
            }}
            value={searchSelection}
          >
            <option selected value={"Assets"}>
              Assets
            </option>
            <option value="Exchanges">Exchanges</option>
            {/*<option value="2">Two</option>*/}
            {/*<option value="3">Three</option>*/}
          </select>
        </div>
        {/*{searchSelection === "Assets" ? (*/}
        {/*  <div className="col g-0">*/}
        {/*    <select*/}
        {/*      className="form-select"*/}
        {/*      aria-label="Default select example"*/}
        {/*      onChange={(e) => {*/}
        {/*        // onFilterChange(e.target.value);*/}
        {/*      }}*/}
        {/*      // value={filterSelection}*/}
        {/*    >*/}
        {/*      <option selected value={"Market Cap"}>*/}
        {/*        Market Cap*/}
        {/*      </option>*/}
        {/*      /!*<option value="Circulating Supply">Circulating Supply</option>*!/*/}
        {/*      /!*<option value="2">Two</option>*!/*/}
        {/*      /!*<option value="3">Three</option>*!/*/}
        {/*    </select>*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div className="col g-0">*/}
        {/*    <select*/}
        {/*      className="form-select"*/}
        {/*      aria-label="Default select example"*/}
        {/*      onChange={(e) => {*/}
        {/*        onFilterChange(e.target.value);*/}
        {/*      }}*/}
        {/*      // value={filterSelection}*/}
        {/*    >*/}
        {/*      <option value={"Year Established"}>Year Established</option>*/}
        {/*      <option value="Trust Score">Trust Score</option>*/}
        {/*      <option value="BTC Trade Vol">BTC Trade Vol</option>*/}
        {/*      /!*<option value="2">Two</option>*!/*/}
        {/*      /!*<option value="3">Three</option>*!/*/}
        {/*    </select>*/}
        {/*  </div>*/}
        {/*)}*/}

        <div className="col g-0">
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
  );
};

export default CustomSearchComponent;
