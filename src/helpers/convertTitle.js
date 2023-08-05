const convertStageTitle = (inputString) => {
  return inputString
    .replace(/_+/g, " ")
    .replace(/upper/g, "UB")
    .replace(/lower/g, "LB")
    .replace(/r1/g, "round 1")
    .replace(/r2/g, "round 2");
};

export default convertStageTitle;
