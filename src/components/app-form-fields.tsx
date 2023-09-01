import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { FormComp } from "./app-form";
import { AppLayout } from "../layouts/app-layout";
import { UsersYup } from "../validations/app-validations";
import { getUsers, updateUsers, postUsers } from "../redux/actions/users";

import { images } from "../utils/image-exports";

const AppForm = () => {
  const dispatch: any = useDispatch();
  const router = useNavigate();
  const route = useLocation();
  const routes = new URLSearchParams(route.search);
  let module = routes.get("module");
  let action = routes.get("action");
  let id = routes.get("id");
  console.log(module, action, id);

  // let { module, action, id, name, type, email } = route.query;
  let form_type = ["applied", "training", "earning"];
  let [loadform, setloadform] = useState(false);

  // Users
  let [userformConfig, setuserformConfig] = useState({
    initialValues: {
      account_id: "",
      name: "",
      email: "",
      password: "",
      address: "",
      phone_number: "",
      dob: "",
      role: "",
      user_group: "",
    },
    validationSchema: UsersYup,
    onSubmit: async (values) => {},
    formSection: [
      {
        formSectionTitle: "Basic Information",
        controls: [
          {
            type: "text",
            name: "name",
            label: "Name",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "avatar",
            label: "Avatar",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "username",
            label: "User Name",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "email",
            label: "Email",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "phone",
            label: "Phone",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "website",
            label: "Website",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "company",
            label: "Company",
            disable: false,
            required: true,
          },
          {
            type: "",
            name: "",
            label: "",
            disable: false,
            required: false,
          },
          {
            type: "select",
            name: "role",
            label: "Role",
            options: [
              {
                label: "Admin",
                value: "Admin",
              },
            ],
            disable: false,
            required: true,
          },
          {
            type: "select",
            name: "user_group",
            label: "User Group",
            options: [
              {
                label: "Superadmin",
                value: "Superadmin",
              },
            ],
            disable: false,
            required: true,
          },
          {
            type: "address",
            name: "address",
            label: "Address",
            disable: false,
            required: false,
          },
        ],
      },
      {
        formSectionTitle: "Complex Information",
        controls: [
          {
            type: "text",
            name: "name",
            label: "Name",
            disable: false,
            required: true,
          },

          {
            type: "text",
            name: "email",
            label: "Email",
            disable: false,
            required: true,
          },
          {
            type: "text",
            name: "phone",
            label: "Phone",
            disable: false,
            required: true,
          },

          {
            type: "address",
            name: "address",
            label: "Address",
            disable: false,
            required: false,
          },
        ],
      },
    ],
  });
  // Users

  useEffect(() => {
    switch (module) {
      case "Users":
        if (action === "Edit" || action === "Create") {
          console.log(module);

          if (action === "Edit") {
            console.log(module);

            getapidata();
          }
          if (module === "Users" && action === "Create") {
            // function
            console.log(module);
            loadSchemeData();
          } else if (action === "Create") {
            console.log(module);

            setloadform(true);
          }
        } else {
          router("/404");
        }
    }
    // if (module === "Users") {
    //   if (action === "Edit" || action === "Create") {
    //     if (action === "Edit") {
    //       getapidata();
    //     }
    //     if (module === "Users" && action === "Create") {
    //       // function
    //     } else if (action === "Create") {
    //       setloadform(true);
    //     }
    //   } else {
    //     router("/404");
    //   }
    // } else {
    //   router("/404");
    // }
  }, []);

  const loadSchemeData = async () => {
    switch (module) {
      case "Users":
        setloadform(true);
    }
  };

  const getapidata = async () => {
    if (module === "Users") {
      let usersFetch = await dispatch(getUsers());

      if (usersFetch.status === 200) {
        setuserformConfig((set) => {
          let obj = usersFetch.data.data[0];
          delete obj._id;
          delete obj.avatar_url;
          delete obj.referral_id;
          delete obj.myreferral_id;
          delete obj.auth;
          delete obj.active;
          delete obj.createdBy;
          delete obj.updatedBy;
          delete obj.createdAt;
          delete obj.updatedAt;
          delete obj.__v;

          set.initialValues = obj;

          return set;
        });
      } else {
        router("/404");
      }
    }
  };

  const Edittransferdata = async (data) => {
    if (module === "Users") {
      try {
        // let userEdit = await dispatch(
        //   updateUsers({
        //     id: id,
        //     name: data.name,
        //     address: data.address,
        //     phone_number: data.phone_number,
        //     user_group: data.user_group,
        //     active: true,
        //   })
        // );
        // if (userEdit.status === 200) {
        //   back();
        // }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const transferdata = async (data: any) => {
    switch (module) {
      case "Users":
        const date = new Date();
        const options: any = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        data.dob = formattedDate;
        let userCreate = await dispatch(postUsers(data));
        if (userCreate.status === 201) {
          back();
        }
    }
    // if (module === "Users") {
    //   const date = new Date();
    //   const options: any = { year: "numeric", month: "long", day: "numeric" };
    //   const formattedDate = date.toLocaleDateString("en-US", options);

    //   data.dob = formattedDate;
    //   let userCreate = await dispatch(postUsers(data));
    //   if (userCreate.status === 201) {
    //     back();
    //   }
    // }
  };
  const back = () => {
    if (module === "Users") {
      router("/");
    }
  };

  const changeschema = (value) => {
    setuserformConfig((set: any) => {
      set.formSection.map((formSecInfo) => {
        let arr = formSecInfo.controls.map((ele) => {
          console.log(ele);
          console.log(value);

          console.log(ele["name"] == "user_group");
          console.log(value);

          if (value["value"] == "Superadmin") {
            console.log("element", ele["name"]);
            if (ele["name"] == "password") {
              ele.disable = true;
            }
          }
          console.log(ele.disable);

          return ele;
        });
        set.controls = arr;
      });
      return set;
    });
  };

  const handleSubmit = () => {
    
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h6">
                  {action} {module}
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup size="small" aria-label="small button group">
                  <Button key="one" onClick={() => handleSubmit}>Save</Button>
                </ButtonGroup>
                <ButtonGroup
                  color="secondary"
                  aria-label="medium secondary button group"
                >
                  <Button key="one">Cancel</Button>
                </ButtonGroup>
                <ButtonGroup size="large" aria-label="large button group">
                  <Button key="one">Search</Button>
                </ButtonGroup>
              </Box>
            </Stack>
            {loadform && (
              //   <Card spacing={3}>
              <>
                <FormComp
                  back={back}
                  Edittransferdata={Edittransferdata}
                  transferdata={transferdata}
                  formConfig={module === "Users" ? userformConfig : ""}
                  filter={undefined}
                  filtertransferdata={undefined}
                  changeschema={changeschema}
                />
              </>
              //   </Card>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default AppForm;
