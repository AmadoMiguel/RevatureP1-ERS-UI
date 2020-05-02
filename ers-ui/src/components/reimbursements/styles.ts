import { makeStyles } from "@material-ui/core";

export const tableStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      maxWidth:100
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));