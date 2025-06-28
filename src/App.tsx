import React, { useState } from 'react';
import { MultiSelect, Option } from './components/MultiSelect';
import './App.css';
import logo from './assets/images/logo.jpg';

const initialOptions: Option[] = [
  {
    id: 'science',
    label: 'Science',
    selectedLabel: 'Yeeeah, science!',
    icon: '🔬',
    selected: false,
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    selectedLabel: 'Yeeeah, education!',
    selected: false,
  },
  {
    id: 'art',
    label: 'Art',
    selectedLabel: 'Yeeeah, art!',
    icon: '🎨',
    selected: false,
  },
  {
    id: 'sport',
    label: 'Sport',
    selectedLabel: 'Yeeeah, sport!',
    icon: '⚽',
    selected: false,
  },
  {
    id: 'games',
    label: 'Games',
    selectedLabel: 'Yeeeah, games!',
    icon: '🎮',
    selected: false,
  },
  {
    id: 'health',
    label: 'Health',
    selectedLabel: 'Yeeeah, health!',
    icon: '🏥',
    selected: false,
  },
  {
    id: 'music',
    label: 'Music',
    selectedLabel: 'Yeeeah, music!',
    icon: '🎵',
    selected: false,
  },
  {
    id: 'travel',
    label: 'Travel',
    selectedLabel: 'Yeeeah, travel!',
    icon: '🌍',
    selected: false,
  },
  {
    id: 'food',
    label: 'Food',
    selectedLabel: 'Yeeeah, food!',
    icon: '🍔',
    selected: false,
  },
  {
    id: 'lobox',
    label: 'Lobox',
    selectedLabel: 'Yeeeah, lobox!',
    icon: '🚀',
    selected: false,
  }
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleChange = (options: Option[]) => {
    setSelectedOptions(options);
  };

  return (
    <div className="App">
      <div className="container">
      <header className="App-header">
        <img className="logo" src={logo} alt="Lobox" />
        <h1>Lobox Assignment</h1>
       
      </header>
      <div className="dropdown-container">
          <MultiSelect
            options={selectedOptions}
            onChange={handleChange}
            placeholder="Select..."
          />
        </div>
        </div>
    </div>
  );
}

export default App;
