import { Input } from 'antd';
import React from 'react';
interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const SearchButton = ({ onChange, onKeyPress }: Props): JSX.Element => {
  return <Input type='text' onChange={onChange} onKeyPress={onKeyPress} />;
};

export default SearchButton;
