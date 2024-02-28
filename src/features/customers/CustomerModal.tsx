import { addNew, dialog, update } from "~features/customers/customersSlice";
import { Button, Divider, Form, Input, Modal, Space, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";
import { Customer, Project as ProjectType } from "~/types";
import { Project } from "~features/customers/Project";
import TextArea from "antd/lib/input/TextArea";
import { generateID, generateRequirement } from "~/utils";
import dayjs from "dayjs";

interface CustomerModalProps {
  customer?: Customer;
  show: boolean;
}

const { Item, List, useForm, useWatch } = Form;

const useStyles = createUseStyles({
  title: {
    marginTop: "0",
  },
  modal: {
    "& .ant-modal-footer": {
      position: "sticky",
      bottom: 0,
      background: "#fff",
      padding: "20px",
      borderTop: "1px solid #d9d9d9",
    },
  },
});

export function CustomerModal({ customer, show }: CustomerModalProps) {
  const dispatch = useDispatch();
  const [submittable, setSubmittable] = React.useState(false);
  const [form] = useForm();
  const classes = useStyles();

  const modalTitle = customer
    ? `Edit Customer ${customer.company}`
    : "Create New Customer";
  const initValues = useMemo(
    () => ({
      company: customer?.company,
      industry: customer?.industry,
      about: customer?.about,
      isActive: customer?.isActive,
      projects: customer?.projects.map((project) => ({
        ...project,
        start_date: project.start_date
          ? dayjs(project.start_date)
          : project.start_date,
        end_date: project.end_date ? dayjs(project.end_date) : project.end_date,
      })),
    }),
    [customer],
  );

  const values: Customer | undefined = useWatch([], form);

  const handleOk = useCallback(() => {
    if (values) {
      const baseInfo = {
        company: values.company,
        industry: values.industry,
        about: values.about,
        isActive: values.isActive,
        projects: values.projects
          ? values.projects.map((project: ProjectType) => ({
              ...project,
              start_date: project.start_date
                ? dayjs(project.start_date).toISOString()
                : project.start_date,
              end_date: project.end_date
                ? dayjs(project.end_date).toISOString()
                : project.end_date,
            }))
          : [],
      };

      if (customer) {
        dispatch(
          update({
            id: customer.id,
            ...baseInfo,
          }),
        );
      } else {
        dispatch(
          addNew({
            id: generateID(),
            ...baseInfo,
          }),
        );
      }
    }

    dispatch(dialog({ show: false }));
  }, [customer, dispatch, values]);

  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [
    form,
    values?.about,
    values?.company,
    values?.industry,
    values?.isActive,
    values?.projects,
  ]);

  return (
    <Modal
      className={classes.modal}
      okButtonProps={{ disabled: !submittable }}
      open={show}
      title={modalTitle}
      width={700}
      onCancel={() => dispatch(dialog({ show: false }))}
      onOk={handleOk}
    >
      <Form
        autoComplete="off"
        form={form}
        initialValues={initValues}
        layout="vertical"
        name="customer"
      >
        <Divider />
        <Space size="large">
          <Item
            label="Company"
            name="company"
            required
            rules={[generateRequirement("company name")]}
          >
            <Input placeholder="Set company" />
          </Item>
          <Item label="Status" name="isActive">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Item>
        </Space>

        <Divider />

        <Item
          label="Industry"
          name="industry"
          required
          rules={[generateRequirement("industry")]}
        >
          <Input placeholder="Set industry" />
        </Item>

        <Item
          label="About"
          name="about"
          required
          rules={[generateRequirement("about field")]}
        >
          <TextArea autoSize placeholder="Tell about the company" showCount />
        </Item>

        <Divider orientation="left" plain>
          Projects
        </Divider>
        <List name="projects">
          {(projects, { add, remove }) => (
            <>
              {projects.map(({ key, name, ...restField }) => (
                <Project
                  key={`project_${key}`}
                  name={name}
                  onRemove={remove}
                  {...restField}
                />
              ))}
              <Form.Item>
                <Button
                  block
                  icon={<PlusOutlined />}
                  type="dashed"
                  onClick={() =>
                    add({
                      id: generateID(),
                      name: "",
                      contact: "",
                      start_date: "",
                      end_date: "",
                    })
                  }
                >
                  Add Project
                </Button>
              </Form.Item>
            </>
          )}
        </List>
      </Form>
    </Modal>
  );
}
