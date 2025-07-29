import { useCallback, useState } from "react";
import { Search } from "lucide-react"; // Or use Heroicons
import Input from ".";

export default function SearchInput() {
  const [query, setQuery] = useState("");

  const onChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  // This function does the actual "search"
  const handleSearch = useCallback(() => {}, []);

  // Debounce it and memoize to avoid recreation on every render
  // const debouncedSearch = useMemo(
  //   () => debounce(handleSearch, 500),
  //   [handleSearch]
  // );

  return (
    <Input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="w-full pl-4 pr-10 py-2 text-white rounded-lg focus:outline-none bg-gray-900"
      right={
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          size={20}
          onClick={() => handleSearch()}
        />
      }
    />
  );
}
