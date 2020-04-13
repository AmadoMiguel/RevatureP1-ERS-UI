import { makeStyles } from "@material-ui/core";

export const loginFormStyles = makeStyles({
    title: {
        marginTop:"5px"
    },
    input:{
        backgroundColor:"rgba(100, 100, 130, 0.8)",
        padding:"10px",
        margin:"6px"
    },
    button: {
        backgroundColor: "rgba(60, 60, 200, 0.6)",
        width:215,
        margin:"10px auto",
        padding:"7px"
    }    
})

export const bootstrapGrid = {
    form: "col-xl-4 col-lg-6 col-sm-6",
    inputFields: "col-xl-12 col-lg-12 col-sm-12",
    loginButton: "col-xl-6 col-lg-6 col-sm-3"
}
