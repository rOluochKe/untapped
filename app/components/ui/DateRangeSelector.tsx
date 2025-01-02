import { Select, Box, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useAppColorMode } from "../ChakraUIProvider";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangeSelectorProps {
  onSelectDateRange: (range: string, customRange?: { startDate: Date; endDate: Date }) => void;
  metrics: any;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ onSelectDateRange }) => {
  const { colorMode } = useAppColorMode();
  const [selectedRange, setSelectedRange] = useState<string>("last7days");
  const [customDateRange, setCustomDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }>({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const stableOnSelectDateRange = useCallback(onSelectDateRange, []);

  useEffect(() => {
    if (selectedRange === "custom" && customDateRange.startDate && customDateRange.endDate) {
      stableOnSelectDateRange("custom", {
        startDate: customDateRange.startDate,
        endDate: customDateRange.endDate,
      });
    } else if (selectedRange !== "custom") {
      stableOnSelectDateRange(selectedRange);
    }
  }, [selectedRange, customDateRange, stableOnSelectDateRange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    setSelectedRange(range);

    if (range !== "custom") {
      setCustomDateRange({ startDate: null, endDate: null, key: "selection" });
    }
  };

  const handleDatePickerChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    if (startDate && endDate) {
      setCustomDateRange({ startDate, endDate, key: "selection" });
      setSelectedRange("custom");

      stableOnSelectDateRange("custom", {
        startDate,
        endDate,
      });
    }
  };

  const dateRange = selectedRange === "custom" && customDateRange.startDate && customDateRange.endDate
    ? customDateRange
    : { startDate: null, endDate: null, key: "selection" };

  return (
    <Box mb={4}>
      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold" color={colorMode === "dark" ? "gray.300" : "gray.600"}>
          Select Date Range
        </FormLabel>
        <Select
          value={selectedRange}
          onChange={handleRangeChange}
          width="auto"
          bg={colorMode === "dark" ? "gray.700" : "white"}
          borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
          borderRadius="md"
          _focus={{ borderColor: "blue.500" }}
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </Select>
        <FormHelperText fontSize="sm" color={colorMode === "dark" ? "gray.400" : "gray.500"}>
          Choose from predefined ranges or select a custom date range.
        </FormHelperText>
      </FormControl>

      {selectedRange === "custom" && (
        <Box mt={4}>
          <DateRangePicker
            ranges={[dateRange]} // Ensure no default date range is selected
            onChange={handleDatePickerChange}
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
