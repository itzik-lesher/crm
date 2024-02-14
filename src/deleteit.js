const deleteCheckedUsersHandler = () => {
  // remove the data lines of deleted users
  setState((state) => {
    let newState = { ...state };
    // save the first line formFieldsContet in case all lines will be
    // in the following filter function
    const firstFormFieldsContet = newState.formFieldsContet[0];
    //const rememberedHeaderColomns = newState.formFields;
    newState.formFieldsContet = newState.formFieldsContet.filter(
      (userElement, index) => {
        // pass through all checkboxes and uncheck them(no matter if checked or not)
        //!!!document.getElementById((index + 1).toString()).checked = false;
        return !deleteArraylist.includes(index + 1);
      }
    );

    let checkBoxItems = document.querySelectorAll(
      "tr.first-line-display-block>td>input"
    );
    let ids = Array.from(checkBoxItems).map((item, index) => {
      // uncheck each checkbox
      document.getElementById((index + 1).toString()).checked = false;
      // remove also from the deletelist
      setDeleteArrayList((deleteArraylist) => {
        return [...deleteArraylist].filter((element) => {
          return element !== parseInt(index);
        });
      });
    });

    // if all lines were deleted we return the saved earlyer first line
    if (newState.formFieldsContet.length === 0) {
      newState.formFieldsContet[0] = firstFormFieldsContet;
      //document.getElementsByClassName('trbody').classList.add('row0');
      newState.first_line_exist = "first-line-display-none";
      setRow0DisplayNone(true);
    } else {
      newState.first_line_exist = "first-line-display-block";
      setRow0DisplayNone(false);
    }

    //newState.formFields = rememberedHeaderColomns;
    //return [...newState, newState.rememberedHeaderColomns];
    ///!!!!setFormFieldsPermanentet(newState.formFieldsContet);
    return newState;
  });
};
