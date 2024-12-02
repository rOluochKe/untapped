import { Select, Box, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangeSelectorProps {
  onSelectDateRange: (range: string, customRange?: { startDate: Date; endDate: Date }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onSelectDateRange }) => {
  const [selectedRange, setSelectedRange] = useState<string>("last7days");
  const [customDateRange, setCustomDateRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setSelectedRange(range);
    if (range !== "custom") {
      onSelectDateRange(range); 
    }
  };

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    const selection = ranges["selection"];
    if (selection) {
      setCustomDateRange(selection);
      if (selection.startDate && selection.endDate) {
        onSelectDateRange("custom", { startDate: selection.startDate, endDate: selection.endDate });
      }
    }
  };

  return (
    <Box mb={4}>
      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold" color="gray.600">
          Select Date Range
        </FormLabel>
        <Select
          value={selectedRange}
          onChange={handleChange}
          width="auto"
          bg="white"
          borderColor="gray.300"
          borderRadius="md"
          _focus={{ borderColor: "blue.500" }}
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </Select>
        <FormHelperText fontSize="sm" color="gray.500">
          Choose from predefined ranges or select a custom date range.
        </FormHelperText>
      </FormControl>

      {selectedRange === "custom" && (
        <Box mt={4}>
          <DateRangePicker
            ranges={[customDateRange]}
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
        </Box>
      )}
    </Box>
  );
};

export default DateRangeSelector;
