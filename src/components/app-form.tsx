import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Stack,
  Container,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Radio,
  FormControlLabel,
  Switch,
  Button,
  Input,
  FormHelperText,
  FormControl,
  Dialog,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import { useLocation } from "react-router-dom";

export const FormComp = ({
  formConfig,
  transferdata,
  back,
  changeschema,
  Edittransferdata,
  filter,
  filtertransferdata,
}) => {
  const [open, setOpen] = useState({});
  const [imgSource, setImgSource] = useState({
    img: "",
    label: "",
    show: false,
  });

  const route = useLocation();
  const routes = new URLSearchParams(route.search);
  //   let { module, action, id, name } = route.query;
  let action = routes.get("action");

  const formik: any = useFormik({
    initialValues: formConfig.initialValues,
    validationSchema: formConfig.validationSchema,
    onSubmit: (values, event) => {
      if (filter === true) {
        filtertransferdata(values);
      } else {
        if (action === "Edit") {
          Edittransferdata(values);
        } else {
          transferdata(values);
        }
      }
    },
  });
  const handleClose = () => {
    setImgSource({
      img: "",
      label: "",
      show: false,
    });
  };

  const handleSelect = (name, value, e) => {
    formik.setFieldValue(name, e);

    if (
      e === "select" ||
      e === "multiselect" ||
      e === "check" ||
      e === "radiobutton"
    ) {
      changeschema({
        action: true,
        name: name,
        value: e,
      });
    } else {
      if (filter === false) {
        changeschema({
          action: false,
          name: name,
          value: e,
        });
      }
    }
  };
  const handleToggle = (name, value) => {
    if (value === false) {
      formik.setFieldValue(name, true);
      if (
        name === "custome_flow" ||
        name === "init_test_need" ||
        name === "is_training_test_need"
      ) {
        changeschema({
          action: true,
          name: name,
        });
      }
    } else {
      formik.setFieldValue(name, false);
      if (
        name === "custome_flow" ||
        name === "init_test_need" ||
        name === "is_training_test_need"
      ) {
        changeschema({
          action: false,
          name: name,
        });
      }
    }
  };

  const renderControl = (controlConfig) => {
    const { type, name, label, options, errros, disable, ...rest } =
      controlConfig;

    switch (type) {
      case "text":
        return (
          <>
            <TextField
              id={name}
              type={type}
              fullWidth
              error={formik.touched[name] && formik.errors[name]}
              helperText={formik.touched[name] && formik.errors[name]}
              label={label}
              name={name}
              disabled={disable}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[name]}
              {...rest}
            />
          </>
        );
      case "textarea":
        return (
          <>
            <TextField
              multiline
              minRows={4}
              id={name}
              type={type}
              fullWidth
              disabled={disable}
              error={formik.touched[name] && formik.errors[name]}
              helperText={formik.touched[name] && formik.errors[name]}
              label={label}
              name={name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[name]}
              {...rest}
            />
          </>
        );

      case "select":
        return (
          <>
            <FormControl
              fullWidth
              error={formik.touched[name] && formik.errors[name]}
            >
              <InputLabel id={name}>{label}</InputLabel>
              <Select
                labelId={name}
                id={name}
                label={label}
                name={name}
                disabled={disable}
                style={{ width: "100%" }}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  handleSelect(name, formik.values[name], e.target.value)
                }
                value={formik.values[name]}
                error={formik.touched[name] && formik.errors[name]}
                {...rest}
              >
                {options &&
                  options.map((option) => {
                    return (
                      <MenuItem
                        id={option.label}
                        key={option.value}
                        value={option.value}
                        style={{ width: "100%" }}
                      >
                        {option.label}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText>
                {formik.touched[name] && formik.errors[name]}
              </FormHelperText>
            </FormControl>
          </>
        );
      case "checkbox":
        return (
          <>
            <InputLabel id={name}>{label}</InputLabel>
            {options &&
              options.map((option) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        disabled={disable}
                        checked={formik.values[name].includes(option.value)}
                        onChange={formik.handleChange}
                        name={name}
                        value={option.value}
                      />
                    }
                    label={option.label}
                  />
                );
              })}
            <div>{formik.touched[name] && formik.errors[name]}</div>
          </>
        );
      case "toggle":
        return (
          <>
            <InputLabel id={name}>{label}</InputLabel>
            {options &&
              options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  label={formik.values[name]}
                  disabled={disable}
                  checked={formik.values[name]}
                  onChange={(e) => handleToggle(name, formik.values[name])}
                  control={<Switch color="primary" />}
                  labelPlacement="end"
                />
              ))}
            <div>{formik.touched[name] && formik.errors[name]}</div>
          </>
        );
      case "image":
        return (
          <>
            <InputLabel id={name}>{label}</InputLabel>
            <Input
              disabled={disable}
              type="file"
              id="image-input"
              name="image" // Change "image" to the actual field name
              onChange={(event: any) => {
                formik.setFieldValue("file", event.target.files[0]);
              }}
              inputProps={{ "aria-label": "Select Image" }}
            />

            <div>{formik.touched[name] && formik.errors[name]}</div>
          </>
        );
      case "imageview":
        return (
          <>
            <InputLabel id={name}>{label}</InputLabel>
            {formik.values[name] === "" && (
              <div>
                <InputLabel id={name}>{"Image not uploaded"}</InputLabel>{" "}
              </div>
            )}
            {formik.values[name] !== "" && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "30px",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      width: "120px",
                      height: "120px",
                      borderRadius: "20px",
                      borderWidth: "2px",
                      borderColor: "#14ADFF",
                      borderStyle: "solid",
                      padding: "5px",
                    }}
                    id={name}
                    src={`data:image/png;base64, ${formik.values[name]}`}
                    alt={label}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      setImgSource({
                        img: formik.values[name],
                        label: label,
                        show: true,
                      })
                    }
                  >
                    Preview
                  </Button>
                </div>
              </>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Box maxWidth={"700px"} width={"100%"} margin={"auto"} padding={"20px"}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              {formConfig.controls.map((control) => (
                <Box key={control.name} paddingBottom={"15px"}>
                  {renderControl(control)}
                </Box>
              ))}

              <Button
                onClick={() => {
                  back();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Box>
      </Stack>


    </Container>
  );
};
