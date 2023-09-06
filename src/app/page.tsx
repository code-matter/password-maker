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
  const form = Form.useFormInstance();

  const formatPassword = (phrase: string) => {
    if (!phrase || !symbol) return "";
    const lowerPhrase = phrase.toLowerCase();
    let password: (string | string[])[] = [];
    Array.from(lowerPhrase).forEach((letter: string) => {
      if (lowerPhrase.indexOf(letter) === 0) {
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
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      setDisabled(true);
    };
  }, []);

  return (
    <main className="main">
      <Form form={form} name="password-maker" layout="vertical">
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
            setPassword(value);
            return <Input.Password value={value} />;
          }}
        </Form.Item>
        <Button
          type="primary"
          onClick={() => navigator.clipboard.writeText(password)}
          disabled={disabled}
        >
          Copy
        </Button>
      </Form>
    </main>
  );
}
