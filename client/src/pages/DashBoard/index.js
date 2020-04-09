import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Grid } from "@material-ui/core";
import ColumnBoard from "../../components/ColumnBoard";
import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";

const backgroundShape = require("../../images/shape.svg");

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 400,
    height: "100%",
  },
  grid: {
    maxWidth: 1000,
    margin: "30px auto 30px",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)",
    },
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
  },
});

class DashBoard extends Component {
  static contextType = AuthContext;

  state = {
    board: undefined,
    isLoading: true,
  };

  componentDidMount() {
    this.refreshBoard();
  }

  refreshBoard = () => {
    const { authToken } = this.context;

    API.Boards.getMy(authToken)
      .then((res) => this.setState({ board: res.data, isLoading: false }))
      .catch((err) => console.log(err));    
  }

  render() {
    const { classes } = this.props;
    const { board, isLoading } = this.state;

    return (
      <div className={classes.root}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Grid container justify="left">
            <Grid spacing={2} container item className={classes.grid}>
              {board.columns.map((column) => (
                <ColumnBoard boardId={board._id} {...column} handleRefresh={this.refreshBoard} />
              ))}
              {/* <ColumnBoard title="To Do" />
              <ColumnBoard title = "In Progress"  />
              <ColumnBoard title="Done" />
              <ColumnBoard title="Ice Box" />
             */}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(DashBoard);
