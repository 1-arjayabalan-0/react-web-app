import { useState, useEffect } from "react";
import { Box, Card, Container, Stack, Typography } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { FormComp } from "./app-form";
import { AppLayout } from "../layouts/app-layout";
import { UsersYup } from "../validations/app-validations";
import { getUsers, updateUsers, postUsers } from "../redux/actions/users";

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
        name: "password",
        label: "Password",
        disable: false,
        required: true,
      },
      {
        type: "textarea",
        name: "address",
        label: "Address",
        disable: false,
        required: true,
      },
      {
        type: "text",
        name: "phone_number",
        label: "Phone Number",
        disable: false,
        required: true,
      },
      // {
      //     type: 'text',
      //     name: 'dob',
      //     label: 'D.O.B',
      //     disable: false,
      //     required: false
      // },
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
    ],
  });
  // Users

  useEffect(() => {
    if (module === "Users") {
      setloadform(true);

      if (action === "Edit" || action === "Create") {
        if (action === "Edit") {
          getapidata();
        }
        if (module === "Users" && action === "Create") {
          // function
        } else if (action === "Create") {
          setloadform(true);
        }
      } else {
        router("/404");
      }
    } else {
      router("/404");
    }
  }, []);

  const getapidata = async () => {
    if (module === "Users") {
      let usersFetch = await dispatch(
        getUsers()
        )
        
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
    if (module === "Users") {
      const date = new Date();
      const options: any = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options);

      data.dob = formattedDate;
      let userCreate = await dispatch(postUsers(data));
      if (userCreate.status === 201) {
        back();
      }
    }
  };
  const back = () => {
    if (module === "Users" || module === "UsersPassword") {
      router("/user");
    }
  };

  //   const changeschema = (value) => {
  //     setjobformConfig((set) => {
  //       let condition = "";
  //       if (value.name === "init_test_need") {
  //         condition = "init_test_form_id";
  //         set.initialValues["init_test_need"] = false;
  //         set.initialValues["init_test_form_id"] = "";
  //       }
  //       if (value.name === "is_training_test_need") {
  //         condition = "training_test_form_id";
  //         set.initialValues["is_training_test_need"] = false;
  //         set.initialValues["training_test_form_id"] = "";
  //       }
  //       if (value.name === "custome_flow") {
  //         condition = "custom_router";
  //         set.initialValues["custome_flow"] = false;
  //         set.initialValues["custom_router"] = "";
  //       }
  //       let arr = set.controls.map((elm) => {
  //         if (elm.name === condition) {
  //           elm.disable = !value.action;
  //         }
  //         return elm;
  //       });
  //       set.controls = arr;
  //       return set;
  //     });
  //   };

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
                <Typography variant="h4">
                  {action} {module}
                </Typography>
              </Stack>
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
                  changeschema={undefined}
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
