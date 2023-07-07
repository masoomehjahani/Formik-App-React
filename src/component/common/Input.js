// this is an controll component ,mean: input data are dynamic and with props 
// and dont have any state in this component
const Input = ({name,label,formik,type="text"}) => {
    return ( 
        <div className="formControl" >
          <label htmlFor={name}>{label}</label>
          <input id={name}
          type={type}
          name={name}
          //  onChange={formik.handleChange}
          //  onBlur = {formik.handleBlur}
          //  value={formik.values.name}
          {...formik.getFieldProps({name})}/>
           {formik.errors[name] && formik.touched[name] && (
           <div className="error">{formik.errors[name]}</div>
           )}
        </div>
     );
}
 
export default Input;