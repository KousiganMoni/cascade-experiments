import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/Button";
import React from "react";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/2qZQbBbOoBm0mTtJhYKQvL/Components---Button?node-id=0%3A1",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "outlined", "contained"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "warning", "info", "success"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "contained",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "contained",
    color: "secondary",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined Button",
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    label: "Text Button",
    variant: "text",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};

export const ButtonSet: Story = {
  args: {
    label: "Button Set",
  },
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button label="Primary" variant="contained" color="primary" />
      <Button label="Secondary" variant="contained" color="secondary" />
      <Button label="Success" variant="contained" color="success" />
      <Button label="Error" variant="contained" color="error" />
      <Button label="Warning" variant="contained" color="warning" />
      <Button label="Info" variant="contained" color="info" />
    </div>
  ),
};
