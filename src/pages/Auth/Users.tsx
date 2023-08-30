import AppHeader from "../../components/app-header";
import AppTable from "../../components/app-table";
import { AppLayout } from "../../layouts/app-layout";

const Users = () => {
  return (
    <>
      <AppLayout>
        <>
          <AppHeader />
          <AppTable />
        </>
      </AppLayout>
    </>
  );
};

export default Users;
