import { useState } from "react";
import React from "react";
import {formik, useFormik} from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import axsios from "axios"
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";
import CheckboxInput from "./common/CheckboxInput";
import axios from "axios";

const savedData ={
  name:"mastaneh" ,
  email:"mastan@gmail.com" ,
  phoneNumber:"09128894900",
  password:"Mast@n123",
  passwordConfirm:"Mast@n123",
  gender : "1",
  nationality:"IR",
};

const radioOptions =[
  {label:"male", value:"0"},
  {label:"female" , value:"1"}
];

const selectOptions =[
  {label:"select nationality...", value:""},
  {label:"Iran" , value:"IR"},
  {label:"Germany" , value:"GER"},
  {label:"USA" , value:"US"}
];
const checkBoxOptions =[
  {label:"react.js", value:"R"},
  {label:"veu.js" , value:"V"}
];

const initialValues ={
  name:"" ,
  email:"" ,
  phoneNumber:"",
  password:"",
  passwordConfirm:"",
  gender : "",
  nationality: "",
  // beacuse u can select multi option
  intrests:[],
  terms:false,
};
const onSubmit = (values) =>{
  axios.post("http://localhost:3001/users",values)
  .then(res => console.log(res)
  .catch(error => console.log(error)))} ;

// const validate = (values) =>{
//   let errors = {};

//   if (!values.name){
//     errors.name="name is required"
//   }
//   if (!values.email){
//     errors.email="email is required"
//   }
//   if (!values.password){
//     errors.password="password is password"
//   }
//   return errors;
// }

const validationSchema = Yup.object({
  name: Yup.string().required("name is required")
       .min(6,"name length not valid"),
  email : Yup.string()
  .email("invalid email format")
  .required("email is required"),
  phoneNumber: Yup.string().required("phonNumber is required")
             .matches(/^[0-9]{11}$/,"phone number not valid"),
  password: Yup.string().required("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
  passwordConfirm : Yup.string().required("passwordConfirm is required")
  .oneOf([Yup.ref("password"),null],"password must match"),
  gender:Yup.string().required("gender is required"),
  nationality:Yup.string().required("nationality is required"),
  intrests:Yup.array().min(1).required("at least select one interest"),
  terms:Yup.boolean().required("the terms and condition must be accept")
  .oneOf([true],"the terms and condition must be accept."),
});

const SignUpForm = () => {
    // const[userData,setUserData] = useState({name:"" ,email:"" ,password:""});
  
    // for load saved data
    const [formValues,setFormValues] = useState(null);
    const formik = useFormik({
        initialValues :formValues || initialValues,
        onSubmit:onSubmit,
        // validate,
        validationSchema,

        // moghe load form validation tavasot formik chek shavad
        validateOnMount:true,

        // for load saved data
        enableReinitialize:true,
    });
console.log(formik.values);
    useEffect(() =>{
      axsios.get("http://localhost:3001/users/1")
      .then(res => setFormValues(res.data))
      .catch(error => console.log(error))
    } ,[]);
    // console.log(formik.values);
    // const changeHandler = (e) => {
    //     console.log("dddd");
    //     setUserData({...userData , [e.target.name] :e.target.value});
    // };

    // const submitHandler = (e) =>{
    //  e.preventDefault();
    // };

    return (
    <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} label="name" name="name"/>
        <Input formik={formik} label="email" name="email"/>
        <Input formik={formik} label="phone Number" name="phoneNumber"/>
        <Input formik={formik} label="password" name="password" type="password"/>
        <Input formik={formik} label="passwordConfirm" name="passwordConfirm" type="password"/>
        <RadioInput formik={formik} radioOptions={radioOptions} name="gender"/>
        <SelectComponent formik={formik} selectOptions={selectOptions} name="nationality"/>
        <CheckboxInput formik={formik} checkBoxOptions={checkBoxOptions} name="intrests"/>
        <div className="formControl" >
          <input 
           type="checkbox"
           id="terms"
           name="terms"
           value={true}
           onChange={formik.handleChange}
           checked={formik.values.terms}/>
          <label htmlFor="terms">terms and conditions</label>
        
          {formik.errors.terms && formik.touched.terms && (
           <div className="error">{formik.errors.terms}</div>
           )} 
           </div>
        <button onClick={() => setFormValues(savedData)} >load Data</button>
        <button type="submit" disabled={!formik.isValid}>submit</button>
    </form> 
    );
}
 
export default SignUpForm;

// 1: managing state : by name of input matched with initialValue of formik & handelChange
// 2: handling form submition : by onsubmit function with parameter valu & handelSubmit
// 3: validation, error message : by validate and errors of formik
// do all by formik -react library
// handel ontuch for show error when tuch by   handelBlur formik
// for easly error handel(for type , ..) npm i yup