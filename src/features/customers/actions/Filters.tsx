import { Select, Typography } from "antd";
import { useMemo } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { filterByIndustries } from "~features/customers/customersSlice";

const { Text } = Typography;

const useStyles = createUseStyles({
  dropdown: {
    "& *:first-letter": {
      textTransform: "capitalize",
    },
  },
});

export function Filters() {
  const customers = useSelector((state: RootState) => state.customers);
  const classes = useStyles();
  const dispatch = useDispatch();

  const industries = useMemo(() => {
    const industrySet = new Set<string>();

    customers?.data.forEach((customer) => industrySet.add(customer.industry));

    return industrySet;
  }, [customers]);

  const options = useMemo(
    () => Array.from(industries)?.map((ind) => ({ value: ind })),
    [industries],
  );

  return (
    <label>
      <Text> Filter by</Text>
      <Select
        allowClear
        mode="multiple"
        options={options}
        placeholder="All industries"
        popupClassName={classes.dropdown}
        style={{ width: "100%" }}
        onChange={(data) => dispatch(filterByIndustries(data))}
      />
    </label>
  );
}
