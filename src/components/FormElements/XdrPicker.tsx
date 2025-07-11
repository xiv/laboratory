import React from "react";
import { Textarea, TextareaProps } from "@stellar/design-system";

interface XdrPickerProps extends Omit<TextareaProps, "fieldSize"> {
  id: string;
  fieldSize?: "sm" | "md" | "lg";
  labelSuffix?: string | React.ReactNode;
  label: string | React.ReactNode;
  value: string;
  placeholder?: string;
  error?: string | undefined;
  success?: string | React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
}

export const XdrPicker = ({
  id,
  fieldSize = "md",
  labelSuffix,
  label,
  value,
  error,
  success,
  onChange,
  readOnly,
  disabled,
  ...props
}: XdrPickerProps) => {
  //Internal function that cleans up the input by removing newlines and extra spaces
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      const cleanedValue = sanitizeXdr(e.target.value);

      onChange({
        ...e,
        target: { ...e.target, value: cleanedValue },
      });
    }
  };

  return (
    <Textarea
      id={id}
      fieldSize={fieldSize}
      label={label}
      value={value}
      labelSuffix={labelSuffix}
      placeholder="Ex: AAAAABbxCy3mLg3hiTqX4VUEEp60pFOrJNxYM1JtxXTwXhY2AAAAZAAAAAMAAAAGAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAJAAAAAAAAAAHwXhY2AAAAQCPAo8QwsZe9FA0sz/deMdhlu6/zrk7SgkBG22ApvtpETBhnGkX4trSFDz8sVlKqvweqGUVgvjUyM0AcHxyXZQw="
      error={error}
      success={success}
      rows={5}
      onChange={handleChange}
      readOnly={readOnly}
      disabled={disabled}
      {...props}
    >
      {props.children}
    </Textarea>
  );
};

const sanitizeXdr = (xdrString: string) => {
  if (!xdrString) {
    return "";
  }

  // Remove non-XDR characters from the beginning and end of the string.
  const regex = /^[^A-Za-z0-9+/]*(.*?)[^A-Za-z0-9+/=]*$/;
  return xdrString.replace(regex, "$1");
};
