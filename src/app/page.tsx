"use client";

import { Button, Form, Input, Select } from "antd";
import { ALPHA_DICT, SYMBOLS } from "./constants/phrase";
import { useEffect, useState } from "react";
type FieldType = {
  phrase?: string;
  password?: string;
  symbol?: string;
};

export default function Home() {
  const onFinish = (formValue: FormData) => {
    console.log("formValue", formValue);
  };
  const onFinishFailed = ({ values, errorFields }: any) => {
    console.log("values", values);
    console.log("errorFields", errorFields);
  };

  const form = Form.useFormInstance();

  const formatPassword = (phrase: string) => {
    if (!phrase || !symbol) return "";
    let password: (string | string[])[] = [];
    Array.from(phrase).forEach((letter: string) => {
      if (phrase.indexOf(letter) === 0) {
        password.push(letter.toUpperCase());
        password.push(ALPHA_DICT[letter]);
      } else {
        password.push(letter);
        password.push(ALPHA_DICT[letter]);
      }
    });
    password.push(symbol);
    return password.join("");
  };

  const [disabled, setDisabled] = useState(true);
  const [symbol, setSymbol] = useState("!");

  useEffect(() => {
    return () => {
      setDisabled(true);
    };
  }, []);

  return (
    <main className="main">
      <Form
        form={form}
        name="password-maker"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item<FieldType> label="Phrase" name="phrase">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Symbol At The End"
          name="symbol"
          initialValue={symbol}
        >
          <Select
            options={SYMBOLS}
            value={symbol}
            onChange={(val) => setSymbol(val)}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Password" shouldUpdate>
          {({ getFieldValue }) => {
            const phrase: string = getFieldValue("phrase");
            if (phrase) setDisabled(false);
            const value = formatPassword(phrase);
            return <Input.Password value={value} />;
          }}
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabled}>
          Copy
        </Button>
      </Form>
    </main>
  );
}
