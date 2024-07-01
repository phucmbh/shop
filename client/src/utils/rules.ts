import { FieldValues, RegisterOptions, UseFormGetValues } from "react-hook-form"

type Rules = {
  [key in "email" | "password" | "confirm_password"]?: RegisterOptions
}

export const getRules = (getValues?: UseFormGetValues<FieldValues>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc"
    },
    pattern: {
      value: /^[^@]+@[^@]+\.[^@]+$/,
      message: "Email không đúng định dạng"
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5 - 16 kí tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 5 - 16 kí tự"
    }
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc"
    },

    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 16 kí tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 16 kí tự"
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc"
    },

    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 16 kí tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 16 kí tự"
    },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "Nhập lại mật khẩu không khớp"
        : undefined
  }
})
