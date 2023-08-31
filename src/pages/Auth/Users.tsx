import { useEffect, useState } from "react";
import AppHeader from "../../components/app-header";
import AppTable from "../../components/app-table";
import { AppLayout } from "../../layouts/app-layout";
import { getUsers } from "../../actions/users";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let usersData: any;
    const getAllUsers = async () => {
      usersData = await getUsers();
      console.log(usersData);
      setLoading(false);
      setRows(usersData.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <AppLayout>
        <>
          <AppHeader btnTxt={'Create'}/>
          {loading ? null : <AppTable rows={rows} />}
        </>
      </AppLayout>
    </>
  );
};

export default Users;
