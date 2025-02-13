import {useState, useEffect} from "react"
import useDebounce from "./hooks/useDebounce";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const {debouncedValue} = useDebounce(searchText, 300);
  const [results, setResult] = useState([]);
  const [cache, setCache] = useState({});


  useEffect(() => {
    async function getData() {
      if(cache[debouncedValue]) {
        setResult(cache[debouncedValue]);
        console.log("cache for " + debouncedValue);
        return;
      }
      console.log("searching for ", debouncedValue);

      const res = await fetch("https://dummyjson.com/recipes/search?q=" + debouncedValue);
      const data = await res.json();
      setResult(data?.recipes);
      setCache({...cache, [debouncedValue]: data?.recipes});
    }
    getData();
  }, [debouncedValue]);

  return (
    <>
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="search" />
      <div>{results.map(r => <p key={r.id}>{r.name}</p>)}</div>

    </>
  )
}

export default SearchBar;
