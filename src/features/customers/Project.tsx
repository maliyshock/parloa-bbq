import React from "react";
import { Button, Divider, Form, Input, Space } from "antd";
import { DatePicker } from "antd/lib";
import { generateRequirement } from "~/utils";
import { DeleteOutlined } from "@ant-design/icons";

const { Item } = Form;

interface ProjectProps {
  name: number;
  fieldKey?: number;
  onRemove(index: number): void;
}

export function Project({ name, fieldKey, onRemove }: ProjectProps) {
  return (
    <div>
      <Item
        label="Name"
        name={[name, "name"]}
        rules={[generateRequirement("Name")]}
      >
        <Input placeholder="Set name" />
      </Item>

      <Item
        label="E-mail"
        name={[name, "contact"]}
        rules={[
          generateRequirement("E-mail"),
          { type: "email", message: "Please enter correct e-mail address" },
        ]}
      >
        <Input placeholder="Set contact" />
      </Item>
      <div>
        <Space>
          <Item label="Start date" name={[name, "start_date"]}>
            <DatePicker />
          </Item>
          <Item label="End date" name={[name, "end_date"]}>
            <DatePicker />
          </Item>
        </Space>
      </div>
      <Button danger icon={<DeleteOutlined />} onClick={() => onRemove(name)}>
        Remove Project
      </Button>
      <Divider />
    </div>
  );
}
