import { Button, Divider, Form, Space } from "antd";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { createUseStyles } from "react-jss";
import Title from "antd/lib/typography/Title";
import { Filters } from "~features/customers/actions/Filters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { dialog, remove } from "~features/customers/customersSlice";

const useStyles = createUseStyles({
  space: {
    width: "100%",
  },
  dropdown: {
    "& *:first-letter": {
      textTransform: "capitalize",
    },
  },
});

export function Actions() {
  const selected = useSelector((state: RootState) => state.customers.selected);
  const customers = useSelector((state: RootState) => state.customers);
  const classes = useStyles();
  const dispatch = useDispatch();
  const thereAreSelected = selected.length > 0;

  const inactiveCustomers = useMemo(
    () =>
      customers.data.reduce<string[]>((acc, customer) => {
        return !customer.isActive ? [...acc, customer.id] : acc;
      }, []),
    [customers.data],
  );

  return (
    <div>
      <Title level={4}>Actions</Title>
      <Form layout="vertical">
        <Space className={classes.space} direction="vertical" size="middle">
          <Button
            block
            icon={<PlusSquareOutlined />}
            type={"primary"}
            onClick={() => dispatch(dialog({ show: true }))}
          >
            New Customer
          </Button>
          <Divider />
          <Filters />
          <Divider />
          <Button
            block
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              thereAreSelected
                ? dispatch(remove(selected))
                : dispatch(remove(inactiveCustomers))
            }
          >
            {thereAreSelected
              ? `Delete ${selected.length} inactive`
              : "Delete all inactive"}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
