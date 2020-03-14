import { makeStyles } from "@material-ui/core";

// Card styling

export const cardStyles = makeStyles({
    card: {
        maxWidth: 290,
        textAlign: "center",
        margin:"10px auto",
        padding:"5px",
        backgroundColor:"rgba(240,240,240,0.7)"
    },
    title: {
        fontSize: 16,
        fontFamily:"Verdana"
    },
    content: {
        fontSize: 13,
        fontFamily:"verdana",
        textAlign:"center"
    }
})

// Button styling
export const buttonStyles = makeStyles({
    button: {
        padding:"5px",
        margin: "5px",
        fontFamily:"verdana"
    }
})

