import { Select, Box } from "@chakra-ui/react";
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
        onSelectDateRange(range); // Trigger parent handler
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
        <Select value={selectedRange} onChange={handleChange} placeholder="Select Date Range" width="auto" bg="white">
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </Select>
  
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
