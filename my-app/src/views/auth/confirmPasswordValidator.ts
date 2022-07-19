import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

import { FormInstance } from 'antd';

const confirmPasswordValidator = (
  form: FormInstance,
  passwordFieldName = 'password'
) => {
  return {
    validator(rule: RuleObject, value: StoreValue) {
      if (!value || form.getFieldValue(passwordFieldName) === value) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error('Confirm password does not match with password')
      );
    },
  };
};

export { confirmPasswordValidator };
