import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.scss';

export interface Option {
  id: string;
  label: string;
  icon: string;
  description?: string;
  selectedLabel?: string;
  selected: boolean;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
  onAddItem?: (newItem: string) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options: initialOptions,
  onChange,
  placeholder = 'Select...',
  onAddItem
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedOptions = options.map(option => 
      option.id === optionId 
        ? { ...option, selected: !option.selected }
        : option
    );
    setOptions(updatedOptions);
    onChange(updatedOptions.filter(option => option.selected));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newOption: Option = {
        id: Date.now().toString(),
        label: inputValue.trim(),
        icon: '🆕',
        selected: false,
        selectedLabel: `Yeeeah, ${inputValue.trim()}!`
      };
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      if (onAddItem) {
        onAddItem(inputValue.trim());
      }
      setInputValue('');
    }
  };

  const selectedOptions = options.filter(option => option.selected);
  const headerText = selectedOptions.length > 0 
    ? selectedOptions.map(opt => `${opt.label}`).join(', ')
    : placeholder;

  return (
    <div className="multi-select-container">
      <div className="multi-select-input-container">
        <input
          ref={inputRef}
          type="text"
          className="multi-select-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add new item"
        />
      </div>
      
      <div className="multi-select" ref={dropdownRef}>
        <div 
          className={`multi-select__header ${isOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <span className="multi-select__header-text">{headerText}</span>
          <span className={`multi-select__arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="multi-select__dropdown">
            <div className="multi-select__options">
              {options.map(option => (
                <div
                  key={option.id}
                  className={`multi-select__option ${option.selected ? 'selected' : ''}`}
                  onClick={(e) => handleOptionClick(option.id, e)}
                >
                  <div>
                    <span className={`multi-select__option-label ${option.selected ? 'selected' : ''}`}>
                      {option.selected ? option.selectedLabel : option.label}
                    </span>
                    <span className="multi-select__option-icon">{option.icon}</span>
                  </div>
                  <div>
                    {option.selected && <span className="multi-select__checkmark">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 