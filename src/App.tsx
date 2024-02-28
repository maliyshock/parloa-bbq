import React, { useCallback, useEffect } from "react";
import { Layout, notification } from "antd";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { Customers } from "~features/customers/Customers";
import { useGetCustomersQuery } from "~services/customers";
import { initCustomers } from "~features/customers/customersSlice";
import { Actions } from "~features/customers/actions/Actions";
import { RootState } from "~/store/store";
import { CustomerModal } from "~features/customers/CustomerModal";
import { NotificationType } from "~/types";
import { StateHandler } from "~/components/StateHandler";

const { Header, Footer, Sider, Content } = Layout;

const useStyles = createUseStyles({
  header: {
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  },
  content: {
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
    padding: "20px",
  },
  sidebar: {
    top: "0px",
    lineHeight: "120px",
    alignSelf: "flex-start",
    padding: "20px",
    textAlign: "left",
    zIndex: "1",
  },
  footer: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  },
  wrapper: {
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  layout: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#fff",
    minHeight: "100dvh",

    "& > [class*='sidebar-']": {
      position: "sticky",
      backgroundColor: "white",
    },

    "& > [class*='sider-collapsed']": {
      padding: "0",
    },
  },
});

function App() {
  const classes = useStyles();
  const editCustomer = useSelector((state: RootState) => state.customers.edit);
  const show = useSelector((state: RootState) => state.customers.showDialog);
  const { data } = useGetCustomersQuery();
  const dispatch = useDispatch();
  const { error, isLoading } = useGetCustomersQuery();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (type: NotificationType) => {
      api[type]({
        message: "Something happened",
        description:
          "Unfortunately there was an error. :( Try to refresh the page",
      });
    },
    [api],
  );

  useEffect(() => {
    if (data) {
      dispatch(initCustomers(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      openNotification("error");
    }
  }, [error, openNotification]);

  return (
    <>
      {contextHolder}
      {show && <CustomerModal customer={editCustomer} show={show} />}
      <Layout className={classes.layout}>
        <Header className={classes.header}>Header</Header>
        <Layout className={classes.layout} hasSider>
          <Sider
            breakpoint="lg"
            className={classes.sidebar}
            collapsedWidth="0"
            width={300}
          >
            <StateHandler error={!!error} isLoading={isLoading}>
              <Actions />
            </StateHandler>
          </Sider>
          <Content className={classes.content}>
            <div className={classes.wrapper}>
              <StateHandler error={!!error} isLoading={isLoading}>
                <Customers />
              </StateHandler>
            </div>
          </Content>
        </Layout>
        <Footer className={classes.footer}>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
