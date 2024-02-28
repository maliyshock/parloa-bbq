import { Col, Row } from "antd";
import { createUseStyles } from "react-jss";
import { CustomerCard } from "~features/customers/CustomerCard";
import Ribbon from "antd/lib/badge/Ribbon";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { useMemo } from "react";

const useStyles = createUseStyles({
  cards: {
    rowGap: "16px",
    "&  [class*='ribbon-wrapper']": {
      display: "flex",
    },
  },
  col: {
    display: "flex",

    "& > *": {
      width: "100%",
    },
  },
});

export function Customers() {
  const classes = useStyles();
  const customers = useSelector((state: RootState) => state.customers);
  const thereAreFilters =
    customers.filterByIndustries && customers.filterByIndustries.length > 0;
  const filteredCustomers = useMemo(() => {
    if (thereAreFilters) {
      return customers.data.filter((customer) =>
        customers.filterByIndustries.includes(customer.industry),
      );
    }
  }, [customers.data, customers.filterByIndustries, thereAreFilters]);

  return (
    <Row className={classes.cards} gutter={16}>
      {(thereAreFilters ? filteredCustomers : customers.data)?.map((item) => (
        <Col key={`${item.id}`} className={classes.col} md={8} sm={12} xs={24}>
          {!item.isActive ? (
            <Ribbon color="volcano" text="Inactive">
              <CustomerCard customer={item} />
            </Ribbon>
          ) : (
            <CustomerCard customer={item} />
          )}
        </Col>
      ))}
    </Row>
  );
}
