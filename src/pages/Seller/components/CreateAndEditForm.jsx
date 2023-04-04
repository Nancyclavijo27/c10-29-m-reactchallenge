import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import Upload from "./Upload";
import * as Yup from "yup";
import salesService from "../../../services/sales";
// import { userService, alertService } from '@/_services';

function CreateAndEditForm({ match }) {
  const id = match;
  const isAddMode = !id;
  const user = useSelector((store) => store.auth?.user);
  const notify = () => toast.success("Evento creado con éxito!");
  //error evento 
  const errorEvent = () => toast.error("Error al crear el evento");

  const initialValues = {
    place: "",
    time: "",
    ability: "",
    price: "",
    image: "https://firebasestorage.googleapis.com/v0/b/no-country-ticket.appspot.com/o/1455da98-1051-4bc1-962d-c6fab39223ad?alt=media&token=95291e23-176a-4611-80bd-67a3547e9dac",
    title: "",
    description: "",
  };


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Por favor ingrese una descripcion"),
    // lastName: Yup.string().required("Last Name is required"),
    // email: Yup.string().email("Email is invalid").required("Email is required"),
    // role: Yup.string().required("Role is required"),
    // password: Yup.string()
    //   .concat(isAddMode ? Yup.string().required("Password is required") : null)
    //   .min(6, "Password must be at least 6 characters"),
    // confirmPassword: Yup.string()
    //   .when("password", (password, schema) => {
    //     if (password || isAddMode)
    //       return schema.required("Confirm Password is required");
    //   })
    //   .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting);
    } else {
      updateUser(id, fields, setSubmitting);
    }
  }

  function createUser(fields, setSubmitting) {
    // userService.create(fields)
    //     .then(() => {
    //         alertService.success('User added', { keepAfterRouteChange: true });
    //         history.push('.');
    //     })
    //     .catch(() => {
    //         setSubmitting(false);
    //         alertService.error(error);
    //     });
    try {
      console.log("fields", fields);
      // alertService.success('User added', { keepAfterRouteChange: true });
      salesService.createSale(fields, user.uid)
      // history.push('.');
    } catch (error) {
      setSubmitting(false);
    }
  }

  function updateUser(id, fields, setSubmitting) {
    // userService.update(id, fields)
    //     .then(() => {
    //         alertService.success('User updated', { keepAfterRouteChange: true });

    //     })
    //     .catch(error => {
    //         setSubmitting(false);
    //         alertService.error(error);
    //     });
    try {
      console.log("fields", fields);
      // alertService.success('User added', { keepAfterRouteChange: true });
      // history.push('.');
    } catch (error) {
      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        const [user, setUser] = useState({});
        const [showPassword, setShowPassword] = useState(false);

        useEffect(() => {
          // if (!isAddMode) {
          //     // get user and set form fields
          //     userService.getById(id).then(user => {
          //         const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
          //         fields.forEach(field => setFieldValue(field, user[field], false));
          //         setUser(user);
          //     });
          // }
        }, []);

        return (
          <Form>
            <h1>{isAddMode ? "Crear Evento" : "Modificar evento"}</h1>
            <div>
              <label htmlFor="title">Nombre</label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Nombre del evento"
              />
              <ErrorMessage name="title" />
            </div>

            <div>
              <label htmlFor="place">Lugar</label>
              <Field
                type="text"
                id="place"
                name="place"
                placeholder="Lugar del evento"
              />
              <ErrorMessage name="place" />
            </div>

            <div>
              <label htmlFor="time">Fecha/horario</label>
              <Field
                type="datetime-local"
                id="time"
                name="time"
                placeholder="Fecha/horario del evento"
              />
              <ErrorMessage name="time" />
            </div>

            <div>
              <label htmlFor="ability">Capacidad</label>
              <Field
                type="number"
                id="ability"
                name="ability"
                placeholder="Capacidad del evento"
              />
              <ErrorMessage name="ability" />
            </div>

            <div>
              <label htmlFor="price">Precio</label>
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Precio del evento"
              />
              <ErrorMessage name="price" />
            </div>

            <div>
              {/* <label htmlFor="image">Imagen</label>
                  <Field
                    type={"file"}
                    id="image"
                    name="image"
                    placeholder="Imagen de evento"
                  />
                  <ErrorMessage name="image" /> */}
              <Upload />
            </div>

            <div>
              <label htmlFor="description">Descripcion</label>
              <Field
                as="textarea"
                type="text"
                id="description"
                name="description"
                placeholder="Descripcion del evento"
              />
              <ErrorMessage name="description" />
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                Save
              </button>
              <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                Cancel
              </Link>
                    <ToastContainer />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateAndEditForm;
