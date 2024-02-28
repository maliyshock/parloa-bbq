import { Card as AntCard, Button, Divider, Tag } from "antd";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";

import { createUseStyles } from "react-jss";
import { limit } from "~/utils";
import { CARD_CONTENT_LIMIT } from "~features/customers/constants";
import { Customer } from "~/types";
import { useDispatch, useSelector } from "react-redux";
import {
  dialog,
  remove,
  select,
  unSelect,
} from "~features/customers/customersSlice";
import { RootState } from "~/store/store";

const { Meta } = AntCard;

interface CardProps {
  customer: Customer;
  className?: string;
}

const useStyles = createUseStyles({
  card: {
    width: "100%",
    alignSelf: "stretch",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.2s",
    "& + [class*=ribbon]": {
      transition: "transform 0.2s",
    },
    "&:hover": {
      transform: "translateY(-3px)",

      "& + [class*=ribbon]": {
        transform: "translateY(-3px)",
      },
    },

    "& > *": {
      width: "100%",
      alignSelf: "flex-start",
    },
    "&  [class*='actions']": {
      marginTop: "auto",
    },
  },
  header: {
    "& *:first-letter": {
      textTransform: "uppercase",
    },
  },
  footer: {
    marginTop: "auto",
  },
  inactive: {
    opacity: "0.9",
  },
});

export function CustomerCard({
  customer,
  className = "",
}: PropsWithChildren<CardProps>) {
  const selected = useSelector((state: RootState) => state.customers.selected);
  const { isActive, projects, company, industry, about } = customer;
  const dispatch = useDispatch();
  const classes = useStyles();
  const shouldCutContent = about.length > CARD_CONTENT_LIMIT;
  const [isCut, setIsCut] = useState(shouldCutContent);
  const cutContent = useMemo(() => limit(about, CARD_CONTENT_LIMIT), [about]);
  const checked = selected.includes(customer.id);

  const handleToggleContentSize = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setIsCut((prevState) => !prevState);
    },
    [],
  );

  const tags = useMemo(() => {
    const projectNames = projects.length
      ? projects.map((project) => project.name)
      : [];

    return projectNames.length > 0
      ? projectNames.map((name) => (
          <Tag key={name} bordered={false}>
            {name}
          </Tag>
        ))
      : null;
  }, [projects]);

  const preventBubbling = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = useCallback(
    () => dispatch(dialog({ show: true, customer })),
    [customer, dispatch],
  );

  const actions = useMemo(() => {
    if (!isActive) {
      return [
        <Button
          key="delete"
          icon={checked && <DeleteOutlined />}
          onClick={(e) => {
            preventBubbling(e);
            dispatch(remove([customer.id]));
          }}
        >
          Delete
        </Button>,
        <Button
          key="check"
          icon={checked && <CheckOutlined />}
          type={checked ? "primary" : undefined}
          onClick={(e) => {
            preventBubbling(e);
            checked
              ? dispatch(unSelect(customer.id))
              : dispatch(select(customer.id));
          }}
        >
          {checked ? "Selected" : "Select"}
        </Button>,
      ];
    }

    return [];
  }, [checked, customer.id, dispatch, isActive]);

  return (
    <AntCard
      actions={actions}
      bordered={false}
      className={`${classes.card} ${className} ${
        !isActive ? classes.inactive : ""
      } `}
      onClick={handleClick}
    >
      <Meta className={classes.header} description={industry} title={company} />
      <Divider />
      <div>
        {isCut ? cutContent : about}
        {shouldCutContent && (
          <Button size="small" type="link" onClick={handleToggleContentSize}>
            {isCut ? "Show more" : "Show less"}
          </Button>
        )}
      </div>
      {tags && (
        <>
          <Divider plain>Projects</Divider>
          <Space size={[0, "small"]} wrap>
            {tags}
          </Space>
        </>
      )}
    </AntCard>
  );
}
