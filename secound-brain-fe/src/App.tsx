import Button from "./components/ui/Button"
import ArrowIcon from "./icons/ArrowIcon"

function App() {
  return <div>
    <h1 className="text-3xl text-blue-400">radhey krishna</h1>
    <Button size="md" text="share" startIcon={<ArrowIcon />}/>
    <Button size="sm" text="connect"/>
  </div>
}

export default App
