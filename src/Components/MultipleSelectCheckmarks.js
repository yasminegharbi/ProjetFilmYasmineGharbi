import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks = ({ categories, onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(value);
    onCategoryChange(value);
  };

  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{
            color: 'white',
            '&.Mui-focused': {
              color: 'red',
            },
          }}
        >
          Catégorie
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={
            <OutlinedInput
              label="Catégorie"
              sx={{
                backgroundColor: 'white',
                borderColor: 'red', // Couleur de la bordure
                '&:hover': {
                  borderColor: 'red',
                },
                '&.Mui-focused': {
                  borderColor: 'red', // Couleur de la bordure lorsqu'il est en surbrillance ou focus
                },
              }}
            />
          }
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{
            '&.MuiMenu-paper': {
              backgroundColor: 'gray',
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectCheckmarks;
