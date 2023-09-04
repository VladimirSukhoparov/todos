import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { filterTodos } from "../../redux/todoSlice";
import { Button, Typography } from "@mui/material";
import "./style.css";

const FilterList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filterMode);
  const handleClick = (text: MouseEvent<HTMLButtonElement>) => {
    dispatch(filterTodos(text.currentTarget.innerText));
  };

  return (
    <div>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Show:
        <Button
          variant="outlined"
          style={{ margin: "0 5px" }}
          className={filter === "ALL" ? "disabled" : ""}
          onClick={(e) => handleClick(e)}
        >
          All
        </Button>
        <Button
          variant="outlined"
          style={{ marginRight: "5px" }}
          className={filter === "ACTION" ? "disabled" : ""}
          onClick={(e) => handleClick(e)}
        >
          Action
        </Button>
        <Button
          variant="outlined"
          className={filter === "COMPLETE" ? "disabled" : ""}
          onClick={(e) => handleClick(e)}
        >
          Complete
        </Button>
      </Typography>
    </div>
  );
};

export default FilterList;
